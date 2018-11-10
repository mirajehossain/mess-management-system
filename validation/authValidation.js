const MessModel = require('../models/messModel');
const UserModel = require('../models/userModel');

class AuthValidation {
	constructor(){};

	// 422 (Unprocessable Entity)
	signupValidation(req, res, next){

		console.log(req.body.username);
		if(req.body.username == null || 'undefined'){
			res.status(422).send({message:'User name can\'t be empty'});
		}
		if(req.body.email == null || 'undefined'){
			res.status(422).send({message:'Email can\'t be empty'});
		}
		if(req.body.password == null || 'undefined'){
			res.status(422).send({message:'Password name can\'t be empty'});
		}
		if(req.body.phone == null|| 'undefined'){
			res.status(422).send({message:'Phone no can\'t be empty'});
		}
		if(req.body.messusername == null|| 'undefined'){
			res.status(422).send({message:'Messusername name can\'t be empty'});
		}
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
}

module.exports = AuthValidation;