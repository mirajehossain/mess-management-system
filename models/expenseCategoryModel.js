const mongoose = require('mongoose');
const schema = mongoose.Schema;


const expenseCategorySchema = new schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    messId: {
        type: Number,
        unique: false,
        required: true
    }
});


module.exports = mongoose.model('expenseCategory',expenseCategorySchema);