const express = require('express')
const routes = express.Router()

routes.get('/', (req, res, next) => {
    res.send('v2/order')
})

module.exports = routes