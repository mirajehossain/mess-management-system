let response = require('../helper/response');
const UserLib = require('../lib/user.lib');

class UserController extends UserLib{
    constructor(){
        super();
    };

    addUser(req,res){
        let user = req.body;
        super.addUser(user, req.auth.messusername).then(data=>{
            return res.json(response.single(true, `New User Created`, data));
        }).catch(err=>{
            return res.json(response.error(false,"An error occur",err));
        });
    };
    changePassword(req, res){
        let id = req.auth.id;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;
        super.changPassword(id,oldPassword,newPassword).then(data=>{
            return res.json(response.single(true, `Password changed successfully`, data));
        }).catch(err=>{
            return res.json(response.error(false,"An error occur",err));
        });
    };

    updateProfile(req,res){
        const id = req.auth.id;
        let updateObject = req.body;
        super.updateProfile(updateObject).then(data=>{
            return res.json(response.single(true, `Profile Update successfully`, data));
        }).catch(err=>{
            return res.json(response.error(false,"An error occur",err));
        });
    };
    getProfile(req,res){
        const id = req.auth.id;
        super.getProfile(id).then(data=>{
            return res.json(response.single(true, `Welcome ${data.username}`, data));
        }).catch(err=>{
            return res.json(response.error(false,"An error occur",err));
        });
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