const express = require('express');
const path = require('path');
const config = require('./configs/config');

const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.set(express.static(path.join(__dirname,'public')));

app.get('/',(req,res,next)=>{
    res.send("<h1>Hello World</h1>");
});

app.listen(config.server.port,()=>{
    console.log('Server running!');
})
