const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserModel= require('../models/userModel');
class UserLib {
	constructor() {
	};

	async getProfile(id){
		try {
			const data = await UserModel.findById(id, {password:0});
			if(data != null)
				return data;
			else
				throw new Error(`No data found corresponding ID`);
		} catch (e) {
			return e;
		}
	};

	async updateProfile(id){
		try {
			return await UserModel.findByIdAndUpdate(id, updateObject,{new:true});
		} catch (e) {
			return e;
		}
	};

	async changPassword(id, oldPassword, newPassword){
		try {
			const user = await UserModel.findOne({_id: id});
			if(user != null){
				const isMatched = await bcrypt.compare(oldPassword,user.password);
				if(isMatched){
					const hashed = bcrypt.hashSync(newPassword, saltRounds);
					return await UserModel.update({_id: id},{ $set: { password: hashed}}, { new: true });
				} else {
					throw new Error(`Password not matched`);
				}
			} else {
				throw new Error(`User not found corresponding ID`);
			}

		} catch (e) {
			return e;
		}
	};

	async getUsers(messId) {
		try {
			const users = await UserModel.find({messId: messId},{password:0});
			if(users.length){
				return users;
			} else {
				throw new Error(`No User found`);
			}
		} catch (e) {
			return e;
		}
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