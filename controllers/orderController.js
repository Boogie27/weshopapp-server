const User = require('../models/users')
const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Product = require('../models/products')
const Transaction = require('../models/Transaction')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')








const MakeOrder = AsyncHandler(async (request, response) => {
    const { user, email, method, reference, card_vendor } = request.body

    // Check if user exists and is verified
    const userExists = await User.findOne({email: email})
    if(!userExists){
        return response.json({user: 'not-exist'})
    }
    if(userExists && userExists.is_verify == 0){
        return response.json({user: 'not-verified'})
    }
    
    // Get cart items
    const cartItems = await Cart.find({user: user})
    if(cartItems.length == 0){
        return response.json({data: 'empty'})
    }
    const quantity = cartItems.length

    // create transaction
    const orderItem = {
        user: user,
        email: email,
        method: method,
        quantity: quantity,
        reference: reference,
        card_vendor: card_vendor,
        created_at: today()
    }
    const createTranscrtion =  await Transaction.create(orderItem)
    if(createTranscrtion){
        // create orders
        cartItems.forEach(async (item, index) => {
            const orderItem = {
                user: user,
                email: email,
                reference: reference,
                product: item.product,
                price: item.price,
                quantity: item.quantity,
                created_at: today()
            }
            //create order
            const make_order = await Order.create(orderItem)
            if(make_order){
                // update product quantity
                const productItem = await Product.findOne({_id: item.product})
                if(productItem){
                    let newQty = productItem.quantity - item.quantity
                    if(newQty <= 0){
                        newQty = 0
                    }
                    const updateProduct = await Product.findOneAndUpdate({_id: item.product}, {$set: { quantity: newQty}})
                }
            }
        })
        return response.json({data: 'order-created'})
    }
    return response.json({data: 'error'})
})



module.exports = { 
    MakeOrder,
}