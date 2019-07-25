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

//checkQuestion and Answer
app.post('/api/checkAnswer', require('./controllers/checkAnswer'))

//To remove a point
app.post('/api/removePoint', require('./controllers/removePoint'))

//Changing the streak to zero
app.post('/api/streakToZero', require('./controllers/streakToZero'))

//Get logged user
app.get('/api/me', require('./controllers/get_me'))

//Signup
app.post('/api/signup', require('./controllers/signup'))

//Login
app.post('/api/login', require('./controllers/login'))

//Pay
app.post('/api/pay', require('./controllers/pay'))







app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
})
