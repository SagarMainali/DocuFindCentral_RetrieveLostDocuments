import express from 'express';
import cors from 'cors';
import multer from 'multer'
// import mysql from 'mysql2';

const app = express();

// using middleware
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// establishing connection to remote database
// const database = mysql.createPool({
//     host: 'localhost',
//     port: '3307',
//     user: 'root',
//     password: 'mysql@wb_2023',
//     database: 'documents'
// })

const storage = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} ${file.originalname}`);
    }
})

const upload = multer({ storage })

//default route 
app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.post('/api/documents', upload.single('imageFile'), (req, res) => {
    console.log(`${req.body.owner_fullName} send this file:\n`, req.file);
    console.log(req.body.documentType);
    res.send(req.file);
})

// dynamic assignment of port number
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`The server is running at ${port}...`));