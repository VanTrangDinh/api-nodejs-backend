const express = require('express')
const routes = express.Router()

routes.get('/', (req, res, next) => {
    res.send('v1/user')
})

module.exports = routes