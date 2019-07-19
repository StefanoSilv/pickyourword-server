const db_user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
	//Check if the name is already present in the database
	db_user.findOne({name : req.body.name}).then( (user_n) => {
		if(user_n){ //If it is:error
			res.send('The name is already present in the database')
		}else{
			//Else, check if the email is already present in the database
			db_user.findOne({email : req.body.email}).then( (user_m) => {
				if(user_m){ //If it is: error
					res.send('The email is already present in the database')
				}else{
					//If both mail and name are unique, it goes on
					bcrypt.hash(req.body.password, 10, (err, encrypted) => {
						if (err) {
							res.status(300).send('Error:', err)
						} else {
							req.body.password = encrypted
							db_user.create(req.body).then( (user) => {
								let token = jwt.sign(user.toObject(), process.env.SECRET)
								res.status(200).json({
									message: 'You are signed up',
									token: token
								})
								console.log('res', res);
							}).catch((err) => {
								res.send(err)
							})
						}
					})
				}
			}).catch((err) => {
				res.send(err)
			})
		}
	}).catch((err) => {
		res.send(err)
	})
}
