const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const AuthController = new authController();

    router.route('/signup').post(AuthController.signup);
    router.route('/login').post(
        AuthController.login,
        AuthController.prepareToken,
        AuthController.generateToken,
        AuthController.sendToken
    );

module.exports = router;