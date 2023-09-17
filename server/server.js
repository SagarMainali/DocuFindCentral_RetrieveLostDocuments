// using CommonJs require because some plugin didn't support ES6 modules

const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const multer = require('multer')

const { getCurrentUTC, convertUTCtoLocal } = require('./handleDates')

const app = express();

// using middleware
app.use(cors());
app.use(express.json());

// use multer to allocate storage in the server itself to store images sent from the client side
// const storage = multer.diskStorage({
//     destination: './images',
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()} ${file.originalname}`);
//     }
// })

// use multer to handle file uploads and save it in memory
const storage = multer.memoryStorage();

// custom middleware to use in a specific route
const upload = multer({ storage })

// establishing connection to remote database
const database = mysql.createPool({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'mysql@wb_2023',
    database: 'tickets'
})

//default route 
app.get('/', (req, res) => {
    const utc = getCurrentUTC();
    const local = convertUTCtoLocal(utc);
    res.send({ message: 'Hello World!', utc, local });
})

// route to receive formdata and perform necessary operation on that data to search and match tickets
app.post('/api/post/tickets/', upload.single('imageFile'), (req, res) => {

    // parsed by multer middleware
    const textData = req.body;
    const imageFile = req.file;

    // console.log(`data:${imageFile.mimetype};base64,${imageFile.buffer.toString('base64')}`);

    const sqlSelectQuery = 'SELECT * FROM unsolved_tickets WHERE ticketType=? AND documentType=? AND documentNumber=?';
    // look for matching ticket in opposite of provided ticket type
    const ticketTypeOpposite = textData.ticketType === 'Lost' ? 'Found' : 'Lost';
    const valuesToLookFor = [ticketTypeOpposite, textData.documentType, textData.documentNumber];

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
                    // storing the base64 data of the image in the database which is ready to be used on src attribute of img
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
                            inserted_On: convertUTCtoLocal(),
                            inserted_Data: {
                                textData,
                                imageFile
                            },
                            from_Database: result
                        }

                        console.log('New ticket was created.');
                        res.json(dataToRespond);
                    }
                })
            }

            else { // if match found, delete existing ticket from unsolved_tickets and add some of its info to solved_tickets
                const { id, owner_fullName, finder_fullName, documentType, createdDate } = resultArr[0];

                const sqlDeleteQuery = 'DELETE FROM unsolved_tickets WHERE id=?';

                console.log('MATCH FOUND! so moving it from existing table...');
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
                                const dataToRespond = {
                                    message: 'A ticket has been found with the same information as provided by the user and has been resolved. Please check your email.',
                                    matchedOn: convertUTCtoLocal(),
                                    matchedTicket: dataToInsert,
                                    from_Database: result
                                }

                                console.log('Matched ticket resolved.');
                                res.json(dataToRespond);
                            }
                        })
                    }
                })
            }
        }
    })
})

// route to get all the solved_tickets from the database
app.get('/api/get/solved_tickets/', (req, res) => {
    const sqlSelectQuery = 'SELECT * FROM solved_tickets';
    database.query(sqlSelectQuery, (error, resultArr) => {
        if (error) {
            const errorMsg = 'There was an error fetching the list of solved tickets!\n' + error;
            console.log(errorMsg);
            res.status(400).send(errorMsg);
        }
        else {
            const dataToRespond = resultArr.map(resultObj => (
                {
                    ...resultObj,
                    createdDate: convertUTCtoLocal(resultObj.createdDate),
                    resolvedDate: convertUTCtoLocal(resultObj.resolvedDate)
                }
            ))

            console.log('The data has been successfully delivered to the client.');
            res.json(dataToRespond);
        }
    })
})

// route to get all the unsolved_tickets from the database
app.get('/api/get/unsolved_tickets/', (req, res) => {
    const sqlSelectQuery = 'SELECT * FROM unsolved_tickets';
    database.query(sqlSelectQuery, (error, resultArr) => {
        if (error) {
            const errorMsg = 'There was an error fetching the list of unsolved tickets!\n' + error;
            console.log(errorMsg);
            res.status(400).send(errorMsg);
        }
        else {
            const dataToRespond = resultArr.map(resultObj => (
                {
                    ...resultObj,
                    createdDate: convertUTCtoLocal(resultObj.createdDate)
                }
            ))

            console.log('The data has been successfully delivered to the client.');
            res.json(dataToRespond);
        }
    })
})

// route for posting feedbacks
app.post('/api/post/feedbacks/', (req, res) => {
    const dataToInsert = {
        ...req.body,
        submittedDate: getCurrentUTC()
    }
    const sqlInsertQuery = 'INSERT INTO feedbacks SET ?';

    console.log('Saving feedback in database...')
    database.query(sqlInsertQuery, dataToInsert, (error, result) => {
        if (error) {
            const errorMsg = 'Error while saving feedback in database!\n' + error;
            console.log(errorMsg);
            res.status(400).send(errorMsg);
        }
        else {
            const dataToRespond = {
                message: 'Your valuable feedback has been submitted. Thankyou!',
                inserted_Data: {
                    ...dataToInsert,
                    submittedDate: convertUTCtoLocal()
                },
                from_Database: result
            }

            console.log('Feedback successfully saved to the database.');
            res.json(dataToRespond);
        }
    })
})

// dynamic assignment of port number
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`The server is running at ${port}...`));