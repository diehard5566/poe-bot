const path = require('path')
const mysql = require('mysql2')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10, // 最大連線數
    queueLimit: 0,
})

module.exports = pool.promise()
