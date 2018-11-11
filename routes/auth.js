const express = require('express');
const router = express.Router();
const AuthValidation = require('../validation/authValidation');
const authController = require('../controllers/authController');
const AuthController = new authController();

    router.route('/signup').post(AuthValidation.signupValidation, AuthController.signup);
    router.route('/login').post(
        AuthValidation.loginValidation,
        AuthController.login,
        AuthController.prepareToken,
        AuthController.generateToken,
        AuthController.sendToken
    );

module.exports = router;