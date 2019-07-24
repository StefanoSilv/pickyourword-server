const db = require('../db')
const mongoose = require('mongoose')

const db_user = db.model('users', {
	name: {
		type: String,
		required: [true, 'User Name is required']
	},
	email: {
		type: String,
		required: [true, 'User Email is required']
	},
	password: {
		type: String,
		required: [true, 'User Password is required']
	},
	user_type: {
		type: String,
		default:'basic'
	},
	points: {
		type: Number,
		default:0
	},
	rounds: {
		type: Number,
		default:0
	},
	iscription_date:{
		type: Date,
		default: Date.now()
	},
	streak: {
		type: Number,
		default:0
	}
})

module.exports = db_user
