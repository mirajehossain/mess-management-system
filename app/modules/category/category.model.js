const mongoose = require('mongoose');
const schema = mongoose.Schema;


const categorySchema = new schema({
	name: {
		type: String,
		unique: false,
		required: true
	},
	messId: {
		type: schema.ObjectId,
		unique: false,
		required: true
	},
	isMeal: {
		type: Number,
		required: true,
		defaultValue: 0
	},

});


module.exports = mongoose.model('category',categorySchema);