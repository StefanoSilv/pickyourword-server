const db = require('../db')

const db_trophy = db.model('trophy', {
	name: {
		type: String
	},
	pic: {
		type: String
	}
})

module.exports = db_trophy
