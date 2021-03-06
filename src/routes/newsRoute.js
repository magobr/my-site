const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');
const news = express.Router();

const newsModel = require('../model/newsModel');

news.post('/createnew', multer(multerConfig).single("news_image"), async (req, res)=>{

    if (!req.session.loggedin) {
        console.log("Realize o Login");
        res.end();
    } else {

        let userId = req.session.userId;
        const { originalname: name, size, key, location: url = "" } = req.file;

        let data  = {
            news_title: req.body.news_title,
            news_content: req.body.news_content,
            news_image: req.file.filename,
            news_userID: userId,
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
    } else {

        let userId = req.session.userId;

        newsModel.checksAdmin(userId, (error, response) => {
            if(error) throw error;
            
            if( !response.length > 0 ){
                console.log('Sem permição para ver o conteúdo');
                res.end();
            } else {
                newsModel.listNews((error, response)=>{
                    if (error) throw error;
                    res.json(response);
                });
            }

        });
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
    } else {
        let userId = req.session.userId;
        let newsId = req.params.id;

        newsModel.allByIdNews(newsId, (error, response) => {
            if (error) throw error;
            if( !response.length > 0 ) {
                console.log('Não existe essa notícia');
                res.end();                
            } else {

                if( response[0].user_ID !== userId ) {      
                    console.log('Não é o dono da notícia');
    
                    newsModel.checksAdmin(userId, (error, response) => {
                        if (error) throw error;
    
                        if( !response.length > 0 ) {
                            console.log('Não é Admin, Não tem permição');
                            res.end();                
                        } else {
                            newsModel.deleteNews(newsId, (error, response) => {
                                if (error) throw error;
                                
                                console.log(response.affectedRows, 'Noticia deletada');
                                res.end();
                            });
                            
                        }
                    });
                    res.end();
                } else {
                    newsModel.deleteNews(newsId, (error, response) => {
                        if (error) throw error;
                        
                        console.log(response.affectedRows, 'Noticia deletada');
                        res.end();
                    });
                }
            }
        });
    }
});

news.put('/editnews/:id',  (req, res)=>{
    if(!req.session.loggedin){
        console.log('Realize o Login');
        res.end();
    } else {
        let userId = req.session.userId;
        let newsId = req.params.id;
        let data = req.body;

        newsModel.allByIdNews(newsId, (error, response) => {
            if (error) throw error;
            if( !response.length > 0 ) {
                console.log('Não existe essa notícia');
                res.end();                
            } else {

                if( response[0].user_ID !== userId ) {      
                    console.log('Não é o dono da notícia');
    
                    newsModel.checksAdmin(userId, (error, response) => {
                        if (error) throw error;
    
                        if( !response.length > 0 ) {
                            console.log('Não é Admin, Não tem permição');
                            res.end();                
                        } else {
                            newsModel.editNews(data, newsId, (error, response) => {
                                if (error) throw error;
                                
                                console.log(response.affectedRows, 'Noticia Alterada');
                                res.end();
                            });
                            
                        }
                    });
                    res.end();
                } else {
                    newsModel.editNews(data, newsId, (error, response) => {
                        if (error) throw error;
                        
                        console.log(response.affectedRows, 'Noticia Alterada');
                        res.end();
                    });
                }
            }
        });
    }
});


module.exports = news;