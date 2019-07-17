const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

//It gives access to the body of the request that we can send to the database by Postman
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors({allowHeaders: true}))

//Request the database to connect it
require('./db.js')

//Api
//Signup
app.post('/api/signup', require('./controllers/signup'))

//Login
app.post('/api/login', require('./controllers/login'))







app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
})
