const db = require("../config/dbConfig");

async function selectCustomers(){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM users;');
    return rows;
}

module.exports = {selectCustomers}