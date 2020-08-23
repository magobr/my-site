const express = require('express');
const user = express.Router();

const userModel = require('../model/userModel');

user.post('/join', (req, res) =>{

    var dados = req.body;
   
    if (!req.session.loggedin) {
        console.log("Realize o Login");
        res.end();
    } else {
        userModel.userJoin(dados, (error, response)=>{
            console.log(dados);
            if (error) throw error;
            res.json(response)
        });    
    }
});

user.post('/session', (req, res)=>{
    let md5 = require('md5');

    let dados = {
        user_name: req.body.user_name,
        user_pass: md5(req.body.user_pass)
    }
    
    userModel.userLogin(dados, (error, response)=>{       
        if(response.length > 0){
            req.session.loggedin = true;
            req.session.userId = response[0].user_ID;
            res.setHeader('Content-Type', 'text/html');
            res.json(response)
            console.log("loggedin!!");
        } else {
            console.log('Login Incorreto');
            res.end();
        } if (error) throw error;
    });

});

module.exports = user;