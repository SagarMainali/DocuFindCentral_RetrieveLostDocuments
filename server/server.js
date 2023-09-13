import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import multer from 'multer'

const app = express();

// using middleware
app.use(cors());
app.use(express.json());

// allocating storage in the server itself to store images sent from the client side
const storage = multer.diskStorage({
    destination: "./images",
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
    res.send("Hello World!");
})

// route to receive formdata
app.post('/api/tickets', upload.single('imageFile'), (req, res) => {

    const textData = req.body;
    const imageFile = req.file;

    const sqlSelectQuery = 'SELECT * FROM unsolved_tickets WHERE ticketType=? AND documentNumber=?';
    // to look for data in opposite ticket type
    const ticketTypeOpposite = textData.ticketType === 'Lost' ? 'Found' : 'Lost';
    const valuesToLookFor = [ticketTypeOpposite, textData.documentNumber];

    database.query(sqlSelectQuery, valuesToLookFor, (error, resultArr) => {
        if (error) {
            res.status(400).send("Error while looking for data in the database:\n", error);
            console.log("Error while looking for data in the database:\n", error);
        }
        else {
            // insert new ticket if no match found with any of the existing tickets
            if (resultArr.length === 0) {
                const sqlInsertQuery = 'INSERT INTO unsolved_tickets SET ?';
                const dataToInsert = { ...textData, imageFile }

                database.query(sqlInsertQuery, dataToInsert, (error, results) => {
                    if (error) {
                        res.status(400).send("Error while looking for data in the database:\n", error);
                        console.log("Error while inserting data in the database:\n", error);
                    }
                    else {
                        res.status(200).json({
                            message: 'No ticket with the given information found so a new ticket will be created with this information.',
                            inserted_Data: {
                                textData,
                                imageFile
                            },
                            from_Database: results
                        });
                        console.log("Success:\n", results);
                    }
                })
            }
            else {
                const ticket = resultArr[0]
                res.json({
                    message: 'A ticket has been found with the same information as provided by the user.',
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
    //         console.log("Error:\n", error);
    //         res.status(400).json(error);
    //     }
    //     else {
    //         console.log("Success:\n", results);
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