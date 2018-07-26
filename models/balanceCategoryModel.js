const mongoose = require('mongoose');
const schema = mongoose.Schema;


const balanceCategorySchema = new schema({
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


module.exports = mongoose.model('balanceCategory',balanceCategorySchema);