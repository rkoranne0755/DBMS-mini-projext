var mysql = require('mysql')

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Rudra@123",
    database : "project"
})


module.exports = con