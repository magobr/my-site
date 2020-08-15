const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv').config();

let routeGet = require('./routes/get');

const app = express();

// Requisição cross-origin
app.use( (req, res, next)=> {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.set('view engine', 'ejs');
app.set("views", "src/views");

app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

app.use(express.json());

app.use(routeGet);

var port = process.env.PORT;
var server = process.env.SERVER;
app.listen(port, () => {
	console.log(`Servidor aberto! acesse: http://${server}:${port}`);
});