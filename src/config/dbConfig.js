
const mysql = require('mysql');
const dotenv = require('dotenv').config();

var host = process.env.HOST;
var db_user = process.env.DB_USER;
var db_pass = process.env.DB_PASS;
var db_base = process.env.DB_BASE;

const connection = mysql.createConnection({
    host     : host,
    user     : db_user,
    password : db_pass,
    database : db_base
});

connection.connect();

module.exports = connection;