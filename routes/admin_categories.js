const route = require('express').Router();
const Category = require('../models/category');

route.post('/create-category',(req,res,next)=>{
    const { title, slog} = req.body;

    Category.findOne({title},(err,category)=>{
        if(category) return res.send({error:"Categoria já existe"});
        category = new Category({
            title,
            slog
        });
        category.save((err)=>{
            if(err) return res.send({error:err});
            return res.send({message:"categoria criada"});
        });
    });
});

route.post('/edit-category/:id',(req,res,next)=>{
    const id = req.params.id;
    const {title, slog} = req.body;
    Category.findById(id,(err,category)=>{
        if(err) return res.send({error:err});
        if(title !== "") category.title = title;
        if(slog !== "") category.slog= slog;
        category.save((err)=>{
            if(err) return res.send({error:err});
            return res.send({message:"categoria editada"});
        })
    })
});

route.post('/delete-category/:id',(req,res,next)=>{
    const id = req.params.id;
    Category.findByIdAndDelete(id, (err)=>{
        if(err) return res.send({error:err});

        return res.send({message:"categoria deletada"});
    })
});

route.get('/list-category', async (req,res,next)=>{
    await Category.find({},(err,categories)=>{
        if(err) return res.send({error:err});

        return res.send({categories:categories});
    });
    
});

module.exports = route;
