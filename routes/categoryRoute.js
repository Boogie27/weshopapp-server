const express = require('express')
const router = express.Router()
const { 
    fetchCategories
} = require('../controllers/categoryController')





router.get('/api/categories', fetchCategories)






module.exports = router