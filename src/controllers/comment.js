const GET = async (request, response) => {
	try {
		response.json(
			await request.models.Comment.findAll({ 
				include: [
					{
						model:request.models.User,
						attributes:['user_id','name','username','user_profile_img','role']
					},
					{
						model:request.models.Feedback
					}],

				attributes:['comment_id','comment_text','createdAt'] })
		)
	} catch(error) {
		console.log(error)
	}
}


const POST = async (request, response) => {
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
		} else {
			response.json({
				status: 400,
				message: 'Comment successfully added!',
				data: res.dataValues
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