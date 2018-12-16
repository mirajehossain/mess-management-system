const config = require('./config');
const mongoose = require('mongoose');

module.exports = function () {
    return mongoose.connect(config.development.database.db,{useNewUrlParser:true},(error)=>{
        if(error){
            console.error(error);
        } else {
            console.log("mongoose connected");
        }
    })
};