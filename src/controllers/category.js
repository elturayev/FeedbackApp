import ClientError from '../utils/error.js'

const GET = async (request, response, next) => {
	try {
		response.json(
			await request.models.Category.findAll()
		)

		return next()
	} catch(error) {
		return next(error)
	}
}

export default {
	GET
}