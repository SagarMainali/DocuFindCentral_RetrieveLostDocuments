import express from 'express';
// import mysql from 'mysql2';

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!");
})

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`The server is running at ${port}...`));