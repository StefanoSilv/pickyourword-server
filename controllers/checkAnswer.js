const db_user = require('../models/user')
const db_guest = require('../models/guest')
const jwt = require('jsonwebtoken')
const axios = require('axios')
require('dotenv').config()

module.exports = (req, res) => {
	axios.get(`https://api.datamuse.com/words${req.body.endpoint}`).then((answers) => {
		//Answer checked and working
		let answer = req.body.answer.toLowerCase()

		let correct_answers = answers.data.map( (c) => c.word )
		let correct_answer = correct_answers.find( (element) => {
			return element === answer
			console.log(element);
		})

		//points added is working
		let points_added = 0
		if(req.headers.authorization){
			let token = req.headers.authorization.split(' ')[1]
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
								user.streak++ //Working
								points_added = 2 * user.streak
								user.points += points_added //Working
							} else {
								//Working in this case
								//The points can't be negative
								if(user.points>0){
									user.points -= 1 //working
									user.streak = 0 //working
								}else{
									user.points=0
									user.streak = 0
								}
							}
							// Update user
							db_user.findByIdAndUpdate(decoded._id, user, {new: true}).then( (u_db) => {
								let u = u_db.toObject()
								res.json( u )
							})
						}else{
							window.location.href = `${process.env.REACT_URL}pay`
						}
					}).catch( (err) =>{
						console.log(err);
					})
				}
			})
		}else{
			console.log('req.body',req.body);
			//If there is no token
			//If there is an id
			if(req.body.guest._id){
				db_guest.findById(req.body.guest._id).then( (guest) => {
					if (guest.rounds < 10){
						guest.rounds++
						if(correct_answer) {
							guest.streak++
							points_added = 2 * guest.streak
							guest.points += points_added
						} else {
							if(guest.points > 0){
								guest.points -= 1
								guest.streak = 0
							}else{
								guest.points = 0
								guest.streak = 0
							}
						}
						db_guest.findByIdAndUpdate(guest._id, guest, { new: true }).then( (g) =>{
							console.log(g);
							res.json( g )
						}).catch( (err) => {
							console.log(err);
						})
					}else{
						window.location.href = `${process.env.REACT_URL}signup`
					}
				}).catch( (err) => {
					console.log(err);
				})
			}else{ //If there is no id
				let streak_guest = 0
				let points_guest = 0
				if(correct_answer) {
					streak_guest++
					points_guest = 2
				} else {
					points_guest = 0
					streak_guest = 0
				}
				let new_guest = new db_guest({
					rounds: 1,
					points: points_guest,
					streak: streak_guest
				})

				new_guest.save().then( (guest) => { // send to client)
					console.log(guest);
					res.json(guest)
				}).catch( (err) => {
					console.log(err);
				})
			}
		}
	}).catch( (err) => {
		console.log(err);
	})
}
