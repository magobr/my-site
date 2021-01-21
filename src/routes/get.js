const express = require('express');

const routeGet = express.Router();

routeGet.get('/' , (req, res)=>{
    (async () => {
        const testemodel = require('../model/testemodel')
        console.log('Começou!');
    
        console.log('SELECT * FROM user');
        const clientes = await testemodel.selectCustomers();
        res.json(clientes[1].id)
    })();
})

module.exports = routeGet;