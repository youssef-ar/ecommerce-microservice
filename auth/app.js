const express = require('express');
const authRouter = require('./src/routes/index');
const app = express();


app.use(express.json());

app.use('',authRouter);
app.post('/',(req,res)=>{
    res.status(200).json("test");
})



module.exports = app;