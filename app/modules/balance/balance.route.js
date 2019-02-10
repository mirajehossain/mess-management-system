const express = require('express');
const router = express.Router();

const authController = require('../auth/auth.controller');
const AuthController = new authController();


const BalanceController = require('./balance.controller');



/**
 * Balance routing
 */
router.route('/addBalance').post(AuthController.isAdmin, BalanceController.addBalance);
router.route('/updateBalance/:balanceId').put(AuthController.isAdmin,  BalanceController.updateBalance);
router.route('/deleteBalance/:balanceId').delete(AuthController.isAdmin,  BalanceController.deleteBalance);
router.route('/totalMessBalance').get(AuthController.isUser, BalanceController.totalMessBalance);
router.route('/userTotalBalance').get(AuthController.isUser, BalanceController.userTotalBalance );
router.route('/userMealBalance').get(AuthController.isUser, BalanceController.userMealBalance );
router.route('/categoryWiseBalance/:categoryId').get(AuthController.isUser,  BalanceController.categoryWiseBalance);
router.route('/currentAvailableBalance').get(AuthController.isUser,  BalanceController.currentAvailableBalance);


module.exports = router;