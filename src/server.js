const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv').config();

const routeGet = require('./routes/get');
const userRoute = require('./routes/userRoute');
const newsRoute = require('./routes/newsRoute');

const app = express();

// Session
app.use(session({
	cookieName: 'session',
    secret: "ssh, its a secret!",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 4000000
    }
}));
app.use(cookieParser());

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
app.use(userRoute);
app.use(newsRoute);

var port = process.env.PORT || 3000;
var server = process.env.SERVER;
app.listen(port, () => {
	console.log(`Servidor aberto! acesse: http://${server}:${port}`);
});