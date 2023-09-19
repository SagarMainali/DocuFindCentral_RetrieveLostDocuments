// using CommonJs require because some plugin didn't support ES6 modules

const express = require('express');
const cors = require('cors');
const sendEmail = require('./emailSending/sendEmail');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.get('/api/sendEmail/', async (req, res) => {
    await sendEmail().catch(console.error);
    res.send('Email sent!');
})

// using middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api', userRoutes);

// dynamic assignment of port number
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`The server is running at ${port}...`));