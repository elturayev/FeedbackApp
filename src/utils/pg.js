import { Sequelize } from 'sequelize'
import models from '../models/index.js' 

const sequelize = new Sequelize({
	username: 'postgres',
	database: 'feedback_db',
	password: '1111',
	dialect: 'postgres',
	logging: false
})


async function dbConnection (){
	// connect to database
	try {
 		await sequelize.authenticate()
  		console.log('Connection has been established successfully.')
	} catch (error) {
  		console.error('Unable to connect to the database:', error)
	}

	// load models
	models.map(async model => {
		await model(sequelize)
	})

	// create or delete tables
	await sequelize.sync({ force: true })
}


export {
	dbConnection,
	sequelize
};