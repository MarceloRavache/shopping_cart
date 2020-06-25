const express = require('express');
const path = require('path');
const config = require('./configs/config');
const config_database = require('./configs/database');
const mongoose = require('mongoose');

//config database
mongoose.connect(config_database.database.connect);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('connected to mongodb');
})

//init app
const app = express();

//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//set public folder
app.set(express.static(path.join(__dirname,'public')));


//set routes
const pages = require('./routes/page');
const admin_page = require('./routes/admin_pages');

app.set('/',pages);
app.set('/admin',admin_page);


app.listen(config.server.port,()=>{
    console.log('Server running!');
})
