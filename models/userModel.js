const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({
   email: {
       type: String,
       unique: true
   },
    username: {
       type: String
    },
    password: {
       type: String
    },
    phone: {
       type: Number
    },
    address: {
        type: String,
        defaultValue: null
    },
    messusername: {
        type: String
    },
    role: {
       type: String /// admin,  user
    }
});


module.exports = mongoose.model('user',userSchema);