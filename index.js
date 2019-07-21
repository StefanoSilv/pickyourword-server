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

//User
app.get('/api/users', require('./controllers/get_users'))

//Trophies
app.get('/api/trophies', require('./controllers/get_trophies'))

//checkQuestion and Answer
app.post('/api/checkAnswer', require('./controllers/post_checkAnswer'))
app.get('/api/checkAnswer', require('./controllers/get_checkAnswer'))
app.patch('/api/checkAnswer', require('./controllers/patch_checkAnswer'))

//Get logged user
app.get('/api/me', require('./controllers/get_me'))

//Signup
app.post('/api/signup', require('./controllers/signup'))

//Login
app.post('/api/login', require('./controllers/login'))







app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
})
