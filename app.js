const express = require('express');
const path = require('path');
const config = require('./configs/config');
const config_database = require('./configs/database');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

//config database
mongoose.connect(config_database.database.connect);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('connected to mongodb');
});


//init app
const app = express();


//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


//set public folder
app.use(express.static(path.join(__dirname,'public')));


//body parser middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
//parse application/json
app.use(bodyParser.json());


//express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));


//set routes
const pages = require('./routes/page');
const admin_page = require('./routes/admin_pages');
const { Session } = require('inspector');

app.use('/',pages);
app.use('/admin',admin_page);


app.listen(config.server.port,()=>{
    console.log('Server running!');
})
