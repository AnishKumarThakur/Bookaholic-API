const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image:{
        type: String
    },
    bookName:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    }
}, {timestamps: true});

const product = mongoose.model('products', productSchema);
module.exports = product;