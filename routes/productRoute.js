const express = require('express')
const router = express.Router()
const { 
    FetchProducts,
    getProductLikes,
    FeaturedProducts,
    ProductLikeToogle,
    FetchProductStars,
    FetchProductBySorting
} = require('../controllers/productController')




// get request
router.get('/api/product-likes/:product_id', getProductLikes)
router.get('/api/fetch-products', FetchProducts)
router.get('/api/featured-product', FeaturedProducts)
router.get('/api/fetch-product-stars/:id', FetchProductStars)
router.get('/api/fetch-products-by-sorting/:alphabet/:limit', FetchProductBySorting)




// post request
router.post('/api/product-like-toggle', ProductLikeToogle)





module.exports = router