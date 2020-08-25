const connection = require('../config/dbConfig');

const newsModel = {
    currentDate:()=>{
        var dNow = new Date();
        var localdate = dNow.getFullYear() + '-' + (dNow.getMonth()+1) + '-' + dNow.getDate();
        return localdate;
    },
    insertNews:(data, callback) => {
        connection.query(
            'INSERT INTO mysite_news (news_title, news_content, news_image, news_userID, news_date) VALUES (?, ?, ?, ?, ?);',
            [
                data.news_title,
                data.news_content,
                data.news_image,
                data.news_userID,
                data.news_date
            ],
            callback
        );
    },
    listNews:(callback) =>{
        connection.query(
            'SELECT newsID, user_ID, news_title, news_content, news_image, news_date, user_name FROM mysite_news INNER JOIN mysite_user ON mysite_news.news_userID = mysite_user.user_ID;',
            callback
        )
    },
    listNewsByUser:(data, callback) =>{
        connection.query(
            'SELECT newsID, user_ID, news_title, news_content, news_image, news_date, user_name FROM mysite_news INNER JOIN mysite_user ON mysite_news.news_userID = mysite_user.user_ID WHERE news_userID = ?;',
            data,
            callback
        )
    },
    deleteNews:(data, callback) =>{
        connection.query(
            'DELETE FROM mysite_news WHERE newsID = ?',
            data,
            callback
        )
    },
    allByIdNews:(newsId, callback)=>{
        connection.query(
            'SELECT newsID, user_ID, news_title, news_content, news_image, news_date, user_name, user_profile FROM mysite_news INNER JOIN mysite_user ON mysite_news.news_userID = mysite_user.user_ID WHERE newsID = ?;',
            newsId,
            callback
        )
    },
    editNews:(data, newsId, callback) => {
        connection.query(
            'UPDATE mysite_news SET news_title = ?, news_content = ?, news_image = ?, news_date = ? WHERE newsID = ?;',
            [
                data.news_title,
                data.news_content,
                data.news_image, 
                data.news_date,
                newsId,
            ],
            callback
        )
    },
}

module.exports = newsModel;