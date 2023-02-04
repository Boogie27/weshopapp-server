const mongoose = require('mongoose')



const transactionSchema  = new mongoose.Schema({
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
    quantity: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    card_vendor: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})



const Transaction = mongoose.model("transactions", transactionSchema)

module.exports =  Transaction