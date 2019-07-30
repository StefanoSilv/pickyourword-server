const stripe = require('stripe')(process.env.STRIPE_SECRET)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db_user = require('../models/user')


module.exports = (req, res) => {
	stripe.charges.create({
		amount: 2.99 * 100,
		currency: 'eur',
		source: req.body.token.id
	}).then( (data) => {
		let token = req.headers.authorization.split(' ')[1]
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (decoded) {
				db_user.findById(decoded._id).then( (user) => {
					user.user_type = 'premium'
					db_user.findByIdAndUpdate(decoded._id, user, {new: true}).then( (u) => {
						res.status(200).json({
							user: u,
							stripe: data
						})
					})
				}).catch((err) => {
					res.send(err)
				})
			}
		})
	}).catch((err) => {
		res.send(err)
	})
}
