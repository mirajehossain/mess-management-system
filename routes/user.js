const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const BalanceController = require('../controllers/balanceController');
const ExpenseController = require('../controllers/expenseController');
const MealController = require('../controllers/mealController');



    router.route('/addUser').post(AuthController.isAdmin, UserController.addUser);
    router.route('/changePassword').put(AuthController.isUser, UserController.changePassword);
    router.route('/updateProfile').put(AuthController.isUser, UserController.updateProfile);
    router.route('/getProfile').get(AuthController.isUser, UserController.getProfile);


    router.route('/addBalanceCategory').post(AuthController.isAdmin, BalanceController.addBalanceCategory );
    router.route('/addBalance').post(AuthController.isUser, BalanceController.addBalance );
    router.route('/totalMessBalance').get(AuthController.isUser, BalanceController.totalMessBalance );
    router.route('/totalUserBalance').get(AuthController.isUser, BalanceController.totalUserBalance );



    router.route('/addExpenseCategory').post(AuthController.isAdmin, ExpenseController.addExpenseCategory);
    router.route('/addExpense').post(AuthController.isUser, ExpenseController.addExpense);

    router.route('/addMeal').post(AuthController.isUser, MealController.addMeal);

module.exports = router;