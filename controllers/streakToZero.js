const db_user = require('../models/user')
const jwt = require('jsonwebtoken')
const axios = require('axios')

module.exports = (req, res) => {
	let token = req.headers.authorization.split(' ')[1]
	//for logged users
	if (token) {
		//verify the user
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if(decoded) {
				//find the user by id after the decoding of the token
				db_user.findById(decoded._id).then((user) => {
					user.streak = 0
					db_user.findByIdAndUpdate(decoded._id, user, {new: true}).then( (u) => {
						res.json( u )
					}).catch( (err) => {
						console.log(err);
					})
				}).catch( (err) =>{
					console.log(err);
				})
			}
		})
	}else{ //if user not logged
		console.log('hello');
	}
}
