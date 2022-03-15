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

export default {
	GET
}