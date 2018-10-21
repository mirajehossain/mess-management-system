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
        defaultValue: new Date().toLocaleDateString(),
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    expenseCategoryId: {
        type: schema.ObjectId,
        required: true
    },
    userId: {
        type: schema.ObjectId,
        required: true
    },
    messName: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('expense',expenseSchema);