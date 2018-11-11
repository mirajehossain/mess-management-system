const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserModel= require('../models/userModel');
class UserLib {
    constructor() {
    };

    getProfile(id){
        return new Promise((resolve, reject)=>{
            UserModel.findById(id, {password:0}, (err,data)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    };

    updateProfile(id){
        return new Promise((resolve, reject)=>{
            UserModel.findByIdAndUpdate(id, updateObject,{new:true}, (err,data)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    };

    changPassword(id, oldPassword, newPassword){
        return new Promise((resolve, reject) => {
            UserModel.findOne({_id: id},(err,user)=>{
                if(err){
                    reject(err);
                } else {

                    bcrypt.compare(oldPassword,user.password,(err,isMatched)=>{
                        if(isMatched){
                            bcrypt.hash(newPassword,saltRounds,(err,hashed)=> {
                                if (err) {
                                    reject(err);
                                } else {
                                    UserModel.update({_id: id},{ $set: { password: hashed}}, { new: true }, (err,data)=>{
                                        if(err){
                                            reject(err);
                                        } else {
                                            resolve(data);
                                        }
                                    });
                                }
                            });

                        } else {
                            reject(err);
                        }
                    });
                }
            });
        })
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
    };

    async addUser(user){
        try {
            user.password = await bcrypt.hashSync(user.password, saltRounds);
            user.role = 'user'; /// admin, user
			let emailobj = {
				email: user.email
			};

			const found = await UserModel.findOne(emailobj);
			if(found != null){
			    throw new Error('Email already exist');
            } else {
				return await UserModel.create(user);
            }

		} catch (e) {
            return e;
		}


    };

    userSummary(userId){
        // TODO
    }
}
module.exports = UserLib;