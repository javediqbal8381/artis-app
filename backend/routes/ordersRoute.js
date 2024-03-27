const express = require('express')

const  router = express.Router()

const ordersController = require('../controllers/ordersController')

router.get('/payment',ordersController.payment)

router.post('/',ordersController.createOrder)

router.get('/byshop/:shopId', ordersController.getOrdersByShop)

module.exports =router

