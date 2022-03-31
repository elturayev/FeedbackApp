import { Sequelize } from 'sequelize'
import models from '../models/index.js' 

const sequelize = new Sequelize('postgres://mlnskpux:37WUQzFF9jQ6d5mjUWGZx3Fb0upyGXYF@john.db.elephantsql.com/mlnskpux',{ logging: false })


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
	await sequelize.sync()
}


export {
	dbConnection,
	sequelize
};
