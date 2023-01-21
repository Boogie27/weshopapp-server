const User = require('../models/users')
const ResetPassword = require('../models/ResetPassword')
const AsyncHandler = require('express-async-handler')
const { today, url } = require('../data')
// const { SendEmail} = require('../Mailer')
const { SendEmail} = require('../handlebars')
const bcrypt = require('bcrypt')






// register a user
const registerUser = AsyncHandler(async (request, response) => {
    const { username, email, password, gender, confirmPassword } = request.body

    // validate input
    const validation = validate_input(request.body)
    if(validation){
        return response.json({ validationError: true, validation})
    }

    const exists = await User.findOne({ email: email })
    if(exists){
        return response.send('exists')
    }
    
    const hash_pwd = hashPassword(password) // generate hash password

    const token = generate_token(username) //generate token

    const newUser = {
        first_name: '',
        last_name: '',
        user_name: username,
        email: email,
        password: hash_pwd,
        image: '',
        token: token,
        gender: gender,
        theme: 'light',
        is_active: 1,
        last_login: today(),
        remember_me: '',
        created_at: today()
    }

    const createUser = await User.create(newUser)
    if(createUser){
        let options = {
            maxAge: 1000 * 60 * 60 * 24, // would expire after on day
            httpOnly: true, // The cookie only accessible by the web server
            signed: true // Indicates if the cookie should be signed
        }
        return response.cookie('weshopapp', token, options).send({data: 'success', user: createUser})
    }else{
        response.status(400)
        throw new Error("User Not Created")
    }
})



const hashPassword = (password) => {
    const salt =  bcrypt.genSaltSync(5)
    const hash =  bcrypt.hashSync(password, salt)
    return hash
}




const generate_token = (username) => {
    const salt =  bcrypt.genSaltSync(5)
    const hash =  bcrypt.hashSync(username, salt)
    return hash
}



// validate user input
const validate_input = (input) => {
    let email = ''
    let username = ''
    let password = ''
    let confirmPassword = ''
    
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(input.email == ""){
        email = "*Email field is required"
    } else if(!input.email.match(validRegex)){
        email = "*Invalid email address"
    }

    if(input.username == ""){
        username = "*Username field is required"
    }else if(input.username.length < 3){
        username = "*Must be minimum of 3 characters"
    }else if(input.username.length > 50){
        username = "*Must be maximum of 50 characters"
    }

    if(input.password == ""){
        password = "*Passowrd field is required"
    }else if(input.password.length < 6){
        password = "*Must be minimum of 6 characters"
    }else if(input.password.length > 12){
        password = "*Must be maximum of 12 characters"
    }

    if(input.confirmPassword == ""){
        confirmPassword = "*Confirm passowrd field is required"
    }else if(input.confirmPassword !== input.password){
        confirmPassword = "*Confirm password Must equalls password"
    }

    if(username.length || email.length || password.length || confirmPassword.length){
        return {email: email, username: username, password: password, confirmPassword: confirmPassword}
    }else{
        return false
    }
}








// get loggedin user
const getUser = AsyncHandler(async (request, response) => {
    const { token } = request.body
    const user = await User.findOne({ token: token })
    if(user){
       const authUser = {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        user_name: user.user_name,
        email: user.email,
        image: user.image,
        gender: user.gender,
        theme: user.theme,
        is_active: user.is_active,
        last_login: user.last_login,
        remember_me: user.remember_me,
        created_at: user.created_at
       }
       return response.send(authUser)
    }
    return response.send(user)
})






// change user theme 
const changeUserTheme = AsyncHandler( async (request, response) => {
    const user  = request.body
    const userTheme = user.theme ? 'dark' : 'light'

    const theme = await User.findOneAndUpdate({_id: user._id}, {$set: { theme: userTheme}})
    if(theme){
        return response.send(userTheme)
    }
    return response.send(false)
})





//logout user
const logoutUser = AsyncHandler( async (request, response) => {
    const id = request.query.id
    const logout = await User.findOneAndUpdate({_id: id}, {$set: { is_active: 0}})
    if(logout){
        return response.send(true)
    }
    return response.send(false)
})




// login user
const loginUser = AsyncHandler( async (request, response) => {
    // validate input
    const { email, password } = request.body
    const validation = loginValidateInput(request.body)
    if(validation){
        return response.json({ validationError: true, validation})
    }

    const exists = await User.findOne({ email: email })
    if(!exists){
        return response.send(false)
    }
    
    // compare password
    const comparePassword = await bcrypt.compare(password, exists.password)
    if(!comparePassword){
        return response.send(false)
    }
    const loginUser = await User.findOneAndUpdate({_id: exists._id}, {$set: { is_active: 1}}).exec()
    if(loginUser){
        let options = {
            maxAge: 1000 * 60 * 60 * 24, // would expire after on day
            httpOnly: true, // The cookie only accessible by the web server
            signed: true // Indicates if the cookie should be signed
        }
        return response.cookie('weshopapp', exists.token, options).send({data: 'success', user: exists})
    }
    return response.send(false)
})



