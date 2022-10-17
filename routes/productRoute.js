const express = require('express')
const router = express.Router()
const { 
    FetchProducts,
    getProductLikes,
    ProductLikeToogle,
    FetchProductBySorting
} = require('../controllers/productController')





router.get('/api/product-likes/:product_id', getProductLikes)
router.post('/api/product-like-toggle', ProductLikeToogle)
router.get('/api/fetch-products', FetchProducts)
router.get('/api/fetch-products-by-sorting/:alphabet/:limit', FetchProductBySorting)







module.exports = router