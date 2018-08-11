let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let response = require('../helper/response');
let UserModel = require('../models/userModel');
let MessModel = require('../models/messModel');
let secretKey = require('../config/config').development.JWTsecret;
const saltRounds = 10;

class AuthController {
    constructor(){};
    login(req,res,next){
        let user = req.body;
        UserModel.findOne({email: user.email},(err, result)=>{
            if(err){
                return res.json(response.error(false,"An error occur",err))
            } else {
                console.log(result);
                if(result == null) {
                    return res.json(response.error(false, "User Not found", "User does not found"));
                } else {
                    bcrypt.compare(user.password,result.password,(err,matched)=>{
                        console.log("password matched - ", matched);
                        if(!matched){
                            return res.json(response.error(false, "Email or password not matched", "Email or password not matched"));
                        } else {
                            // return res.json(response.single(true,"User found",result));
                            req.user = result;
                            next();
                        }
                    })
                }
            }
        })
    };
    signup(req,res){
        let user = req.body;
        bcrypt.hash(user.password,saltRounds,(err,hashed)=>{
            if(err){
                return res.json(response.error(false,"An error occur hash password",err))
            } else {
                user.password = hashed;
                // user.role = 0;/// 0 manager , 1 member
                user.role = 'admin'; ///admin , user
                let mes = {
                    messusername: req.body.messusername
                };

                MessModel.findOne(mes,(err,found)=>{
                    if(err){
                        return res.json(response.error(false,"an error occur",err.message));
                    } else {
                        console.log(found);
                        if(found !== null){
                            return res.json(response.error(false,"Mess name already exist","Mess name already exist"));
                        } else {
                            let emailobj = {
                                email: user.email
                            }
                            UserModel.findOne(emailobj,(err,found)=>{
                                if(found !== null){
                                    return res.json(response.error(false,"Email already exist","Email already exist"));
                                } else {
                                    MessModel.create(mes,(err, done)=>{
                                        if(err){
                                            return res.json(response.error(false,"Mess name already exist",err.message));
                                        } else {
                                            console.log(done);
                                            // return res.json(response.single(true, "Mess name Created", done));
                                            UserModel.create(user, (err,result)=>{
                                                if(err){
                                                    return res.json(response.error(false,"Email is already",err.message))
                                                } else {
                                                    return res.json(response.single(true, "New User Created", result));
                                                }
                                            })

                                        }
                                    });
                                }
                            })
                        }


                    }
                });

            }
        });

    };

    prepareToken(req,res,next){
        if(!req.user){
            return res.json(response.error(false, 'Authentication Failed!','Authentication Failed!'));
        }

        req.auth = {
            id: req.user._id,
            username: req.user.username,
            messusername: req.user.messusername,
            email: req.user.email,
            role: req.user.role
        };
        next();
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
        res.json(response.single(true, 'Enjoy your token!', {token: req.tokenObject}));
    };

    isAuthenticate(req,res,next){
        const token = req.body.token || req.query.token || req.headers['x-auth-token'];
        if(token){
            jwt.verify(token, secretKey, (err,decoded)=>{
                if (err) {
                    return res.json(response.error(false,"Failed to authenticate token",err));
                } else {
                    req.auth = decoded;
                    console.log('token-',req.auth);
                    next();
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
            res.json(response.error(false, 'You are not admin or user',null))
        }
    }

    isAdmin(req,res,next){
        if(req.auth.role === 'admin'){
            next();
        } else {
            res.json(response.error(false, 'You are not admin',null))
        }
    }

}

module.exports = AuthController;