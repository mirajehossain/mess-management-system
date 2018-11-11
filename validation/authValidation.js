const MessModel = require('../models/messModel');
const UserModel = require('../models/userModel');

class AuthValidation {
	constructor(){};

	// 422 (Unprocessable Entity)
	static signupValidation(req, res, next){

		console.log(typeof req.body.username );
		if(req.body.username == null)
			res.status(422).send({message:'User name can\'t be empty'});
		 else if(req.body.email == null)
			res.status(422).send({message:'Email can\'t be empty'});
		else if(req.body.password == null)
			res.status(422).send({message:'Password can\'t be empty'});
		else if(req.body.phone == null)
			res.status(422).send({message:'Phone no can\'t be empty'});
		else if(req.body.messusername == null)
			res.status(422).send({message:'Messusername can\'t be empty'});
		 else
		next();
	};

	// 422 (Unprocessable Entity)
	static loginValidation(req, res, next){

		if(req.body.email == null)
			res.status(422).send({message:'Email can\'t be empty'});
		else if(req.body.password == null)
			res.status(422).send({message:'Password can\'t be empty'});
		else
			next();
	};
	// status(409)
	async checkMessExistOrNot(mess){
		let response;
		try {
			response = await MessModel.findOne(mess);
			if(response !== null){
				return new Error(`${mess.messusername} is exist, please try another name`);
			} else {
				return true;
			}
		} catch (e) {
			return e;
		}
	};

	// status(409)
	async checkEmailExistOrNot(email){
		let response;
		try {
			response = await UserModel.findOne(email);
			if(response !== null){
				 throw new Error(`${email.email} is exist, please try another email`);
			} else {
				return true;
			}
		} catch (e) {
			return e;
		}
	}

	// status(40!)
	async checkUser(email){
		let response;
		try {
			response = await UserModel.findOne(email);
			if(response === null){
				 throw new Error(`${email.email} is not exist, please signup or try valid registered email`);
			} else {
				return response;
			}
		} catch (e) {
			return e;
		}
	}
}

module.exports = AuthValidation;