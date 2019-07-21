const db_user = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = (req, res) =>{
	let token = req.headers.authorization.split(' ')[1]
	// jwt.verify(token, process.env.SECRET, (err, decoded) => {
	// 	// if (decoded) {
	// 	// 	db_user.findByIdAndUpdate(decoded._id, {points: /*Bisogna costruire questo valore*/ }).then( (user) => {
	// 	// 		res.send(user.point) //Vedere come è user
	// 	// 	}).catch((err) => {
	// 	// 		res.send(err)
	// 	// 	})
	// 	// }
	// })
}
