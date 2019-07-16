const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const app = express()
//Api







app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
})
