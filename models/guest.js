const db = require('../db')

const db_guest = db.model('guest', {
	points: {
		type: Number,
		default: 0
	},
	rounds: {
		type: Number,
		default: 0
	},
	streak: {
		type: Number,
		default: 0
	}
})

module.exports = db_guest
