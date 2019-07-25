const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = (req, res) => {
	console.log('req', req.body);
	console.log('source',req.body.token);
	stripe.charges.create({
		amount: 2.99 * 100,
		currency: 'usd',
		source: req.body.token
	}).then((data) => {
		console.log(data);
		res.send(data)
		let token = req.headers.authorization.split(' ')[1]
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (decoded) {
				db_user.findById(decoded._id).then( (user) => {
					console.log('user type',user.user_type);
					user.user_type = 'premium'
					db_user.findByIdAndUpdate(decoded._id, user, {new: true}).then( (u) => {
						res.json( u )
						console.log(u);
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
