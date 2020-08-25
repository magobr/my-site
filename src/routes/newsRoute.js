const express = require('express');
const news = express.Router();

const newsModel = require('../model/newsModel');


news.post('/createnew',  (req, res)=>{

    if (!req.session.loggedin) {
        console.log("Realize o Login");
        res.end();
    } else{
        let data  = {
            news_title: req.body.news_title,
            news_content: req.body.news_content,
            news_image: req.body.news_image,
            news_userID: req.session.userId,
            news_date: newsModel.currentDate()
        };

        newsModel.insertNews(data, (error, response)=>{
            if (error) throw error;
            res.json(response);
        });
    }

});

news.get('/listnews', (req, res)=>{
    if (!req.session.loggedin) {
        console.log('Realize o Login');
        res.end();
    }else{
        newsModel.listNews((error, response)=>{
            if (error) throw error;
            res.json(response);
        })
    }
});

news.get('/mynews', (req, res)=>{
    if (!req.session.loggedin) {
        console.log('Realize o Login');
        res.end();
    }else{
        let data = req.session.userId;
        newsModel.listNewsByUser(data, (error, response)=>{
            if (error) throw error;
            res.json(response);
        })
    }
});

news.delete('/deletenew/:id', (req, res)=>{
    if(!req.session.loggedin){
        console.log('Realize o Login');
        res.end();
    }else{
        let userId = req.session.userId;
        let newsId = req.params.id;

        newsModel.allByIdNews(newsId, (error, response) => {
            if (error) throw error;
            if( !response.length > 0 ) {
                console.log('Não existe essa notícia');
                res.end();                
            }
            if( response[0].user_ID !== userId ) {      
                console.log('Sem premição para excluir');
                res.end();
            } else {
                newsModel.deleteNews(newsId, (error, response) => {
                    if (error) throw error;
                    console.log(response.affectedRows, "Noticia deletada");
                    res.end();
                });
            }
        });
    }
});

news.put('/editnews/:id',  (req, res)=>{
    if(!req.session.loggedin)
    {
        console.log('Realize o Login');
        res.end();
    } else
    {
        let userId = req.session.userId;
        let newsId = req.params.id;

        newsModel.allByIdNews(newsId, (error, response) => {
            if (error) throw error;
            if( !response.length > 0 ) {
                console.log('Não existe essa notícia');
                res.end();                
            }
            if( response[0].user_ID !== userId ) {   
                console.log('Sem premição para editar');
                res.end();
            } else {

                let data = req.body;
                newsModel.editNews(data, newsId, (error, response) => {
                    console.log(data);
                    if (error) throw error;
                    console.log(response.affectedRows, "Noticia Alterada");
                    res.end()
                });
            }
        });
    }
});


module.exports = news;