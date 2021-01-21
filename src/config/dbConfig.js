// const mysql = require('mysql');
// const dotenv = require('dotenv').config();

// var host = process.env.HOST;
// var db_user = process.env.DB_USER;
// var db_pass = process.env.DB_PASS;
// var db_base = process.env.DB_BASE;
// var port_host = process.env.PORT_HOST_DB;

// const connection = mysql.createConnection({
//     host     : host,
//     user     : db_user,
//     password : db_pass,
//     database : db_base,
//     port     : port_host
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!"); 
// });

// module.exports = connection;

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:root@localhost:3306/teste_db");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

module.exports = {connect}