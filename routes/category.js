const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const AuthController = new authController();

const balanceController = require('../controllers/balanceController');
const BalanceController = new balanceController();

/**
 * Category routing
 */

router.route('/category/addCategory').post(AuthController.isAdmin, BalanceController.addCategory );
router.route('/category/getCategory').get(AuthController.isUser, BalanceController.getCategory );
router.route('/category/updateCategory/:categoryId').put(AuthController.isAdmin, BalanceController.updateCategory);
router.route('/category/deleteCategory/:categoryId').delete(AuthController.isAdmin, BalanceController.deleteCategory);



module.exports = router;