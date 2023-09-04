const mysql = require('mysql')

function connect() {
    return mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '12345678',
        database: 'note',
        connectionLimit: 5
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