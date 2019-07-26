const db_user = require('../models/user')
const db_guest = require('../models/guest')
const jwt = require('jsonwebtoken')
const axios = require('axios')

module.exports = (req, res) => {
	if(req.headers.authorization){
		let token = req.headers.authorization.split(' ')[1]
		//for logged users
		//verify the user
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if(decoded) {
				//find the user by id after the decoding of the token
				db_user.findById(decoded._id).then((user) => {
					user.streak = 0
					db_user.findByIdAndUpdate(decoded._id, user, {new: true}).then( (u) => {
						res.json( u )
						console.log('user', u);
					}).catch( (err) => {
						console.log(err);
					})
				}).catch( (err) =>{
					console.log(err);
				})
			}
		})
	}else{ //if user not logged
		console.log('req.body.guest' , req.body.guest)
		if(req.body.guest._id){ //if the user is already playing, there must be an id
			db_guest.findById(req.body.guest._id).then( (guest) => {
				console.log(guest);
				guest.streak = 0
				if(guest.points > 0){
					guest.points -= 1
				}else{
					guest.points = 0
				}
			}).catch( (err) => {
				console.log(err);
			})
		}else{ //if the user is not already playing, a guest in the db must be created
			db_guest.create({
				rounds: 0,
				points: 0,
				streak:0
			}).then( (guest) => {
				res.json(guest)
			}).catch( (err) => {
				console.log(err);
			})
		}
	}
}
