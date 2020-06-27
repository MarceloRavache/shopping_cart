const route = require('express').Router();
const Product = require('../models/product');

route.post('/create-product',(req,res,next)=>{
    const { title, desc, category, price, image} = req.body;

    Product.findOne({title},(err,product)=>{
        if(product) return res.send({error:"produto já existe"});
        product = new Product({
            title,
            desc,
            category,
            price,
            image
        });
        product.save((err)=>{
            if(err) return res.send({error:err});
            return res.send({message:"produto criado"});
        });
    });
});

route.post('/edit-product/:id',(req,res,next)=>{
    const id = req.params.id;
    const {title, desc, category, price, image} = req.body;
    Product.findById(id,(err,product)=>{
        if(err) return res.send({error:err});
        if(title !== "") product.title = title;
        if(desc !== "") product.desc = desc;
        if(category !== "") product.category = category;
        if(price !== "") product.price = price;
        if(image !== "") product.image = image;

        product.save((err)=>{
            if(err) return res.send({error:err});
            return res.send({message:"produto editado"});
        })
    })
});

route.post('/delete-product/:id',(req,res,next)=>{
    const id = req.params.id;
    Product.findByIdAndDelete(id, (err)=>{
        if(err) return res.send({error:err});

        return res.send({message:"produto deletado"});
    })
});

route.get('/list-product', async (req,res,next)=>{
    await Product.find({},(err,products)=>{
        if(err) return res.send({error:err});

        return res.send({products:products});
    });
    
});

module.exports = route;
