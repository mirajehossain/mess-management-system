const mongoose = require('mongoose');
const schema = mongoose.Schema;


const balanceSchema = new schema({
    userId: {
        type: Number,
        unique: false,
        required: true
    },
    amount: {
        type: Number,
        defaultValue: 0,
        required: true
    },
    date: {
        type: Date,
        defaultValue: new Date(),
        required: true
    },
    balanceCategoryId: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('balance',balanceSchema);