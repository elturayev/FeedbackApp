import ClientError from '../utils/error.js'


const GET = async (request, response, next) => {
	try {
		const { feedback_id } = request.params
		response.json(
			await request.models.Comment.findAll({ 
				where: feedback_id ? {feedback_id } : {},
				include: [
					{
						model:request.models.User,
						attributes:['user_id','name','username','user_profile_img','role']
					},
					{
						model:request.models.Feedback
					}],

				attributes:['comment_id','comment_text','createdAt'],
			})
		)

		return next()
	} catch(error) {
		return next(error)
	}
}


const POST = async (request, response, next) => {
	try {
		const { comment_text, feedback_id, user_id } = request.body

		const Comment = request.models.Comment

		const newComment = {
			comment_text,
			feedback_id,
			user_id
		}

		const data = await Comment.build(newComment)

		const res = await data.save()

		if(res.dataValues) {
			response.json({
				status: 201,
				message: 'Comment successfully added!',
				data: res.dataValues
			})
		} else throw new ClientError(400, 'Comment successfully added!')

		return next()
	} catch(error) {
		return next(error)
	}
}

export default {
	GET,
	POST
}