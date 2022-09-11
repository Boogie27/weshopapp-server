const express = require('express')
const app = express()



const PORT = process.env.PORT || 3001

app.get('/', async (request, response) => {
    return response.send('hello first deployed server')
})

app.listen(PORT, () => {
    console.log("Server running on port: " + PORT)
})
