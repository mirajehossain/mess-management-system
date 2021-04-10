const mongoose = require('mongoose');

const { Schema } = mongoose;


const balanceSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true,
    },
    categoryId: {
        type: Schema.ObjectId,
        required: true,
    },
    messId: {
        type: Schema.ObjectId,
        required: true,
    },
    amount: {
        type: Number,
        defaultValue: 0,
        required: true,
    },
    date: {
        type: Date,
        defaultValue: new Date().toISOString(),
        required: true,
    },
}, { versionKey: false }, { timestamps: true});


module.exports = mongoose.model('balance', balanceSchema);
