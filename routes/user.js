const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const AuthController = new authController();

const userController = require('../controllers/userController');
const UserController = new userController();

const balanceController = require('../controllers/balanceController');
const BalanceController = new balanceController();

const expenseController = require('../controllers/expenseController');
const ExpenseController = new expenseController();

const mealController = require('../controllers/mealController');
const MealController = new mealController();



    router.route('/addUser').post(AuthController.isAdmin, UserController.addUser);
    router.route('/changePassword').put(AuthController.isUser, UserController.changePassword);
    router.route('/updateProfile').put(AuthController.isUser, UserController.updateProfile);
    router.route('/getProfile').get(AuthController.isUser, UserController.getProfile);
    router.route('/getUsers').get(AuthController.isUser, UserController.getUsers);


    router.route('balance/addBalanceCategory').post(AuthController.isAdmin, BalanceController.addBalanceCategory );
    router.route('balance/addBalance').post(AuthController.isUser, BalanceController.addBalance );
    router.route('balance/totalMessBalance').get(AuthController.isUser, BalanceController.totalMessBalance );
    router.route('balance/totalUserBalance').get(AuthController.isUser, BalanceController.totalUserBalance );


    router.route('category/addExpenseCategory').post(AuthController.isAdmin, ExpenseController.addExpenseCategory);
    router.route('category/addExpense').post(AuthController.isUser, ExpenseController.addExpense);
    router.route('category/totalMessExpense').get(AuthController.isUser, ExpenseController.totalMessExpense);
    router.route('category/categoryWiseExpense/:categoryId').get(AuthController.isUser,  ExpenseController.categoryWiseExpense);


    router.route('meal/addMeal').post(AuthController.isAdmin, MealController.addMeal);
    router.route('meal/updateMeal/:mealId').post(AuthController.isAdmin, MealController.updateMeal);
    router.route('meal/totalMeal').post(AuthController.isUser, MealController.totalMeal);
    router.route('meal/userWieMeal/:userId').post(AuthController.isUser, MealController.userWiseMeal);
    router.route('meal/currentMessMeal').post(AuthController.isUser, MealController.currentMessMeal);


module.exports = router;