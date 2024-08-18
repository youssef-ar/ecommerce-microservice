const express = require('express');
const orderRouter = require('./src/routes/index'); 
const bodyParser = require('body-parser');
const app = express();


app.use(express.json());

app.use(bodyParser.json());

app.use('',orderRouter);



module.exports = app;