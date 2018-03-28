const mongoose = require('mongoose');
const Schema = mongoose.Schema;//1 load
var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const dishSchema = new Schema({ //2 define a model
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	comments: [commentSchema]
},{
	timestamps: true  //3 take care of this, it has created and updated
});
var Dishes = mongoose.model('Dish',dishSchema); //4 construct a model, 'Dish' becomes 'Dishes'
module.exports = Dishes;