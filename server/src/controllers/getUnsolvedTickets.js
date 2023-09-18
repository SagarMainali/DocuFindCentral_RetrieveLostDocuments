const database = require('../database/dbConfig');
const { convertUTCtoLocal } = require('../utils/handleDates');

const getUnsolvedTickets = (req, res) => {
    const sqlSelectQuery = 'SELECT * FROM unsolved_tickets';
    database.query(sqlSelectQuery, (error, resultArr) => {
        if (error) {
            const errorMsg = 'There was an error fetching the list of unsolved tickets!\n' + error;
            console.log(errorMsg);
            res.status(400).send(errorMsg);
        }
        else {
            const dataToRespond = resultArr.map(resultObj => (
                {
                    ...resultObj,
                    createdDate: convertUTCtoLocal(resultObj.createdDate)
                }
            ))

            console.log('The data has been successfully delivered to the client.');
            res.json(dataToRespond);
        }
    })
}

module.exports = getUnsolvedTickets;