const express = require('express')
const router = express.Router()
const {
    MakeOrder
} = require('../controllers/orderController')





router.post('/api/make-order', MakeOrder)







module.exports = router