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
app.post('/api/post/tickets/', upload.single('imageFile'), (req, res) => {

    // parsed by multer middleware
    const textData = req.body;
    const imageFile = req.file;

    const sqlSelectQuery = 'SELECT * FROM unsolved_tickets WHERE ticketType=? AND documentType=? AND documentNumber=?';
    // look for matching ticket in opposite of provided ticket type
    const ticketTypeOpposite = textData.ticketType === 'Lost' ? 'Found' : 'Lost';
    const valuesToLookFor = [ticketTypeOpposite, textData.documentType, textData.documentNumber];

    console.log('initiating select query')
    database.query(sqlSelectQuery, valuesToLookFor, (error, resultArr) => {
        if (error) {
            res.status(400).send('Error while searching for a ticket in the database:\n' + error);
            console.log('Error while searching for a ticket in the database:\n' + error);
        }
        else { // insert new ticket if no match found with any of the existing tickets
            if (resultArr.length < 1) {
                console.log('no match found')
                const sqlInsertQuery = 'INSERT INTO unsolved_tickets SET ?';
                const dataToInsert = {
                    ...textData,
                    imageFile,
                    createdDate: getCurrentUTC()
                }

                console.log('initiating insert query')
                database.query(sqlInsertQuery, dataToInsert, (error, result) => {
                    if (error) {
                        res.status(400).send('No ticket with the given information was found and got error while trying to create a new ticket with the provided information:\n' + error);
                        console.log('No ticket with the given information was found and got error while trying to create a new ticket with the provided information:\n' + error);
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

                        res.json(dataToRespond);
                        console.log('Match not found! So new ticket was created.');
                    }
                })
            }

            else { // if match found, delete existing ticket from unsolved_tickets and add some of its info to solved_tickets
                const { id, owner_fullName, finder_fullName, documentType, createdDate } = resultArr[0]

                const sqlDeleteQuery = 'DELETE FROM unsolved_tickets WHERE id=?'

                console.log('initiating delete query')
                database.query(sqlDeleteQuery, [id], (error, result) => {
                    if (error) {
                        res.status(400).send('A ticket has been found with the same information as provided by the user but got error while resolving it:\n' + error)
                        console.log('A ticket has been found with the same information as provided by the user but got error while resolving it:\n' + error)
                    }
                    else {
                        const sqlInsertQuery = 'INSERT INTO solved_tickets SET ?'
                        const dataToInsert = {
                            owner_fullName,
                            finder_fullName: finder_fullName ?? textData.finder_fullName,
                            documentType,
                            createdDate,
                            resolvedDate: getCurrentUTC()
                        }

                        database.query(sqlInsertQuery, dataToInsert, (error, result) => {
                            if (error) {
                                res.status(400).send('A ticket has been found with the same information as provided by the user but got error while resolving it:\n' + error);
                                console.log('A ticket has been found with the same information as provided by the user but got error while resolving it:\n' + error);
                            }
                            else {
                                res.json({
                                    message: 'A ticket has been found with the same information as provided by the user and has been resolved. Please check your email.',
                                    matchedOn: convertUTCtoLocal(),
                                    matchedTicket: dataToInsert
                                });
                                console.log('Match found and resolved.');
                            }
                        })
                    }
                })
            }
        }
    })
})

// dynamic assignment of port number
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`The server is running at ${port}...`));