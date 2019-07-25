const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = (req, res) => {
	stripe.charges.create({
		amount: 2.99 * 100,
		currency: 'usd',
		source: req.body.token
	}).then((data) => {
		res.send(data)
		let token = req.headers.authorization.split(' ')[1]
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (decoded) {
				db_user.findById(decoded._id).then( (user) => {
					user.user_type = 'premium'
					db_user.findByIdAndUpdate(decoded._id, user, {new: true}).then( (u) => {
						res.json( u )
					})
				}).catch((err) => {
					res.send(err)
				})
			}
		})
	}).catch((err) => {
		console.log('err', err)
		res.send(err)
	})
}
