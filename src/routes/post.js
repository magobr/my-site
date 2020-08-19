const express = require('express');
const user = express.Router();

const userModel = require('../model/userModel');



user.post('/user', (req, res) =>{
    
    var dados = req.body;
    console.log(dados);

    userModel.userInsert(dados, (error, response)=>{
        if (error) throw error;
        res.json(response)
    });

});

module.exports = user;