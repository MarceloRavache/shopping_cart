const mongoose = require('mongoose');

//page schema
const PageSchema = mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    slog:{
        type: String
    },
    content:{
        type: String,
        required: true
    }
});

const Page = module.exports =  mongoose.model('Page',PageSchema);
