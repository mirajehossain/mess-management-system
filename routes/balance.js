const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const AuthController = new authController();

const balanceController = require('../controllers/balanceController');
const BalanceController = new balanceController();

/**
 * Balance routing
 */
router.route('/balance/addBalance').post(AuthController.isAdmin, BalanceController.addBalance);
router.route('/balance/updateBalance/:balanceId').put(AuthController.isAdmin,  BalanceController.updateBalance);
router.route('/balance/deleteBalance/:balanceId').delete(AuthController.isAdmin,  BalanceController.deleteBalance);
router.route('/balance/totalMessBalance').get(AuthController.isUser, BalanceController.totalMessBalance);
// router.route('/balance/messTotalBalance').get(AuthController.isUser, BalanceController.totalMessBalance);
router.route('/balance/userTotalBalance').get(AuthController.isUser, BalanceController.userTotalBalance );
router.route('/balance/userMealBalance').get(AuthController.isUser, BalanceController.userMealBalance );
router.route('/balance/categoryWiseBalance/:categoryId').get(AuthController.isUser,  BalanceController.categoryWiseBalance);
router.route('/balance/currentAvailableBalance').get(AuthController.isUser,  BalanceController.currentAvailableBalance);



module.exports = router;