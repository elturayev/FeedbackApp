import { QueryTypes } from '@sequelize/core'

const GET = async (request, response) => {
	try {
		response.json(
			await request.models.Feedback.findAll({ 
				include: [
				{
					model: request.models.Category
				}, 
				{
					model: request.models.Comment
				}]
			 })
		)
	} catch(error) {
		console.log(error)
	}
}

const POST =  async (request, response) => {
	try {
		const { feedback_title, category_id, feedback_description } = request.body
		
		const Feedback = await request.models.Feedback

		const newFeedback = {
			feedback_title,
			feedback_description,
			category_id
		}

		const feedBack = Feedback.build(newFeedback)
		const res = await feedBack.save()
		if(res.dataValues){
			response.json({
				status: 201,
				message: 'Feedback successfully added!',
				data: res.dataValues
			})
		}

	} catch(error) {
		console.log(error)
	}
}


const PUT = async (request, response) => {
	try {

		const { 
			feedback_id,
			feedback_title,
			category_id, 
			feedback_description,
			feedback_status,
			feedback_like
		} = request.body

		const Feedback = request.models.Feedback

		let feedback = await Feedback.findOne({
			where: {
				feedback_id
			}
		})

		if(feedback.dataValues) {
			const data  = feedback.dataValues
			const updateFeedback = {
				feedback_title : feedback_title || data.feedback_title,
				category_id: category_id || data.category_id,
				feedback_description: feedback_description || data.feedback_description,
				feedback_status: feedback_status || data.feedback_status,
				feedback_like: feedback_like || data.feedback_like
			}

			const updated = await Feedback.update(updateFeedback,{
				where:{
					feedback_id
				}
			})

			if(updated.length > 0) {
				response.json({
					status: 200,
					message: 'Feedback successfully updated!'
				})
			} else {
				response.json({
					status: 400,
					message: 'Feedback not successfully updated!'
				})
			}
		}
		

	} catch(error) {
		console.log(error)
	}
}


export default {
	GET,
	POST,
	PUT
}