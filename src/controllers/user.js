import ClientError from '../utils/error.js'

const GET = async (request, response, next) => {
	try {
		response.json(
			await request.models.User.findAll({
				attributes: ['user_id','name','username','user_profile_img','role']
			})
		)

		return next()
	} catch(error){
		return next(error)
	}
}


const POST = async (request, response, next) => {
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
		} else throw new ClientError(400,'User not successfully registered!')
			
		return next()
	} catch(error) {
		return next(error)
	}
}

export default {
	GET,
	POST
}