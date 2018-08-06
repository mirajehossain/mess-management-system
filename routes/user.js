const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const BalanceController = require('../controllers/balanceController');

    router.route('/addUser').post(AuthController.isAdmin, UserController.addUser);
    router.route('/addBalanceCategory').post(AuthController.isAdmin, BalanceController.addBalanceCategory );
    router.route('/addBalance').post(AuthController.isUser, BalanceController.addBalance );

module.exports = router;