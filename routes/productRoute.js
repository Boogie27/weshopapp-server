const express = require('express')
const router = express.Router()
const { 
    FetchProducts,
    getProductLikes,
    ProductLikeToogle
} = require('../controllers/productController')





router.get('/api/product-likes/:product_id', getProductLikes)
router.post('/api/product-like-toggle', ProductLikeToogle)
router.get('/api/fetch-products', FetchProducts)





module.exports = router