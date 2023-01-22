const mongoose = require('mongoose')



const reviewsSchema  = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'products',
    },
    stars: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    reviews: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
      },
})



const product_reviews = mongoose.model("product_reviews", reviewsSchema)

module.exports =  product_reviews