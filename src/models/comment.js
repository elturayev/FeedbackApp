import { Model, DataTypes } from 'sequelize'

export default function (sequelize) {
	class Comment extends Model {}

	Comment.init({
		comment_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},

		comment_text: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'comments' })

	sequelize.models.Comment.belongsTo(sequelize.models.User, {
		foreignKey: 'user_id'
	})

	sequelize.models.Comment.belongsTo(sequelize.models.Feedback, {
		foreignKey: 'feedback_id'
	})

	return Comment;
}