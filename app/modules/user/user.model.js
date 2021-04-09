const mongoose = require('mongoose');

const schema = mongoose.Schema;


const userSchema = new schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
    },
    messId: {
        type: schema.ObjectId,
        required: true,
    },
    role: {
        type: String, // / admin,  user
    },
});


module.exports = mongoose.model('user', userSchema);
