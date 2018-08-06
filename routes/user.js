const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const BalanceController = require('../controllers/balanceController');
const ExpenseController = require('../controllers/expenseController');


    router.route('/changePassword').put(AuthController.isUser, UserController.changePassword)

    router.route('/addUser').post(AuthController.isAdmin, UserController.addUser);
    router.route('/addBalanceCategory').post(AuthController.isAdmin, BalanceController.addBalanceCategory );
    router.route('/addBalance').post(AuthController.isUser, BalanceController.addBalance );

    router.route('/addExpenseCategory').post(AuthController.isAdmin, ExpenseController.addExpenseCategory);
    router.route('/addExpense').post(AuthController.isUser, ExpenseController.addExpense);

module.exports = router;