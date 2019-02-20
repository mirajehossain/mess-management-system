const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../../../helper/response');
const UserModel = require('../user/user.model');
const MessModel= require('../mess/mess.model');
const AuthValidation = require('./auth.validation');
const authValidation = new AuthValidation();
const secretKey = require('../../../config/config').development.JWTsecret;
const saltRounds = 10;

class AuthController {
	constructor(){};
	async login(req,res,next){
		try {
			const user = req.body;
			const result = await authValidation.checkUser({email:user.email});
			if(result.success) {
				const matched = await bcrypt.compare(user.password, result.data.password);
				if (matched) {
					req.user = result.data;
					next();
				}
				return res.status(200).json(response.error(false, "Incorrect email or password", "Incorrect email or password "));
			}
			return res.status(200).json(response.error(false, result.message))
		} catch (e) {
			return res.status(500).json(response.error(false, `An error occur`,`${e}`));
		}
	};
	async signup(req,res){
		try {
			const user = req.body;
			const messusername = user.messusername;
			user.password = bcrypt.hashSync(user.password, saltRounds);
			// user.role = 0;/// 0 manager , 1 member
			user.role = 'admin'; ///admin , user
			const isEmail = await authValidation.checkEmailExistOrNot({email: user.email});
			const isMess = await authValidation.checkMessExistOrNot({messusername});
			if(isEmail.success){
				if(isMess.success){
					const mess = await MessModel.create({messusername});
					user.messId = mess._id;
					delete user.messusername;
					const newUser = await UserModel.create(user);
					return res.status(201).json(response.single(true, "New User Created", newUser));
				}
				return res.status(200).json(response.error(false, isMess.message,isMess.message))
			}
			return res.status(200).json(response.error(false, isEmail.message,isEmail.message))

		} catch (e) {
			return res.status(500).json(response.error(false,`An error occur`,`${e}`))
		}
	};

	prepareToken(req,res,next){
		if(!req.user){
			return res.json(response.error(false, 'Authentication Failed!','Authentication Failed!'));
		}
		MessModel.findById(req.user.messId).then(mess=>{
			req.auth = {
				id: req.user._id,
				username: req.user.username,
				messusername: mess.messusername,
				messId: mess._id,
				email: req.user.email,
				role: req.user.role
			};
			next();
		});
	};

	generateToken(req,res,next){
		req.tokenObject = {};
		req.tokenObject.token = jwt.sign(req.auth, secretKey, {
			expiresIn: "30 days"
		});
		next()
	}

	sendToken(req,res){
		res.setHeader('x-auth-token',req.tokenObject.token);
		res.json(response.single(true, 'Enjoy your token!', {token: req.tokenObject.token}));
	};

	 async isAuthenticate(req,res,next){
		const token = req.body.token || req.query.token || req.headers['x-auth-token'];
		if(token){
			req.auth = jwt.verify(token, secretKey);
			console.log('token-',req.auth);
			const user = await UserModel.findOne({
				$and: [ {_id: req.auth.id},{messId: req.auth.messId}]
			});
			user? next() : res.status(401).json(response.error(false, 'Failed to authenticate user'));
		}
		return res.json(response.error(false,"You are not authenticate", null))
	}

	isUser(req,res,next){
		if(req.auth.role === 'user' || 'admin'){
			next();
		} else {
			///401 Unauthorized
			res.status(401).json(response.error(false, 'You are not admin or user',null))
		}
	}

	isAdmin(req,res,next){
		if(req.auth.role === 'admin'){
			next();
		} else {
			///401 Unauthorized
			res.status(401).json(response.error(false, 'You are not admin',null))
		}
	}

}

module.exports = AuthController;