const User = require('../models/users')
const Likes = require('../models/likes')
const Product = require('../models/products')
const Reviews = require('../models/reviews')
const productSeeds = require('../database/product-seeds')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')



// fetch product likes
const getProductLikes = AsyncHandler(async (request, response) => {
    const product_id = request.params.product_id
    const productLikes = await Likes.find({product_id: product_id, type: 'like'}).exec()
    const productDislikes = await Likes.find({product_id: product_id, type: 'dislike'}).exec()
    
    return response.send({likes: productLikes, dislike: productDislikes})
})




// like and dislike product
const ProductLikeToogle = AsyncHandler(async (request, response) => {
    const like = request.body
    
    const user = await User.findOne({_id: like.user_id}).exec()
    if(!user){
        return response.send('failed')
    }
    if(user){
        const exists = await Likes.findOne({user: like.user_id, product_id: like.product_id}).exec()
        if(exists){
            if(exists.type == 'like' && like.type == 'like'){
                await Likes.deleteOne({_id: exists._id}).exec()
            } else if(exists.type == 'dislike' && like.type == 'dislike'){
                await Likes.deleteOne({_id: exists._id}).exec()
            }else{
                await Likes.findOneAndUpdate({_id: exists._id}, {$set: { type: like.type}}).exec()
            }
            return response.send('ok')
        }
       
        const likeType = like.type == 'like' ? like.type : 'dislike'
        const newLikes = {
            product_id: like.product_id,
            user: like.user_id,
            type: likeType,
            created_at: today()
        }
        
        const createLike = await Likes.create(newLikes)
        if(createLike){
            const totalLikes = await Likes.find({product_id: like.product_id}).exec()
            return response.send({ data: likeType, like: createLike, totalLikes: totalLikes })
        }
    }
    return response.send('error')
})








// fetch product in product page
const FetchProducts = AsyncHandler(async (request, response) => {
    ProductTableSeeder(true)
    const products = await Product.find({is_featured: 1}).limit(20).exec()
    return response.send(products)
})






// query product table with products
const ProductTableSeeder = (type) => {
    if(type === true){
        // const createProducts = Product.create(productSeeds)
        // if(createProducts){
        //     return 'products created successfully!'
        // }
    }
}




// fetch products by price filter
const FetchProductBySorting = AsyncHandler(async (request, response) => {
    let limit = ''
    let name = 'ascending'
    const value = request.params
    if(value.limit != '-'){
        limit = value.limit
    }
    if(value.alphabet != '-'){
        name = value.alphabet
    }

    const products = await Product.find({}).sort({ product_name: name }).limit(limit).exec()
    console.log(products)
    return response.send(products)
})





// fetch featured products
const FeaturedProducts = AsyncHandler(async (request, response) => {
  
    const featuredProducts = await Product.find({is_featured: 1}).limit(16).exec()


    const featured = await Product.aggregate([
        { $lookup:
            {
              from: 'product_reviews',
              localField: '_id',
              foreignField: 'product',
              as: 'reviews'
            }
          },
        {
            $match: {
                is_featured: 1
            }
        },
        { $limit: 16 }
    ]).exec()

    return response.send(featured)
   
    return response.send(featuredProducts)
})





//  fetch product stars
const FetchProductStars = AsyncHandler(async (request, response) => {
    // const id = request.params.id
    // const fetchStars = await Reviews.find({ product: '62a9880252a759f59e10d3c5' }).exec()
    // if(fetchStars){
    //     // return console.log(fetchStars)
    // }
    // return console.log(id)
})















module.exports = { 
    FetchProducts,
    getProductLikes,
    FeaturedProducts,
    FetchProductStars,
    ProductLikeToogle,
    FetchProductBySorting,
}