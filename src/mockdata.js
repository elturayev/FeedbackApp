export default async function (sequelize) {

	const users = await sequelize.models.User.build([
		{ 
			name: 'Dilshod',
		  	username: '@dilshod', 
		  	password: '1111',
		  	user_profile_img: 'rasm.jpg'
		},
		{ 
			name: 'Dostonbek',
		  	username: '@dosya', 
		  	password: '020330',
		  	user_profile_img: 'rasm1.jpg'
		},
		{ 
			name: 'Bahodir',
		  	username: '@bahodir', 
		  	password: '7777',
		  	user_profile_img: 'rasm3.jpg'
		}
	])
	
	const feedbacks = await sequelize.models.Feedback.build([
		{
			feedback_title: 'Pointer fixed',
			feedback_description: 'Goods',
			feedback_category: 'UX',
			feedback_like: 3
		},
		{
			feedback_title: 'Header fixed',
			feedback_description: 'bad',
			feedback_category: 'Bug',
			feedback_status: 'In Progress'

		}
	])
	
	const comments = await sequelize.models.Comment.build([
		{ comment_text: 'Best Project',feedback_id: 1,user_id:2 },
		{ comment_text: 'Bad Project',feedback_id: 2,user_id:1 }

	])

	await Promise.all(users.map(async user => await user.save()))
	await Promise.all(feedbacks.map(async feedback => await feedback.save()))
	await Promise.all(comments.map(async comment => await comment.save()))
}