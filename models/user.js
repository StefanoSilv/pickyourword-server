const db = require('../db')
const mongoose = require('mongoose')

const db_user = db.model('user', {
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
		default:'normal'
	},
	points: {
		type: Number,
		default:0
	},
	level: {
		type: String,
		default:'beginner'
	},
	rounds: {
		type: Number,
		default:0
	},
	trophy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'trophy'
	},
	iscription_date:{
		type: Date,
		default: Date.now()
	}
})

module.exports = db_user
