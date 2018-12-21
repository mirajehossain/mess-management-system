const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const AuthController = new authController();

const userController = require('../controllers/userController');
const UserController = new userController();

/**
 * Calculate routing
 */

    router.route('/messSummary').get(AuthController.isUser, UserController.messSummary);
    router.route('/userSummary/:userId').get(AuthController.isUser, UserController.userSummary);



module.exports = router;