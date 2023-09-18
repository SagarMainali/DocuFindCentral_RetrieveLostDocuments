const database = require('../database/dbConfig');
const { getCurrentUTC, convertUTCtoLocal } = require('../utils/handleDates');

const feedbackSubmission = (req, res) => {
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
}

module.exports = feedbackSubmission;