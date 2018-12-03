let response = require('../helper/response');
const UserLib = require('../lib/user.lib');

class UserController extends UserLib{
    constructor(){
        super();
    };

   async addUser(req,res){
       try {
		   let user = req.body;
		   user.messId = req.auth.messId;
		   const data = await super.addUser(user);
		   if(data instanceof Error){
			   return res.status(409).json(response.error(false,`${data}`,`${data}`));
		   } else {
			   return res.status(201).json(response.single(true, `New User Created`, data));
		   }
	   } catch (e) {
		   return res.status(409).json(response.error(false,"An error occur",`${e}`));
	   }
    };

    async changePassword(req, res){
        try {
			const id = req.auth.id;
			const oldPassword = req.body.oldPassword;
			const newPassword = req.body.newPassword;
			const data = await super.changPassword(id,oldPassword,newPassword);
			if(data instanceof Error){
				return res.status(400).json(response.error(false,`${data}`,`${data}`));
			} else {
				return res.status(200).json(response.single(true, `Password changed successfully`,`${data}`));
			}
        } catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
    };

    async updateProfile(req,res){
        try {
			const updateObject = req.body;
			const data = await super.updateProfile(updateObject);
			if( data instanceof Error){
				return res.status(400).json(response.error(false,`${data}`,`${data}`));
			} else {
				return res.status(200).json(response.single(true, `Profile Update successfully`, `${data}`));
			}
		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));

		}
    };

    async getProfile(req,res){
        try {
			const id = req.auth.id;
			const data = await super.getProfile(id);
			if(data instanceof Error){
				return res.status(400).json(response.error(false,"An error occur",`${data}`));
			} else {
				return res.status(200).json(response.single(true, `Welcome ${data.username}`, data));
			}
		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
    };

    async getUsers(req,res){
        try {
			const mess = req.auth.messusername;
			const users = await super.getUsers(mess);
			if(users.length !== 0)
				return res.status(200).json(response.single(true, `Mess users `, users));
			else
				return res.status(400).json(response.error(false,"An error occur",`${users}`));
		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
    };

    userSummary(req,res){
        let userId = req.params.userId;
        super.userSummary(userId).then(summary=>{
            return res.status(200).json(response.single(true, `User Summary `, summary));
        }).catch(err=>{
            return res.status(400).json(response.error(false,"An error occur",`${err}`));
        })
    };

}

module.exports = UserController;