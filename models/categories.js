const mongoose = require('mongoose')



const categorySchema  = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})



const categories = mongoose.model("category", categorySchema)

module.exports =  categories