

const today = () => {
    let today = new Date().toISOString()
    return today
}

const url = (string) => {
    return `http://localhost:3000${string}`
}


const senderEmail = {
        senderEmail: 'anonyecharles@gmail.com',
        resetPwdSubject: 'first node email'
    } 



const app_name = {
    app_name1: 'WESHOP',
    app_name2: 'APP'
}




module.exports = {
    url,
    today,
    app_name,
    senderEmail
}