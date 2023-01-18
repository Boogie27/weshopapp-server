

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

module.exports = {
    url,
    today,
    senderEmail
}