const route = require('express').Router();

route.get('/', (req,res,next)=>{
    res.send("sucess");
});

module.exports = route;
