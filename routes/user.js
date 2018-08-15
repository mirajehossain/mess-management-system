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


/**
 * User routing
 */
    router.route('/addUser').post(AuthController.isAdmin, UserController.addUser);
    router.route('/changePassword').put(AuthController.isUser, UserController.changePassword);
    router.route('/updateProfile').put(AuthController.isUser, UserController.updateProfile);
    router.route('/getProfile').get(AuthController.isUser, UserController.getProfile);
    router.route('/getUsers').get(AuthController.isUser, UserController.getUsers);



/**
 * Balance routing
 */
    router.route('/balance/addBalanceCategory').post(AuthController.isAdmin, BalanceController.addBalanceCategory );
    router.route('/balance/addBalance').post(AuthController.isUser, BalanceController.addBalance );
    router.route('/balance/totalMessBalance').get(AuthController.isUser, BalanceController.totalMessBalance );
    router.route('/balance/totalUserBalance').get(AuthController.isUser, BalanceController.totalUserBalance );
    router.route('/balance/categoryWiseBalance/:balanceCatId').get(AuthController.isUser,  BalanceController.categoryWiseBalance);

/**
 * Expense routing
 */
    router.route('/expense/addExpenseCategory').post(AuthController.isAdmin, ExpenseController.addExpenseCategory);
    router.route('/expense/addExpense').post(AuthController.isUser, ExpenseController.addExpense);
    router.route('/expense/totalMessExpense').get(AuthController.isUser, ExpenseController.totalMessExpense);
    router.route('/expense/categoryWiseExpense/:categoryId').get(AuthController.isUser,  ExpenseController.categoryWiseExpense);


/**
 * Meal routing
 */
    router.route('/meal/addMeal').post(AuthController.isAdmin, MealController.addMeal);
    router.route('/meal/updateMeal/:mealId').put(AuthController.isAdmin, MealController.updateMeal);
    router.route('/meal/totalMeal').get(AuthController.isUser, MealController.totalMeal);
    router.route('/meal/userWiseMeal/:userId').get(AuthController.isUser, MealController.userWiseMeal);
    // router.route('/meal/currentMessMealWithRate').get(AuthController.isUser, MealController.currentMessMealWithRate);


/**
 * Calculate routing
 */

router.route('/userSummary/userId').get(AuthController.isUser, UserController.userSummary);



module.exports = router;