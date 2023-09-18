const mysql = require('mysql2')

// establishing connection to remote database
const dbConfig = mysql.createPool({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'mysql@wb_2023',
    database: 'tickets'
})

module.exports = dbConfig;