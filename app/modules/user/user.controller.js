const response = require('../../../helper/response');
const UserLib = require('./user.lib');

class UserController {
    static async addUser(req, res) {
        try {
            const user = req.body;
            user.messId = req.auth.messId;
            const userData = await UserLib.addUser(user);
            if (userData.success) {
                return res.status(201).json(response.single(true, 'New User Created', userData.data));
            }
            return res.status(200).json(response.error(false, userData.message));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async changePassword(req, res) {
        try {
            const { id } = req.auth;
            const { oldPassword } = req.body;
            const { newPassword } = req.body;
            const user = await UserLib.changPassword(id, oldPassword, newPassword);
            if (user.success) {
                return res.status(200).json(response.single(true, 'Password changed successfully', `${user.data}`));
            }
            return res.status(response.error(false, user.message));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async updateProfile(req, res) {
        try {
            const updateObject = req.body;
            const data = await UserLib.updateProfile(req.auth.id, updateObject);
            return res.status(200).json(response.single(true, 'Profile Update successfully', `${data}`));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async getProfile(req, res) {
        try {
            const { id } = req.auth;
            const data = await UserLib.getProfile(id);
            return res.status(200).json(response.single(true, `Welcome ${data.username}`, data));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async getUsers(req, res) {
        try {
            const { messId } = req.auth;
            const users = await UserLib.getUsers(messId);
            return res.status(200).json(response.single(true, 'Mess users ', users));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async removeUser(req, res) {
        try {
            const { userId } = req.params;
            await UserLib.removeUser(userId);
            return res.status(200).json(response.single(true, 'User removed successfully ', 'User removed successfully'));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }
}

module.exports = UserController;
