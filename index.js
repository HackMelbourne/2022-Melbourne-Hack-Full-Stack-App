const express = require('express')
const cors = require('cors')
const app = express()
const route = require('route')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const responseRoute = require('./routes/response')

app.use(cors());
//This middleware is to read the body property of the request. 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'))
app.use('/', responseRoute);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})
console.log('Started server');