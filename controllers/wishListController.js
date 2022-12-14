const User = require('../models/users')
const Wishlist = require('../models/wishlist')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')







// fetch wishlist
const fetchWishlist = AsyncHandler(async (request, response) => {
    const token = request.params.token
    const exists = await User.findOne({token: token, is_active: 1}).exec()
    if(exists){
        const items = await Wishlist.find({user: exists._id}).populate(
            'product',
            '_id image product_name category price quantity' 
        )
        if(items){
            return response.send(items)
        }
    }
   return response.send(false)
})



// add to wishlist
const addToWishlist = AsyncHandler(async (request, response) => {
    const { product_id, user_id } = request.body
    const item = {
        product: product_id,
        user: user_id,
        created_at: today()
    }
    const exists = await Wishlist.findOne({product: product_id, user: user_id}).exec()
    if(exists){
        return response.send({state: 'exists'})
    }

    const newWishlist = Wishlist.create(item)
    if(newWishlist){
        return response.send({ state: 'created'})
    }
    return response.send({state: 'error'})
})








// delete  wishlist item
const deleteWishlist = AsyncHandler(async (request, response) => {
    const {_id, user } = request.body
    if(user){
        const userExists = await User.findOne({_id: user._id, is_active: 1}).exec()
        if(userExists){
            if(_id == 'delete-all'){
                const deleteAll =  Wishlist.deleteMany({user: user._id}).exec()
                if(deleteAll){
                    return response.send(true)
                }
            }else{
                const exists =  Wishlist.findOne({_id: _id}).exec()
                if(exists){
                    const deleteItem =  Wishlist.deleteOne({_id: _id}).exec()
                    if(deleteItem){
                        return response.send(true)
                    }
                }
                return response.send(false)
            }
        }else{
            console.log('Error: user does not exists ')
        }
    }
})





module.exports = { 
    addToWishlist,
    fetchWishlist,
    deleteWishlist,
}