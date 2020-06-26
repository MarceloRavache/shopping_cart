const route = require('express').Router();
const Page = require('../models/pages');

route.post('/create-page',(req,res,next)=>{
    const { title, slog, content} = req.body;

    Page.findOne({title},(err,page)=>{
        if(page){return res.send({error:"titulo já existe"})}
        page = new Page({
            title,
            slog,
            content
        });
        page.save((err)=>{
            if(err) return res.send({error:err});
            return res.send({message:"pagina criada"});
        });
    });
});

route.post('/edit-page/:id',(req,res,next)=>{
    const id = req.params.id;
    const { title, slog, content} = req.body;
    Page.findById(id,(err,page)=>{
        if(err) return res.send({error:err});
        if(title !=="") page.title = title;
        if(slog !== "") page.slog =  slog;
        if(content !=="") page.content = content;
        page.save((err)=>{
            if(err) return res.send({error:err});
            return res.send({message:"pagina editada"});
        });
    })
});

route.post('/delete-page/:id',(req,res,next)=>{
    const id = req.params.id;
    Page.findByIdAndDelete(id, (err)=>{
        if(err) return res.send({error:err});

        return res.send({message:"pagina deletada"});
    });
});

route.get('/list-page', async (req,res,next)=>{
    await Page.find({},(err,pages)=>{
        if(err) return res.send({error:err});

        return res.send({pages:pages});
    });
    
});

module.exports = route;
