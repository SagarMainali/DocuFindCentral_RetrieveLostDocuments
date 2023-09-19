// using CommonJs require because some plugin didn't support ES6 modules

const express = require('express');
const cors = require('cors');
const sendMailToUser = require('./emailSending/sendMailToUser');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.get('/api/mail/', (req, res) => {
    sendMailToUser(['sagarmainali78@gmail.com'])
        .then(response => {
            if (response.messageId) {
                res.send(`Email sent successfully with following message id:\n ${response.messageId}`);
            }
            else {
                res.status(400).send(`Email sent failed with following error message:\n' ${response.message}`);
            }
        })
})

// using middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api', userRoutes);

// dynamic assignment of port number
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`The server is running at ${port}...`));