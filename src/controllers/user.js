const GET = async (request, response) => {
	try {
		response.json(
			await request.models.User.findAll({
				attributes: ['user_id','name','username','user_profile_img','role']
			})
		)
	} catch(error){
		console.log(error)
	}
}


const POST = (request, response) => {
	try {
		console.log(request.files)
		console.log(request.body)

	} catch(error) {
		console.log(error)
	}
}

export default {
	GET,
	POST
}