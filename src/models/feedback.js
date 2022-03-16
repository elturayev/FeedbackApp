import { Model, DataTypes } from 'sequelize'

export default function (sequelize) {
	class Feedback extends Model{}

	Feedback.init({

		feedback_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},

		feedback_title: {
			type: DataTypes.STRING(255),
			allowNull: false
		},

		feedback_description: {
			type: DataTypes.STRING,
			allowNull: false
		},

		feedback_status: {
			type: DataTypes.STRING(50),
			defaultValue: 'Planned'
		},

		feedback_like: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, { sequelize, tableName: 'feedbacks' })

	sequelize.models.Feedback.belongsTo(sequelize.models.Category, {
		foreignKey: 'category_id'
	})

	return Feedback;
}