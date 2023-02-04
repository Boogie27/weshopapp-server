const mongoose = require('mongoose')



const orderSchema  = new mongoose.Schema({
    reference: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    email: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'products',
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})



const Order = mongoose.model("orders", orderSchema)

module.exports =  Order