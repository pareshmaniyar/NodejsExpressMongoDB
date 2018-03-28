const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
connect.then( (db) => {
	console.log("Connected successfully to the server");
	Dishes.create({ name: 'Paresh1234567', description: 'Maniyar1234567'	//create model type 2
	})
	.then( (dish) => {
		console.log('Dish 1 saved: \n',dish);
		Dishes.create({
			name: 'Paresh7', description: 'Maniyar7'
		})
		.then( (dish2) => {
			console.log('Dish 2 saved: \n',dish2);
			return Dishes.findByIdAndUpdate(dish._id, {
				$set: { description: 'Maniyar7 Updated'}
			},{
				new: true// This second flag that we are supplying here, new: true, means that, once the update of the dish is complete, then this will return the updated dish back 
			})
			.exec();	//finds everthing, exec() ensures execution
		})
		.then((dish) => {
			console.log('Updated successfully: \n',dish);
			dish.comments.push({
				rating: 5,
				comment: 'I can comment, but chill..Wont judge',
				author: 'Jack of All Trade and of Titanic'
			});
			return dish.save();
		})
		.then( (dish) => {
			console.log('Updated comments in this dish: \n',dish);
			return Dishes.find({}).exec();
		})
		.then((dishes) => {
			console.log("Full dishes list: \n", dishes);
			return mongoose.connection.db.collection('dishes').drop();
		})
		.then( () => {
			console.log('dropped dishes');
			return mongoose.connection.close();
		})
		.catch((err) => {
			console.log(err);
		});
	})
	.catch((err) => {
			console.log(err);
	});
});