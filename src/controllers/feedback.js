import ClientError from '../utils/error.js'
import { QueryTypes } from '@sequelize/core'
import { Op } from '@sequelize/core'

const GET = async (request, response, next) => {
	try {
		const { 
			Feature = '',
			UX = '',
			Backend = '',
			Enhancement = '',
			UI = '',
			Frontend = '',
			Bug = '' ,
		} = request.query
		response.json(
			await request.sequelize.query(`
				SELECT 
					f.*,
					c.category_name,
					count(com.comment_id) as comment_count
				FROM feedbacks as f
				LEFT JOIN categories as c on c.category_id = f.category_id
				LEFT JOIN comments as com on com.feedback_id = f.feedback_id
				WHERE
				CASE
					WHEN length($Feature) > 0 THEN c.category_name = $Feature
					ELSE true
				END AND
				CASE
					WHEN length($UX) > 0 THEN c.category_name = $UX
					ELSE true
				END AND
				CASE
					WHEN length($Backend) > 0 THEN c.category_name = $Backend
					ELSE true
				END AND
				CASE
					WHEN length($Enhancement) > 0 THEN c.category_name = $Enhancement
					ELSE true
				END AND
				CASE
					WHEN length($UI) > 0 THEN c.category_name = $UI
					ELSE true
				END AND
				CASE
					WHEN length($Frontend) > 0 THEN c.category_name = $Frontend
					ELSE true
				END AND
				CASE
					WHEN length($Bug) > 0 THEN c.category_name = $Bug
					ELSE true
				END 
				GROUP BY f.feedback_id, c.category_name
				;
			`, { type: QueryTypes.SELECT,
				bind: { Feature,
						UX,
						Backend,
						Enhancement,
						UI,
						Frontend,
						Bug ,
					} })
		)

		return next()
	} catch(error) {
		return next(error)
	}
}

const POST =  async (request, response, next) => {
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

		return next()
	} catch(error) {
		return next(error)
	}
}


const PUT = async (request, response, next) => {
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
			} else throw new ClientError(400, 'Feedback not successfully updated!') 
			
		}

		return next()
	} catch(error) {
		return next(error)
	}
}

const DELETE = async (request, response, next) => {
	try {

		const { feedback_title, feedback_status, category_id } = request.body

		const Feedback = request.models.Feedback

		const data = await Feedback.destroy({
			where: {
				feedback_title: { [Op.iLike]: ('%' + feedback_title + '%') },
				feedback_status: { [Op.eq]: feedback_status },
				category_id: { [Op.eq]: category_id }
			}
		})

		if(data){
			response.json({
				status: 200,
				message: 'Feedback successfully deleted!'
			})
		}

		return next()
	} catch(error) {
		return next(error)
	}
}

export default {
	GET,
	POST,
	PUT,
	DELETE
}