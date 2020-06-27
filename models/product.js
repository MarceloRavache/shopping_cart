const mongoose = require('mongoose');

//page schema
const ProductSchema = mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    desc:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String
    }
});

const Product = module.exports =  mongoose.model('Product',ProductSchema);
