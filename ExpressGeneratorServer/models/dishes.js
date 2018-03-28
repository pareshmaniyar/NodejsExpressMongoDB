const mongoose = require('mongoose');
const Schema = mongoose.Schema;//1 load
require('mongoose-currency').loadType(mongoose); //for currency
var Currency = mongoose.Types.Currency;
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
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
	comments: [commentSchema]
},{
	timestamps: true  //3 take care of this, it has created and updated
});
var Dishes = mongoose.model('Dish',dishSchema); //4 construct a model, 'Dish' becomes 'Dishes'
module.exports = Dishes;