import { dbConnection, sequelize } from './utils/pg.js'
import mockDataFunction from './mockdata.js'
import express from 'express'
import fileUpload from 'express-fileupload'
const PORT = process.env.PORT || 5000


import userRouter from './routers/user.js'
import feedbackRouter from './routers/feedback.js'
import commentRouter from './routers/comment.js'

!async function () {
	await dbConnection()
	await mockDataFunction(sequelize)

	const app = express()

	app.use(express.json())
	app.use(fileUpload())
	
	await app.use((req, res, next) => {
		req.models = sequelize.models
		return next()
	})

	app.use('/users', userRouter)
	app.use('/feedbacks', feedbackRouter)
	app.use('/comments', commentRouter)


	app.listen(PORT, () => console.log('server is running on http://localhost:' + PORT))
}()