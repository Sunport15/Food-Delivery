const express = require('express')

const router = express.Router()

const Product = require('../models/productModel')

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send({ data: products})
    } catch (err) {
        res.status(400).send({ error: err})
    }
})

router.get('/products-by-categories', async(req, res) => {
    try {
        const products = await Product.aggregate([
            { $match: {}},
            { $group: {
                _id: '$category',//aggreagate based on category
                products: { $push: '$$ROOT'}//root would return all the fields of the products
            }},
            { $project: { name: '$_id', products: 1, _id: 0}}
        ])
        res.status(200).send({ data: products})
    } catch (err) {
        res.status(400).send({ error: err})
    }
})

module.exports = router