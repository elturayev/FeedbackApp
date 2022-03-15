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


const POST = async (request, response) => {
	try {
		if(!request.files) return;

		const User = await request.models.User

		const { file } = request.files
		const { name, username, password } = request.body

		const user_profile_img = file.name.replace(/\s/g, '')

		const newUser = {
			name,
			username,
			password,
			user_profile_img
		}

		const user = User.build(newUser)

		const res = await user.save()
		if(res.dataValues){
			delete res.dataValues.password
			response.json({
				status: 201,
				message: 'User successfully registered!',
				data: res.dataValues
			})
		} else {
			response.json({
				status: 400,
				message: 'User not successfully registered!',
				data: null
			})
		}

	} catch(error) {
		console.log(error)
	}
}

export default {
	GET,
	POST
}