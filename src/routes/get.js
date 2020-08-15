const express = require('express');

const routeGet = express.Router();

routeGet.get('/' , (req, res)=>{
    res.json({'Hello': 'World'});
})

module.exports = routeGet;