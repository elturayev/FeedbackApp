import { Model, DataTypes } from 'sequelize'

export default function (sequelize){
	class Category extends Model{}

	Category.init({

		category_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},

		category_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		}

	}, { sequelize, tableName: 'categories' })

	return Category;
}