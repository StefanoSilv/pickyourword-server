const db_user = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
	axios.get(`https://api.datamuse.com/words${endpoint}`).then((res) => {
		if(res.data && res.data.length){
			console.log(res.data);
			console.log('hello')
		}
	})
	console.log('req body' , req.body);
	console.log('req headers' , req.headers);
	// console.log('res' ,res.data);
}
