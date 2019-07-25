const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = (req, res) => {
	console.log('req.body', req.body)
	stripe.charges.create({
		amount: req.body.amount * 100,
		currency: 'usd',
		source: req.body.token
	}).then((data) => {
		res.send(data)
	}).catch((err) => {
		console.log('err', err)
		res.send(err)
	})
}
