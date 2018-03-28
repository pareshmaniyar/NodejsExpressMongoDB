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
		console.log('Dish 1 saved: ',dish);
		Dishes.create({
			name: 'Paresh7', description: 'Maniyar7'
		})
		.then( (dish2) => {
		console.log('Dish 2 saved: ',dish2);
		return Dishes.find({}).exec();	//finds everthing, exec() ensures execution
		})
		.then( (dishes) => {
			console.log('found dishes',dishes);
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