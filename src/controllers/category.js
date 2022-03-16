const GET = async (request, response) => {
	try {
		response.json(
			await request.models.Category.findAll()
		)
	} catch(error) {
		console.log(error)
	}
}

export default {
	GET
}