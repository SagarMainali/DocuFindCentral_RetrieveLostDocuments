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

// allocating storage in the server itself to store images sent from the client side
const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} ${file.originalname}`);
    }
})

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

// route to receive formdata
app.post('/api/post/tickets', upload.single('imageFile'), (req, res) => {

    // parsed by multer middleware
    const textData = req.body;
    const imageFile = req.file;

    const sqlSelectQuery = 'SELECT * FROM unsolved_tickets WHERE ticketType=? AND documentType=? AND documentNumber=?';
    // data to look for in opposite ticket type
    const ticketTypeOpposite = textData.ticketType === 'Lost' ? 'Found' : 'Lost';
    const valuesToLookFor = [ticketTypeOpposite, textData.documentType, textData.documentNumber];

    database.query(sqlSelectQuery, valuesToLookFor, (error, resultArr) => {
        if (error) {
            res.status(400).send('Error while looking for a ticket in the database:\n', error);
            console.log('Error while looking for a ticket in the database:\n', error);
        }
        else { // insert new ticket if no match found with any of the existing tickets
            if (resultArr.length === 0) {
                const sqlInsertQuery = 'INSERT INTO unsolved_tickets SET ?';
                const dataToInsert = {
                    ...textData,
                    imageFile,
                    createdDate: getCurrentUTC()
                }

                database.query(sqlInsertQuery, dataToInsert, (error, result) => {
                    if (error) {
                        res.status(400).send('No ticket with the given information found but got error while trying to create a new ticket with this information:\n', error);
                        console.log('No ticket with the given information found but got error while trying to create a new ticket with this information:\n', error);
                    }
                    else {
                        const dataToRespond = {
                            message: 'No ticket with the given information found so a new ticket has been created with this information.',
                            inserted_On: convertUTCtoLocal(),
                            inserted_Data: {
                                textData,
                                imageFile
                            },
                            from_Database: result
                        }
                        res.status(200).json(dataToRespond);
                        console.log('Success:\n', results);
                    }
                })
            }
            else { // if match found, delete existing ticket from unsolved_tickets and add some of its info to solved_tickets
                const { id, owner_fullName, finder_fullName, documentType, createdDate } = resultArr[0]

                const sqlDeleteQuery = 'DELETE FROM unsolved_tickets WHERE id=?'

                database.query(sqlDeleteQuery, ticket.id, (error, result) => {
                    if (error) {
                        res.status(200).send('A ticket has been found with the same information as provided by the user but got error while resolving it:\n', error)
                        console.log('A ticket has been found with the same information as provided by the user but got error while resolving it:\n', error)
                    }
                    else {
                        const sqlInsertQuery = 'INSERT INTO solved_tickets SET ?'
                        const dataToInsert = {

                        }
                    }
                })

                res.json({
                    message: 'A ticket has been found with the same information as provided by the user.',
                    matchedOn: convertUTCtoLocal(),
                    matchedTicket: ticket
                })
                console.log('Match detected!')
            }
        }
    })

    // const sqlInsertQuery = 'INSERT INTO unsolved_tickets SET ?';
    // const dataToInsert = { ...textData, imageFile }

    // database.query(sqlInsertQuery, dataToInsert, (error, results) => {
    //     if (error) {
    //         console.log('Error:\n', error);
    //         res.status(400).json(error);
    //     }
    //     else {
    //         console.log('Success:\n', results);
    //         // send response back to client-side
    //         res.status(200).json({
    //             inserted_Data: {
    //                 textData,
    //                 imageFile
    //             },
    //             from_Database: results
    //         });
    //     }
    // })

})

// dynamic assignment of port number
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`The server is running at ${port}...`));

// const { owner_fullName,
//     finder_fullName,
//     contact,
//     currentAddress,
//     permanentAddress,
//     documentFoundPlace,
//     email,
//     documentType,
//     documentNumber,
//     documentIssuedDistrict,
//     documentIssuedDate,
//     documentExpiryDate,
//     shortMessage } = req.body;