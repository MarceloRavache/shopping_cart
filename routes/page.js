const route = require('express').Router();

route.get('/', (req,res,next)=>{
    res.render('index');
});

module.exports = route;
