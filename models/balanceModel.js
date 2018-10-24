const mongoose = require('mongoose');
const schema = mongoose.Schema;


const balanceSchema = new schema({
    userId: {
        type: schema.ObjectId,
        required: true
    },
    categoryId: {
        type: schema.ObjectId,
        required: true
    },
    messName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        defaultValue: 0,
        required: true
    },
    date: {
        type: Date,
        defaultValue: new Date().toISOString(),
        required: true
    }
});


module.exports = mongoose.model('balance',balanceSchema);