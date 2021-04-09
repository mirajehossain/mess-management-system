const express = require('express');

const router = express.Router();

const authController = require('../auth/auth.controller');

const AuthController = new authController();

const ExpenseController = require('./expense.controller');


/**
 * Expense routing
 */
router.route('/addExpense').post(AuthController.isAdmin, ExpenseController.addExpense);
router.route('/updateExpense/:expenseId').put(AuthController.isAdmin, ExpenseController.updateExpense);
router.route('/messTotalExpense').get(AuthController.isUser, ExpenseController.totalMessExpense);
router.route('/mealTotalExpense').get(AuthController.isUser, ExpenseController.totalMealExpense);
router.route('/categoryWiseExpense/:categoryId').get(AuthController.isUser, ExpenseController.categoryWiseExpense);
router.route('/deleteExpense/:expenseId').delete(AuthController.isAdmin, ExpenseController.deleteExpense);


module.exports = router;
