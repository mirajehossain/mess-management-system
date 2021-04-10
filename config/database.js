const mongoose = require('mongoose');

module.exports = function () {
    return mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, (error) => {
        if (error) {
            console.error('error.stack:-------', error);
        } else {
            console.log('mongoose connected');
        }
    });
};
