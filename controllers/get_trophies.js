const db_user = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = (req, res) =>{
	let token = req.headers.authorization.split(' ')[1]
	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (decoded) {
			let trophy_id = decoded.trophy
			//They must be turned into element of an array and push into it
			if(decoded.points > 50 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 100 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 150 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 200 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 300 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 500 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 1000 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 2000 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 3000 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 5000 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 6000 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 7000 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 10000 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 15000 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 20000 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			if(decoded.points > 30000 ){
				trophy_id = 'aaa' //The id of the element trophy must be inserted
			}
			db_user.findByIdAndUpdate(decoded._id, {trophy : trophy_id}, {new: true}).then( (user) => {
				console.log('user trophy', user.trophy);
				res.send(user) //How can I send back just user.trophy without throwing an error
			}).catch((err) => {
				res.send(err)
			})
		}
	})
}
