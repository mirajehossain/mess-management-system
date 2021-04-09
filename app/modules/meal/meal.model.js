const mongoose = require('mongoose');

const schema = mongoose.Schema;


const messSchema = new schema({
    userId: {
        type: schema.ObjectId,
        required: true,
    },
    messId: {
        type: schema.ObjectId,
        required: true,
    },
    numberOfMeal: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },

});


module.exports = mongoose.model('meal', messSchema);
