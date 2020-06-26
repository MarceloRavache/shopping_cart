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
const pages = require('./routes/page');
const admin_page = require('./routes/admin_pages');
const admin_category = require('./routes/admin_categories');
const admin_category = require('./routes/admin_products');


app.use('/',pages);
app.use('/admin/page',admin_page);
app.use('/admin/category',admin_category);
app.use('/admin/product',admin_product);



app.listen(config.server.port,()=>{
    console.log('Server running!');
})
