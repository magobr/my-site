const connection = require('../config/dbConfig');

const userModel = {
    checksAdmin:(data, callback)=>{
        connection.query(
            'SELECT user_profile FROM mysite_user where user_profile = 1 AND user_ID = ?',
            data,
            callback
        );
    },
    userJoin:(data, callback) =>{
        connection.query (
            'INSERT INTO mysite_user (user_name, user_pass, user_email, user_profile) VALUES (?, md5(?), ?, ?);',
            [
                data.user_name,
                data.user_pass, 
                data.user_email, 
                data.user_profile
            ], 
            callback
        );
        console.log(data);
    },
    userLogin:(data, callback) =>{
        connection.query (
            'SELECT * FROM mysite_user WHERE user_name = ? AND user_pass = ?',
            [
                data.user_name, 
                data. user_pass
            ],
            callback
        );
    }
}

module.exports = userModel;