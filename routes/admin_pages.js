const route = require('express').Router();
const Page = require('../models/pages');

route.post('/create-page',(req,res,next)=>{
    const { title, slog, content} = req.body;

    Page.findOne({title},(err,page)=>{
        if(page){
            return res.send({error:"titulo já existe"})
        }else{
            const page = new Page({
                title,
                slog,
                content,
                sorting:0
            });
            page.save((err)=>{
                if(err){
                    return res.send({error:err});
                }
            })
        }
    });
});

module.exports = route;
