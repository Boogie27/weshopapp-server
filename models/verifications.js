const mongoose = require('mongoose')



const VerificationSchema  = new mongoose.Schema({
    email: {
        type: String,
        required: true
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



const Verification = mongoose.model("verifications", VerificationSchema)

module.exports =  Verification