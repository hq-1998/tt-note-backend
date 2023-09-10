const mysql = require('mysql')
const { dbConfig } = require('../config/constant')

function connect() {
    return mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
        connectionLimit: dbConfig.connectionLimit
    })
}

const sqlConnection = (sql, params) => {
    const conn = connect();
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, params, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        } catch (err) {
            reject(err)
        } finally {
            conn.end()
        }
    })
}

module.exports = { sqlConnection }