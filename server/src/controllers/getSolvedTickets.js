const database = require('../database/dbConfig');
const { convertUTCtoLocal } = require('../utils/handleDates');

const getSolvedTickets = (req, res) => {
    const sqlSelectQuery = 'SELECT * FROM solved_tickets';
    database.query(sqlSelectQuery, (error, resultArr) => {
        if (error) {
            const errorMsg = 'There was an error fetching the list of solved tickets!\n' + error;
            console.log(errorMsg);
            res.status(400).send(errorMsg);
        }
        else {
            const dataToRespond = resultArr.map(resultObj => (
                {
                    ...resultObj,
                    createdDate: convertUTCtoLocal(resultObj.createdDate),
                    resolvedDate: convertUTCtoLocal(resultObj.resolvedDate)
                }
            ))

            console.log('The data has been successfully delivered to the client.');
            res.json(dataToRespond);
        }
    })
}

module.exports = getSolvedTickets;