const database = require('../database/dbConfig');
const { getCurrentUTC, convertUTCtoLocal } = require('../utils/handleDates');
const sendEmailToUser = require('../emailSending/sendEmailToUser');

const ticketCreationAndMatching = (req, res) => {
    // parsed by multer middleware
    const textData = req.body;
    // we can directly store buffer data by 'req.file.buffer' but since we need the filename to dynamically assign the file extension in nodemailer
    // and might possibly need other data as well about the image in the future, we store the file as a JSON object. 
    // we can simply deserialize afterwards by parsing it like normal json and retrieving the buffer data.
    // see 'sendEmailToUser.js' where all this has happened
    const imageFile = JSON.stringify(req.file);

    // console.log(`data:${imageFile.mimetype};base64,${imageFile.buffer.toString('base64')}`);

    const sqlSelectQuery = 'SELECT * FROM unsolved_tickets WHERE ticketType=? AND documentType=? AND documentIssuedDistrict=? AND documentNumber=?';
    // look for matching ticket in opposite of provided ticket type
    const ticketTypeOpposite = textData.ticketType === 'Lost' ? 'Found' : 'Lost';
    const valuesToLookFor = [ticketTypeOpposite, textData.documentType, textData.documentIssuedDistrict, textData.documentNumber];

    console.log('Searching for a match...');

    database.query(sqlSelectQuery, valuesToLookFor, (error, resultArr) => {
        if (error) {
            const errorMsg = 'Error while searching for a ticket in the database!\n' + error;
            console.log(errorMsg);
            res.status(400).send(errorMsg);
        }
        else { // insert new ticket if no match found with any of the existing tickets
            if (resultArr.length < 1) {
                const sqlInsertQuery = 'INSERT INTO unsolved_tickets SET ?';
                const dataToInsert = {
                    ...textData,
                    imageFile,
                    createdDate: getCurrentUTC()
                }

                console.log('MATCH NOT FOUND! so creating a new ticket...');
                database.query(sqlInsertQuery, dataToInsert, (error, result) => {
                    if (error) {
                        const errorMsg = 'No ticket with the given information was found and got error while trying to create a new ticket with the provided information!\n' + error;
                        console.log(errorMsg);
                        res.status(400).send(errorMsg);
                    }
                    else {
                        const dataToRespond = {
                            message: 'No ticket with the given information was found so a new ticket has been created with the provided information.',
                            inserted_On: convertUTCtoLocal(dataToInsert.createdDate),
                            inserted_Data: {
                                textData,
                                imageFile
                            },
                            from_Database: result
                        }

                        console.log('New ticket was created.\n');
                        res.json(dataToRespond);
                    }
                })
            }

            else { // if match found, delete existing ticket from unsolved_tickets and add some of its info to solved_tickets
                const { id, owner_fullName, finder_fullName, documentType, createdDate } = resultArr[0];

                const sqlDeleteQuery = 'DELETE FROM unsolved_tickets WHERE id=?';

                console.log('\nMATCH FOUND! so moving it from existing table...');
                database.query(sqlDeleteQuery, id, (error, result) => {
                    if (error) {
                        const errorMsg = 'A ticket has been found with the same information as provided by the user but got error while resolving it!\n' + error;
                        console.log(errorMsg)
                        res.status(400).send(errorMsg)
                    }
                    else {
                        const sqlInsertQuery = 'INSERT INTO solved_tickets SET ?';
                        const dataToInsert = {
                            owner_fullName,
                            finder_fullName: finder_fullName ?? textData.finder_fullName,
                            documentType,
                            createdDate,
                            resolvedDate: getCurrentUTC()
                        }

                        console.log('Inserting matched ticket on a new table...')
                        database.query(sqlInsertQuery, dataToInsert, (error, result) => {
                            if (error) {
                                const errorMsg = 'A ticket has been found with the same information as provided by the user but got error while resolving it!\n' + error;
                                console.log(errorMsg);
                                res.status(400).send(errorMsg);
                            }
                            else {
                                // send matched tickets data by converting the stored UTC time to localtime
                                const matchedTickets = [
                                    {
                                        ...resultArr[0],
                                        createdDate: convertUTCtoLocal(dataToInsert.createdDate)
                                    },
                                    {
                                        ...textData,
                                        imageFile,
                                        createdDate: convertUTCtoLocal(dataToInsert.resolvedDate)
                                    }
                                ];

                                sendEmailToUser(matchedTickets)
                                    .then(resultFromMailServer => {
                                        if (resultFromMailServer.messageId) {
                                            const dataToRespond = {
                                                message: 'A ticket has been found with the same information as provided by the user and has been resolved. Please check your email.',
                                                matchedOn: convertUTCtoLocal(),
                                                matchedTicket: dataToInsert,
                                                from_Database: result
                                            }

                                            console.log('\nMatched ticket resolved and mail sent successfully.\n');
                                            res.json(dataToRespond);
                                        }
                                        else {
                                            console.log(`Matched ticket resolved but got error while sending mail!\n:${resultFromMailServer.message}`);
                                            res.json(`Matched ticket resolved but got error while sending mail!\n:${resultFromMailServer.message}`);
                                        }
                                    });
                            }
                        })
                    }
                })
            }
        }
    })
}

module.exports = ticketCreationAndMatching;