const express = require('express')
const route = express.Router()

route.get('/product', (req, res) => {
    res.json({message: 'product endpoint'})
})

module.exports = route