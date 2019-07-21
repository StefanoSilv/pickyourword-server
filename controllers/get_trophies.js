const db_user = require('../models/user')

module.exports = (req, res) =>{

	db_trophy.find({}).then( (data) => {
		res.send(data)
	}).catch( (err)=>{
		res.send(err)
	})
}
