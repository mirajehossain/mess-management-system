const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');

    router.route('/addUser').post(AuthController.isAdmin, UserController.addUser);

module.exports = router;