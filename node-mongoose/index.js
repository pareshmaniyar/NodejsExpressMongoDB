const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
connect.then((db) => {
	console.log("Connected successfully to the server");
	var newDish = Dishes({ name: 'Paresh123456',	description: 'Maniyar123456'	});//create model
	newDish.save()						//save model
	.then((dish) => {
		console.log('Dish saved: ',dish);
		var secDish = Dishes({name: 'Paresh7', description: 'Maniyar7'});
		secDish.save()
		.then((dish) => {
			console.log('Dish saved: ',dish);
			return Dishes.find({}).exec();	//finds everthing, exec() ensures execution
		})
		.then((dishes) => {
		console.log('found dishes',dishes);
		return mongoose.connection.db.collection('dishes').drop();
		})
		.then(() => {
			console.log('dropped dishes');
			return mongoose.connection.close();
		})
		.catch((err) => {
			console.log(err);
		});
	});
});