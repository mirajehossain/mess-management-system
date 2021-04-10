const express = require('express');

const router = express.Router();

const AuthController = require('../auth/auth.controller');

const authController = new AuthController();


const BalanceController = require('./balance.controller');


/**
 * Balance routing
 */
router.route('/addBalance').post(authController.isAdmin, BalanceController.addBalance);
router.route('/updateBalance/:balanceId').put(authController.isAdmin, BalanceController.updateBalance);
router.route('/deleteBalance/:balanceId').delete(authController.isAdmin, BalanceController.deleteBalance);
router.route('/messTotalBalance').get(authController.isUser, BalanceController.totalMessBalance);
router.route('/userTotalBalance').get(authController.isUser, BalanceController.userTotalBalance);
router.route('/userMealBalance').get(authController.isUser, BalanceController.userMealBalance);
router.route('/categoryWiseBalance/:categoryId').get(authController.isUser, BalanceController.categoryWiseBalance);
router.route('/currentAvailableBalance').get(authController.isUser, BalanceController.currentAvailableBalance);


module.exports = router;
