const express = require('express')
const router = express.Router()
const { 
    getUser,
    loginUser,
    checkToken,
    logoutUser,
    VerifyUser,
    registerUser,
    resetPassword,
    checkUserToken,
    resetPasswordEmail,
    changeUserTheme,
    deleteResetPassword
} = require('../controllers/userController')



// **********GET SECTION **********
router.get('/api/logout/:token', logoutUser)
router.get('/api/verify-user', VerifyUser)




// **********POST SECTION**********
router.post('/api/get-auth-user', getUser)
router.post('/api/register-user', registerUser)
router.post('/api/user-theme-change', changeUserTheme)
router.post('/api/login-user', loginUser)
router.post('/api/reset-password-email', resetPasswordEmail)
router.post('/api/reset-password', resetPassword)
router.post('/api/check-for-token', checkToken)
router.post('/api/check-for-user-token', checkUserToken)
router.post('/api/delete-reset-password', deleteResetPassword)






module.exports = router