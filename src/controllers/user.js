import ClientError from '../utils/error.js'
import path from 'path'

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

		file.mv(path.join(process.cwd(), 'src', 'files', user_profile_img))

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

const PUT = async (request, response, next) => {
	try {

		const { user_id, name, username, password, role } = request.body
		
		const User = await request.models.User

		const user = await User.findOne({
			where: {
				user_id
			}
		})

		if(user.dataValues) {
			const data = user.dataValues
			const updateUser = {
				name : name || data.name,
				username: username || data.username,
				password: password || data.password,
				role: role || data.role
			}

			const updated = await User.update(updateUser, {
				where: {
					user_id
				}
			})

			if(updated.length > 0) {
				response.json({
					status: 200,
					message: 'User successfully updated!'
				})
			} else throw new ClientError(400, 'User not successfully updated!') 
			

		}

	} catch(error) {
		return next(error)
	}
}

export default {
	GET,
	POST,
	PUT
}