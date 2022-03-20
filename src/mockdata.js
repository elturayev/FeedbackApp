export default async function (sequelize) {


	const categories = await sequelize.models.Category.build([
		{
			category_name: 'Feature'
		},

		{
			category_name: 'UX'
		},

		{
			category_name: 'Backend'
		},

		{
			category_name: 'Enhancement'
		},

		{
			category_name: 'UI'
		},

		{
			category_name: 'Frontend'
		},

		{
			category_name: 'Bug'
		}

	])

	const users = await sequelize.models.User.build([
		{ 
			name: 'Dilshod',
		  	username: '@dilshod', 
		  	password: '1111',
		  	user_profile_img: 'love.jpg'
		},
		{ 
			name: 'Dostonbek',
		  	username: '@dosya', 
		  	password: '020330',
		  	user_profile_img: 'nature.jpg'
		},
		{ 
			name: 'Bahodir',
		  	username: '@bahodir', 
		  	password: '7777',
		  	user_profile_img: 'metting.jpg'
		}
	])
	
	const feedbacks = await sequelize.models.Feedback.build([
		{
			feedback_title: 'Pointer fixed',
			feedback_description: 'Goods',
			feedback_like: 3,
			category_id: 1,
		},
		{
			feedback_title: 'Header fixed',
			feedback_description: 'bad',
			feedback_status: 2,
			category_id: 7

		}
	])
	
	const comments = await sequelize.models.Comment.build([
		{ comment_text: 'Best Project',feedback_id: 1,user_id:2 },
		{ comment_text: 'Bad Project',feedback_id: 2,user_id:1 }

	])

	await Promise.all(categories.map(async category => await category.save()))
	await Promise.all(users.map(async user => await user.save()))
	await Promise.all(feedbacks.map(async feedback => await feedback.save()))
	await Promise.all(comments.map(async comment => await comment.save()))
}