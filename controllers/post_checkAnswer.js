const db_user = require('../models/user')
const jwt = require('jsonwebtoken')
const axios = require('axios')

module.exports = (req, res) => {
	axios.get(`https://api.datamuse.com/words${req.body.endpoint}`).then((res) => {
		if(res.data && res.data.length){
			let answer = req.body.answer.toLowerCase()
			let correct_answers = res.data.map( (c) => c.word )
			console.log('correct answers' , correct_answers);
			let correct_answer = correct_answers.find( (element) => {
				return element === answer
			})
			let streak = req.body.streak
			let points_added = 2^streak
			let token = req.headers.authorization.split(' ')[1]
			if (token) {
				// verify
				jwt.verify(token, process.env.SECRET, (err, decoded) => {
					if(decoded) {
						// find user
						db_user.findById(decoded._id).then((user) => {
							if(correct_answer) {
								user.points += points_added
								streak++
							} else {
								user.points -= 1
								streak = 0
							}
							// Update user
							db_user.findByIdAndUpdate(decoded._id, user).then((u) => {
								console.log('u', u);
							})
						}).catch( (err) =>{
							console.log(err);
						})

					}

				})
			}

		}
	}).catch( (err) => {
		console.log(err);
	})
}
