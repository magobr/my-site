const express = require('express');

const routeGet = express.Router();

routeGet.get('/' , async (req, res)=>{

    const getController = require('../controller/getController')
    const teste = await getController.get()
    
    res.json(teste);

})

module.exports = routeGet;