// validate user input
const loginValidateInput = (input) => {
    let email = ''
    let password = ''
    
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(input.email == ""){
        email = "*Email field is required"
    } else if(!input.email.match(validRegex)){
        email = "*Invalid email address"
    }

    if(input.password == ""){
        password = "*Passowrd field is required"
    }else if(input.password.length < 6){
        password = "*Must be minimum of 6 characters"
    }else if(input.password.length > 12){
        password = "*Must be maximum of 12 characters"
    }

    if(email.length || password.length){
        return {email: email, password: password}
    }else{
        return false
    }
}






// send reset user password email
const resetPasswordEmail = AsyncHandler( async (request, response) => {
    const email = request.body.email
    
    // validate email input
    const validation = resetPasswordValidateInput(email)
    if(validation){
        return response.json({ validationError: true, validation})
    }

    const userExists = await User.findOne({ email: email })
    if(!userExists){
        return response.json({ exists: false})
    }

    if(userExists){
        const token = generate_token(userExists.user_name)
        const link = url(`/reset-password?token=${token}`)

        const tokenExists = await ResetPassword.findOne({ email: email })
        if(tokenExists){
            const deleteToken = await ResetPassword.deleteOne({_id: tokenExists._id}).exec()
        }

        const credentials = {
            email: userExists.email,
            user: userExists._id,
            token: token,
            created_at: today()
        }
        const create = await ResetPassword.create(credentials)
        if(create){
            // send email with link
            emailMessage = {
                link: link,
                to: email,
                userName: userExists.user_name,
                template: 'ResetPasswordMsg',
                subject: 'first node email'
            }
            const mail = SendEmail(emailMessage) //send token to email
            
            return response.json({ data: true})
        }
    }
})




// validate user input
const resetPasswordValidateInput = (email) => {
    let email_alert = ''

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email == ""){
        email_alert = "*Email field is required"
    } else if(!email.match(validRegex)){
        email_alert = "*Invalid email address"
    }

    if(email_alert.length){
        return { email: email_alert }
    }else{
        return false
    }
}





const resetPassword = AsyncHandler( async (request, response) => {
    const input = request.body.user_input
    // reset passowrd form validation
    const validation = validatePwdResetInput(input)
    if(validation){
        return response.json({ validationError: true, validation})
    }

    const tokenExists = await ResetPassword.findOne({ email: input.email, token: input.token })
    if(!tokenExists){
        return response.send({tokenExists: false})
    }

    const exists = await User.findOne({ _id: tokenExists.user })
    if(!exists){
        return response.send({exists: false})
    }

    const generate_pwd = hashPassword(input.password)
    const updatePwd = await User.findOneAndUpdate({_id: exists._id}, {$set: { password: generate_pwd }})
    if(updatePwd){
        
        await ResetPassword.findOneAndDelete({_id: tokenExists._id}).exec()
        return response.send({passwordUpdate: true})
    }
    return response.send({passwordUpdate: false})
})





// password rest form vailadation
const validatePwdResetInput = (input) => {
    let email = ''
    let password = ''
    let confirmPassword = ''

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(input.email.length == 0){
        email = "*Email field is required"
    } else if(!input.email.match(validRegex)){
        email = "*Invalid email address"
    }

    if(input.password.length == 0){
        password = "*Password field is required"
    }else if(input.password.length < 6){
        password = "*Must be minimum of 6 characters"
    }else if(input.password.length > 12){
        password = "*Must be maximum of 12 characters"
    }
    
    if(input.confirmPassword.length == 0){
        confirmPassword = "*Confirm password field is required"
    }else if(input.confirmPassword != input.password){
        confirmPassword = "*Password must equal to Confirm password"
    }

    if(email.length || password.length || confirmPassword.length){
        return {email: email, password: password, confirmPassword: confirmPassword}
    }else{
        return false;
    }
}






// check if passowrd reset token exists in database 
const checkToken = AsyncHandler( async (request, response) => {
    const token = request.body.token
    const tokenExists = await ResetPassword.findOne({ token: token })
    if(tokenExists){
        return response.send({tokenExists: true})
    }
    return response.send({tokenExists: false})
})




// delete reset password details from database
const deleteResetPassword = AsyncHandler( async (request, response) => {
    const token = request.body.token

    const deleteToken = await ResetPassword.findOneAndDelete({ token: token })
    if(deleteToken){
        return response.send({isDeleted: true})
    }
    return response.send({isDeleted: false})
})





module.exports = { 
    getUser,
    loginUser,
    checkToken,
    logoutUser,
    registerUser,
    resetPassword,
    resetPasswordEmail,
    changeUserTheme,
    deleteResetPassword
}







// encrypt password before saving
// UserSchema.pre('save', async function (next){
//     if(!this.isModified('password')){
//         return next()
//     }

//     const salt = await bcrypt.genSalt(20)
//     this.password = await bcrypt.hash(this.password, salt)

// })









