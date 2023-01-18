

const today = () => {
    let today = new Date().toISOString()
    return today
}

const url = (string) => {
    return `http://localhost:3000${string}`
}


module.exports = {
    url,
    today
}