const mongoose = require('mongoose');
const schema = mongoose.Schema;


const expenseSchema = new schema({
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
    summary: {
        type: String,
        required: false
    },
    expenseCategoryId: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        unique: false,
        required: true
    },
    messId: {
        type: Number,
        unique: false,
        required: true
    }
});


module.exports = mongoose.model('expense',expenseSchema);