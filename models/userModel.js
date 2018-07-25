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
        type: String,
        unique: true
    },
    role: {
       type: Number /// 0 manager, 1 member
    }
});


module.exports = mongoose.model('user',userSchema);