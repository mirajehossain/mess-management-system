const mongoose = require('mongoose');
const schema = mongoose.Schema;


const messSchema = new schema({
    userId: {
      type: schema.ObjectId,
      required: true
    },
    messName: {
        type: String,
        required: true
    },
    numberOfMeal: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }

});


module.exports = mongoose.model('meal',messSchema);