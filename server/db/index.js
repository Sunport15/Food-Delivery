const mongoose = require('mongoose')
//mongoose is elegant mongodb object modelling for node.js -- to create schema and make models 

mongoose
    .connect('mongodb://localhost:27017/food-ordering', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db