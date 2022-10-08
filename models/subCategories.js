const mongoose = require('mongoose')



const subCategorySchema  = new mongoose.Schema({
    sub_category: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'categories',
    },
    created_at: {
        type: Date,
        required: true
    },
})



const subCategories = mongoose.model("sub_categories", subCategorySchema)

module.exports =  subCategories