import { Model, DataTypes } from 'sequelize'

export default function (sequelize){
	class User extends Model{}

	User.init({

		user_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},

		name: {
			type: DataTypes.STRING(60),
			allowNull: false
		},

		username: {
			type: DataTypes.STRING(60),
			allowNull: false
		},

		password: {
			type: DataTypes.STRING(16),
			allowNull: false
		},

		user_profile_img: {
			type: DataTypes.STRING(255),
			allowNull: false
		},

		role: {
			type: DataTypes.STRING(15),
			defaultValue: 'developer'
		}

	}, { sequelize, tableName: 'users' })

	return User;
}