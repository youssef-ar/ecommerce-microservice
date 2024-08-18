const express = require('express');
const productRouter = require('./src/routes/index');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();



app.use(express.json());

app.use(bodyParser.json());

app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));

app.use('',productRouter);



module.exports = app;