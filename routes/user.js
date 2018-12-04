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

const AuthValidation = require('../validation/authValidation');

/**
 * User routing
 */
    router.route('/addUser').post(AuthController.isAdmin, AuthValidation.addUserValidation, UserController.addUser);
    router.route('/changePassword').put(AuthController.isUser, UserController.changePassword);
    router.route('/updateProfile').put(AuthController.isUser, UserController.updateProfile);
    router.route('/getProfile').get(AuthController.isUser, UserController.getProfile);
    router.route('/getUsers').get(AuthController.isUser, UserController.getUsers);



/**
 * Balance routing
 */
    router.route('/balance/addCategory').post(AuthController.isAdmin, BalanceController.addCategory );
    router.route('/balance/addBalance').post(AuthController.isUser, BalanceController.addBalance );
    router.route('/balance/totalMessBalance').get(AuthController.isUser, BalanceController.totalMessBalance );
    router.route('/balance/totalUserBalance').get(AuthController.isUser, BalanceController.totalUserBalance );
    router.route('/balance/categoryWiseBalance/:categoryId').get(AuthController.isUser,  BalanceController.categoryWiseBalance);
    router.route('/balance/currentBalance').get(AuthController.isUser,  BalanceController.currentBalance);
    router.route('/balance/updateBalance/:balanceId').put(AuthController.isUser,  BalanceController.updateBalance);

/**
 * Expense routing
 */
    router.route('/expense/addExpense').post(AuthController.isUser, ExpenseController.addExpense);
    router.route('/expense/totalMessExpense').get(AuthController.isUser, ExpenseController.totalMessExpense);
    router.route('/expense/totalExpenseInMonth').get(AuthController.isUser, ExpenseController.totalExpenseInMonth);
    router.route('/expense/categoryWiseExpense/:categoryId').get(AuthController.isUser,  ExpenseController.categoryWiseExpense);


/**
 * Meal routing
 */
    router.route('/meal/addMeal').post(AuthController.isAdmin, MealController.addMeal);
    router.route('/meal/updateMeal/:mealId').put(AuthController.isAdmin, MealController.updateMeal);
    router.route('/meal/totalMealInMonth').get(AuthController.isUser, MealController.totalMealInMonth);
    // router.route('/meal/totalMeal').get(AuthController.isUser, MealController.totalMeal);
    router.route('/meal/currentMeal').get(AuthController.isUser, MealController.currentMeal);
    // router.route('/meal/userWiseMeal/:userId').get(AuthController.isUser, MealController.userWiseMeal);
    router.route('/meal/mealRateInMonth').get(AuthController.isUser, MealController.mealRateInMonth);
    // router.route('/meal/mealRate').get(AuthController.isUser, MealController.mealRate);
    // router.route('/meal/currentMessMealWithRate').get(AuthController.isUser, MealController.currentMessMealWithRate);


/**
 * Calculate routing
 */

router.route('/userSummary/userId').get(AuthController.isUser, UserController.userSummary);



module.exports = router;