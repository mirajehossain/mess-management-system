let bcrypt = require('bcrypt');
let response = require('../helper/response');
let UserModel = require('../models/userModel');

const UserLib = require('../lib/user.lib');
const saltRounds = 10;

class UserController extends UserLib{
    constructor(){
        super();
    };

    addUser(req,res){
        let user = req.body;
        bcrypt.hash(user.password,saltRounds,(err,hashed)=>{
            if(err){
                return res.json(response.error(false,"An error occur hash password",err))
            } else {
                user.password = hashed;
                user.role = 'user'; ///admin , user
                user.messusername = req.auth.messusername;

                let emailobj = {
                    email: user.email
                };
                UserModel.findOne(emailobj,(err,found)=>{
                    if(found !== null){
                        return res.json(response.error(false,"Email already exist","Email already exist"));
                    } else {
                        UserModel.create(user, (err,result)=>{
                            if(err){
                                return res.json(response.error(false,"An error occur",err.message))
                            } else {
                                return res.json(response.single(true, "New User Created", result));
                            }
                        })
                    }

                });

            }
        });

    };
    changePassword(req, res){
        let id = req.auth.id;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;

        UserModel.findOne({_id: id},(err,user)=>{
            if(err){
                return res.json(response.error(false,"An error occur",err))
            } else {

                  bcrypt.compare(oldPassword,user.password,(err,isMatched)=>{
                      if(isMatched){
                          bcrypt.hash(newPassword,saltRounds,(err,hashed)=> {
                              if (err) {
                                  return res.json(response.error(false,"An error occur",err))
                              } else {

                                  UserModel.update({_id: id},{ $set: { password: hashed}}, { new: true }, (err,data)=>{
                                      if(err){
                                          return res.json(response.error(false,'An error occur',err))
                                      } else {
                                          return res.json(response.single(true, 'Password changed successfully', data))
                                      }
                                  });
                              }
                          });


                      } else {
                          return res.json(response.error(false, 'Password does not matched',err))
                      }
                  });
            }
        });
    };

    updateProfile(req,res){
        const id = req.auth.id;
        let updateObject = req.body;
        UserModel.findByIdAndUpdate(id, updateObject,{new:true}, (err,data)=>{
            if(err){
                return res.json(response.error(false,'An error occur',err));
            } else {
                return res.json(response.single(true, 'Updated successfully', data));
            }
        })
    };
    getProfile(req,res){
        const id = req.auth.id;
        UserModel.findById(id, {password:0}, (err,data)=>{
            if(err){
                return res.json(response.error(false,'An error occur',err));
            } else {
                return res.json(response.single(true, `Welcome ${data.username}`, data));
            }
        })
    };

    getUsers(req,res){
        const mess = req.auth.messusername;
        super.getUsers(mess).then(users=>{
            return res.json(response.single(true, `Mess users `, users));
        }).catch(err=>{
            return res.json(response.error(false,"An error occur",err));
        })
    }

}

module.exports = UserController;