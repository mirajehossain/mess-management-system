const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../helper/response');
const UserModel = require('../models/userModel');
const MessModel = require('../models/messModel');
const AuthValidation = require('../validation/authValidation');
const authValidation = new AuthValidation();
const secretKey = require('../config/config').development.JWTsecret;
const saltRounds = 10;

class AuthController {
	constructor(){};
	async login(req,res,next){
		try {
			let user = req.body;
			const result = await authValidation.checkUser({email:user.email});

			if(result instanceof Error){
				return res.status(401).json(response.error(false, `${result}`,`${result}`));
			} else {
				bcrypt.compare(user.password,result.password,(err,matched)=>{
					if(!matched){
						return res.status(401).json(response.error(false, "Incorrect email or password", "Incorrect email or password "));
					} else {
						req.user = result;
						next();
					}
				})
			}
		} catch (e) {
			return res.status(401).json(response.error(false, `An error occur`,`${e}`));
		}
	};
	async signup(req,res){
		try {
			const user = req.body;
			const messusername = user.messusername;
			user.password = bcrypt.hashSync(user.password, saltRounds);
			// user.role = 0;/// 0 manager , 1 member
			user.role = 'admin'; ///admin , user
			const mes = {messusername};
			const email = user.email;
			const emailobj = {email};
			const isEmail = await authValidation.checkEmailExistOrNot(emailobj);
			const isMess = await authValidation.checkMessExistOrNot(mes);

			if(isEmail instanceof Error ){
				return res.status(409).json(response.error(false,`${isEmail} `,`${isEmail} `))
			} else {
				 if( isMess instanceof Error){
					 return res.status(409).json(response.error(false,`${isMess} `,`${isMess} `))
				 } else {
					 MessModel.create(mes).then((mess)=>{
					 	user.messId = mess._id;
					 	delete user.messusername;
						 UserModel.create(user).then(done=>{
							 return res.status(201).json(response.single(true, "New User Created", done));
						 })
					 }).catch(err=>{
						 return res.status(409).json(response.error(false,"Internal server Error",`${err}`))
					 });
				 }
			}

		} catch (e) {
			return res.status(500).json(response.error(false,`${e}`,`${e}`))
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

	isAuthenticate(req,res,next){
		const token = req.body.token || req.query.token || req.headers['x-auth-token'];
		if(token){
			jwt.verify(token, secretKey, (err,decoded)=>{
				if (err) {
					///401 Unauthorized
					res.status(401).json(response.error(false,"Failed to authenticate token",`${err}`));
				} else {
					req.auth = decoded;
					console.log('token-',req.auth);
					UserModel.findOne({
						$and: [ {_id: req.auth.id},{messusername: req.auth.messusername}]
					},(err,user)=>{
						if(err){
							///401 Unauthorized
							res.status(401).json(response.error(false, 'Failed to authenticate user',`${err}`));
						} else {
							user? next() : res.status(401).json(response.error(false, 'Failed to authenticate user',`${err}`));
						}
					});
				}
			})
		} else {
			return res.json(response.error(false,"You are not authenticate", null))
		}
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