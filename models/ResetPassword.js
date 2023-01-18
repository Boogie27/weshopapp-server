const mongoose = require('mongoose')



const ResetPasswordSchema  = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    token: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})



const PasswordReset = mongoose.model("password_resets", ResetPasswordSchema)

module.exports =  PasswordReset