const express = require('express');
const path = require('path');
const config = require('./configs/config');
const config_database = require('./configs/database');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//init app
const app = express();


//config database
mongoose.connect(config_database.database.connect);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('connected to mongodb');
});


//set public folder
app.use(express.static(path.join(__dirname,'public')));


//body parser middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
//parse application/json
app.use(bodyParser.json());


//set routes
const admin_product = require('./routes/admin_products');


//app.use('/',pages);
app.use('/admin/product',admin_product);



app.listen(config.server.port,()=>{
    console.log('Server running!');
})
