const express = require('express');

const router = express.Router();
const AuthValidation = require('./auth.validation');
const AuthController = require('./auth.controller');

const authController = new AuthController();

router.route('/signup').post(
    AuthValidation.signupValidation,
    authController.signup,
);
router.route('/login').post(
    AuthValidation.loginValidation,
    authController.login,
    authController.prepareToken,
    authController.generateToken,
    authController.sendToken,
);

module.exports = router;
