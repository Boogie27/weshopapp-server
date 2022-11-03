const express = require('express')
const router = express.Router()
const { 
    addToWishlist,
    fetchWishlist,
    deleteWishlist
} = require('../controllers/wishListController')









router.post('/api/add-to-wishlist', addToWishlist)
router.post('/api/delete-wishlist-item', deleteWishlist)
router.get('/api/fetch-wishlist-items/:token', fetchWishlist)







module.exports = router

