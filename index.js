const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const PORT = 3001;

app.get('/', function (req, res) {
    res.send('Hello from the server!')
})
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})
console.log('Started server');