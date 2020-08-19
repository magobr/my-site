const connection = require('../config/dbConfig');

const userModel = {
    userInsert:(data, callback) =>{
        connection.query('INSERT INTO mysite_user (user_name, user_pass, user_email, user_profile) VALUES (?, md5(?), ?, ?);', [data.user_name, data.user_pass, data.user_email, data.user_profile], callback);
        console.log(data);
    },
}

module.exports = userModel;