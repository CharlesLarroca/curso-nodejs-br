const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10, //limita o numero de conexões e mata as mais antigas
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'nodemysql'
})

module.exports = pool