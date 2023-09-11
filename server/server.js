import express from 'express';
import cors from 'cors'
import mysql from 'mysql2';

const app = express();

// using middleware
app.use(cors());
app.use(express.json());

// establishing connection to remote database
const database = mysql.createPool({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'mysql@wb_2023',
    database: 'documents'
})

//default route 
app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.post('/api/documents/', (req, res) => {
    const data = req.body;
    console.log(data);
    res.send(data)
})

// dynamic assignment of port number
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`The server is running at ${port}...`));