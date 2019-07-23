const db_user = require('../models/user')
const jwt = require('jsonwebtoken')
const axios = require('axios')

module.exports = (req, res) => {
	axios.get(`https://api.datamuse.com/words${req.body.endpoint}`).then((res) => {
		//Answer checked and working
		let answer = req.body.answer.toLowerCase()

		let correct_answers = res.data.map( (c) => c.word )
		let correct_answer = correct_answers.find( (element) => {
			return element === answer
			console.log(element);
		})
		//streak is working
		let streak = req.body.streak
		//points added is working
		let points_added = streak^2
		let token = req.headers.authorization.split(' ')[1]
		if (token) {
			// verify
			jwt.verify(token, process.env.SECRET, (err, decoded) => {
				if(decoded) {
					// find user
					db_user.findById(decoded._id).then((user) => {
						if (user.rounds < 2000){
							user.rounds++
							//It is working until here
							if(correct_answer) {
								//Working in this case
								streak++ //Working
								user.points += points_added //Working
							} else {
								//Working in this case
								//The points can't be negative
								if(user.points>0){
									user.points -= 1 //working
									streak = 0 //working
								}else{
									user.points=0
									streak = 0
								}
							}
							// Update user
							db_user.findByIdAndUpdate(decoded._id, user, {new: true}).then( (u) => {
								res.json(u)
							})
						}else{
							//Redirection to premium account
						}
					}).catch( (err) =>{
						console.log(err);
					})
				}
			})
		}else{
			//If there is no token
			db_guest.create({
				rounds: 0,
				points: 0,
				streak: 0
			}).then( (user) => {
				if (user.rounds < 10){
					user.rounds++
					if(correct_answer) {
						user.points += points_added
						user.streak++
					} else {
						if(user.points > 0){
							user.points -= 1
							user.streak = 0
						}else{
							user.points = 0
							user.streak = 0
						}
					}
					db_guest.findByIdAndUpdate(user._id, user, { new: true }).then( (u) =>{
						res.json(u)
					})
				}else{
					//Redirection to signup
				}
			}).catch( (err) => {
				console.log(err);
			})
		}
	}).catch( (err) => {
		console.log(err);
	})
}
