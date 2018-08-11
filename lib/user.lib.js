const UserModel= require('../models/userModel');
class UserLib {
    constructor() {
    };

    getUsers(mess) {
        return new Promise((resolve, reject) => {
            UserModel.find({messusername: mess},{password:0}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
}
module.exports = UserLib;