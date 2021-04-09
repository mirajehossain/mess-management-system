const mongoose = require('mongoose');

const schema = mongoose.Schema;


const messSchema = new schema({
    messusername: {
        type: String,
        unique: true,
    },
});


module.exports = mongoose.model('mess', messSchema);
