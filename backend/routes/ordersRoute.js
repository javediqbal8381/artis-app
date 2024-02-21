const express = require('express')

const  router = express.Router()

const ordersController = require('../controllers/ordersController')

router.get('/payment',ordersController.payment)

module.exports =router

