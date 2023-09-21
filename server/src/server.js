// using CommonJs require because some plugin didn't support ES6 modules

const express = require('express');
const cors = require('cors');
const sendEmailToUser = require('./emailSending/sendEmailToUser');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.get('/api/test/email/', (req, res) => {
    sendEmailToUser([{ email: 'sagarmainali78@gmail.com', ticketType: 'Lost' }])
        .then(result => {
            if (result.messageId) {
                console.log(result)
                console.log('Mail sent successfully.');
                res.status(200).send(`Mail sent successfully with following message id:\n${result.messageId}`);
            }
            else {
                console.log('Error while sending mail!');
                res.status(400).send(`Error while sending mail:\n'${result.message}`);
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