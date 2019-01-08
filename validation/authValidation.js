const MessModel = require('../app/modules/mess/mess.model');
const UserModel = require('../app/modules/user/user.model');

class AuthValidation {
	constructor(){};

	// 422 (Unprocessable Entity)
	static signupValidation(req, res, next){
		if(req.body.username == null || req.body.username.length === 0)
			res.status(422).send({message:'User name can\'t be empty'});
		 else if(req.body.email == null || req.body.email.length === 0)
			res.status(422).send({message:'Email can\'t be empty'});
		else if(req.body.password == null || req.body.password.length === 0)
			res.status(422).send({message:'Password can\'t be empty'});
		else if(req.body.phone == null || req.body.phone.length === 0)
			res.status(422).send({message:'Phone no can\'t be empty'});
		else if(req.body.messusername == null || req.body.messusername.length === 0)
			res.status(422).send({message:'Messusername can\'t be empty'});
		 else
		next();
	};

	static addUserValidation(req, res, next){
		if(req.body.username == null || req.body.username.length === 0)
			res.status(422).send({message:'User name can\'t be empty'});
		 else if(req.body.email == null || req.body.email.length === 0)
			res.status(422).send({message:'Email can\'t be empty'});
		else if(req.body.password == null || req.body.password.length === 0)
			res.status(422).send({message:'Password can\'t be empty'});
		else if(req.body.phone == null || req.body.phone.length === 0)
			res.status(422).send({message:'Phone no can\'t be empty'});
		 else
		next();
	};

	// 422 (Unprocessable Entity)
	static loginValidation(req, res, next){

		if(req.body.email == null ||  req.body.email.length === 0)
			res.status(422).send({message:'Email can\'t be empty'});
		else if(req.body.password == null ||  req.body.password.length === 0)
			res.status(422).send({message:'Password can\'t be empty'});
		else
			next();
	};
	// 422 (Unprocessable Entity)
	/*static updateValidation(req, res, next){
		if(req.body.hasOwnProperty('email')){
			if(req.body.email == null ||  req.body.email.length === 0)
				res.status(422).send({message:'Email can\'t be empty'});

		} else if(req.body.hasOwnProperty('username')){
			if(req.body.username == null ||  req.body.username.length === 0)
				res.status(422).send({message:'username can\'t be empty'});

		} else if (req.body.hasOwnProperty('address')){
			if(req.body.address == null ||  req.body.address.length === 0)
				res.status(422).send({message:'address can\'t be empty'});

		} else if(req.body.hasOwnProperty('phone')){
			if(req.body.phone == null ||  req.body.phone.length === 0)
				res.status(422).send({message:'phone can\'t be empty'});

		} else  if(req.body.hasOwnProperty('password')){
			res.status(422).send({message:'Can\'t update password '});
		} else {
			next();
		}

	};*/
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