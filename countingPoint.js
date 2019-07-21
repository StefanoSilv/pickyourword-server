answer = () => {
	//must return true if the user gave an answer
}
timeOut = () => {
	//must return true if time did not expired, otherwise false
}

let streak = 0
let points_added = 0


if (answerfromtheapi && answefromtheapi.length){ //Does an answer exist?
	if(answer && answer.length && timeOut){
		answerfromtheapi[0].forEach( (correct) => {
			if(answer.toLowerCase() === correct.word){ //if the answer of the user match with the one from the api
				streak ++
				points_added = (2^streak)
			}else{
				if (streak < 10){
					points_added = - (10 - streak)
					streak = 0
				}else{
					point_added = -1
					streak = 0
				}
			}
		}) //Did the user send an answer and on time?
	}else{
		streak = 0
		points_added = -1
	}
}else{
	//Next question
}

let token = req.headers.authorization.split(' ')[1]
jwt.verify(token, process.env.SECRET, (err, decoded) => {
	if (decoded) {
		let newPoints = decode.points + points_added
		if(newPoints < 0){
			newPoints = 0
		}
		db_user.findByIdAndUpdate(decoded._id, {points: newPoints}, {new: true}).then( (user) => {
			res.send(user.points) //Vedere come è user
		}).catch((err) => {
			res.send(err)
		})
	}
})
