
const Categories = require('../models/categories')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')







// fetch categories
const fetchCategories = AsyncHandler(async (request, response) => {
    const category = await Categories.aggregate([
        { $lookup:
            {
              from: 'sub_categories',
              localField: '_id',
              foreignField: 'category',
              as: 'sub_categories'
            }
        }
    ]).exec()

    return response.send(category)
})











module.exports = { 
    fetchCategories
}