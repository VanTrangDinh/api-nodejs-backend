const express = require('express')
const routes = express.Router()

routes.use('/order', require('./orders/order.route'))
routes.use('/user', require('./users/user.route'))

module.exports = routes