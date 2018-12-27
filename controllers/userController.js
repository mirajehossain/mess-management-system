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
			const data = await super.updateProfile(req.auth.id,updateObject);
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
			const messId = req.auth.messId;
			const users = await super.getUsers(messId);
			if(users.length)
				return res.status(200).json(response.single(true, `Mess users `, users));
			else
				return res.status(400).json(response.error(false,"An error occur",`${users}`));
		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
    };
    async removeUser (req,res){
        try {
			const userId = req.params.userId;
			await super.removeUser(userId);
				return res.status(200).json(response.single(true, `User removed successfully `, `User removed successfully`));
		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
    };



     async userSummary(req,res) {
        try {
			let userId = req.params.userId;
			let messId = req.auth.messId;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = new Date(y, m, 1).toISOString();
			const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();
			const summary = await super.userSummary(currentMonthFirstDate, currentMonthLastDate, userId, messId);
				return res.status(200).json(response.single(true, `User Summary `, summary));
		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
    };
	async messSummary(req,res){
		try {
			let firstDate = req.body.firstDate;
			let lastDate = req.body.lastDate;
			const messId = req.auth.messId;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = firstDate || new Date(y, m, 1).toISOString();
			const currentMonthLastDate = lastDate || new Date(y, m + 1, 0).toISOString();
			const summary = await super.messSummary(currentMonthFirstDate, currentMonthLastDate, messId);
			return res.status(200).json(response.single(true, `Mess Summary `, summary));

		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
    };

}

module.exports = UserController;