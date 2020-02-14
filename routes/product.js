const express = require('express');
const Product = require('../models/products');
const auth = require('../auth');

const router = express.Router();

router.route('/')
    .post(auth.verifyUser, (req,res,next) => {
        Product.create({
            image: req.body.image,
            bookName: req.body.bookName,
            description: req.body.description,
            price: req.body.price
        })
        .then((Product) => {
            res.statusCode = 200;
            res.json(Product);
        }).catch(next);
    })

    // .post(auth.verifyUser, (req,res,next) => {
    //     let products = new Product(req.body);
    //     products.save()
    //         .then((products) => {
    //             res.statusCode = 200;
    //             res.json(products);
    //         }).catch(next);
    // })

    .delete((req,res,next) => {
        Product.deleteMany({ adminId: req.user._id})
            .then((reply) => {
                res.json(reply);
            })
            .catch(next);
    })


router.route('/:id')
    .get((req,res,next) => {
        Product.findOne({adminId: req.user._id, _id: req.params.id})
            .then((products) => {
                if(products == null)
                    throw new Error("No product found!")
                    res.json(products);
            }).catch(next);
    })

    .post((req,res) => {
        res.statusCode = 405;
        res.json({message: "Invalid method for inserting data."})
    })

    .put(auth.verifyUser, (req,res,next) => {
        Product.findOneAndUpdate({
            // adminId: req.user._id,
            _id: req.params.id
        },
        {
            $set: req.body
        },
        {
            new: true
        })
        .then((reply) => {
            if(reply == null)
                throw new Error ("Product not found!");
                res.json(reply);  
        }).catch(next);
    })

module.exports = router;