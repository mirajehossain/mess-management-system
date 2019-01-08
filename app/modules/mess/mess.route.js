const express = require('express');
const router = express.Router();

const authController = require('../../../controllers/authController');
const AuthController = new authController();

const userController = require('../user/user.controller');
const UserController = new userController();

/**
 * Calculate routing
 */

    router.route('/messSummary').post(AuthController.isUser, UserController.messSummary);
    router.route('/userSummary/:userId').get(AuthController.isUser, UserController.userSummary);



module.exports = router;