const express = require('express');
const productRouter = require('./src/routes/index');
const bodyParser = require('body-parser');
const app = express();


app.use(express.json());

app.use(bodyParser.json());

app.use('',productRouter);



module.exports = app;