const express = require('express');

const router = express.Router();

const authController = require('../auth/auth.controller');

const AuthController = new authController();
const MessController = require('./mess.controller');

/**
 * Calculate routing
 */

router.route('/messSummary').post(AuthController.isUser, MessController.messSummary);
router.route('/userSummary/:userId').get(AuthController.isUser, MessController.userSummary);


module.exports = router;
