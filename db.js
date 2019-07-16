const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}, (err) => {
	if (err){
		console.log('error:', err);
	}else{
		console.log('Connected to MongoDB - pick your word');
	}
})

module.exports = mongoose
