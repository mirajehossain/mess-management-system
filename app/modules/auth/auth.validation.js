const MessModel = require('../mess/mess.model');
const UserModel = require('../user/user.model');

module.exports = class AuthValidation {
    // 422 (Unprocessable Entity)
    static signupValidation(req, res, next) {
        if (req.body.username == null || req.body.username.length === 0) res.status(200).send({ success: false, message: 'User name can\'t be empty' });
        else if (req.body.email == null || req.body.email.length === 0) res.status(200).send({ success: false, message: 'Email can\'t be empty' });
        else if (req.body.password == null || req.body.password.length === 0) res.status(200).send({ success: false, message: 'Password can\'t be empty' });
        else if (req.body.phone == null || req.body.phone.length === 0) res.status(200).send({ success: false, message: 'Phone no can\'t be empty' });
        else if (req.body.messusername == null || req.body.messusername.length === 0) res.status(200).send({ success: false, message: 'Messusername can\'t be empty' });
		 else next();
    }

    static addUserValidation(req, res, next) {
        if (req.body.username === null || req.body.username.length === 0) res.status(200).send({ success: false, message: 'User name can\'t be empty' });
		 else if (req.body.email === null || req.body.email.length === 0) res.status(200).send({ success: false, message: 'Email can\'t be empty' });
        else if (req.body.password === null || req.body.password.length === 0) res.status(200).send({ success: false, message: 'Password can\'t be empty' });
        else if (req.body.phone === null || req.body.phone.length === 0) res.status(200).send({ success: false, message: 'Phone no can\'t be empty' });
		 else next();
    }

    // 422 (Unprocessable Entity)
    static loginValidation(req, res, next) {
        if (req.body.email === null || req.body.email.length === 0) res.status(200).send({ success: false, message: 'Email can\'t be empty' });
        else if (req.body.password === null || req.body.password.length === 0) res.status(200).send({ success: false, message: 'Password can\'t be empty' });
        else next();
    }

    // status(409)
    async checkMessExistOrNot(mess) {
        try {
            const response = await MessModel.findOne(mess);
            if (response) {
                return { success: false, message: `${mess.messusername} is exist, please try another name` };
            }
            return { success: true };
        } catch (e) {
            throw e;
        }
    }

    // status(409)
    async checkEmailExistOrNot(email) {
        try {
            const response = await UserModel.findOne(email);
            if (response !== null) {
                return {
                    success: false, message: `${email.email} is exist, please try another email`,
                };
            }
            return { success: true };
        } catch (e) {
            throw e;
        }
    }

    // status(40!)
    async checkUser(email) {
        try {
            const response = await UserModel.findOne(email);
            if (response) return { success: true, data: response };
            return { success: false, message: `${email.email} is not exist, please signup or try valid registered email` };
        } catch (e) {
            throw e;
        }
    }
}
