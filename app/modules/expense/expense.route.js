const express = require('express');
const router = express.Router();

const authController = require('../auth/auth.controller');
const AuthController = new authController();

const expenseController = require('./expense.controller');
const ExpenseController = new expenseController();


/**
 * Expense routing
 */
router.route('/expense/addExpense').post(AuthController.isAdmin, ExpenseController.addExpense);
router.route('/expense/updateExpense/:expenseId').put(AuthController.isAdmin,  ExpenseController.updateExpense);
router.route('/expense/totalMessExpense').get(AuthController.isUser, ExpenseController.totalMessExpense);
// router.route('/expense/messTotalExpense').get(AuthController.isUser, ExpenseController.totalMessExpense);
router.route('/expense/totalMealExpense').get(AuthController.isUser, ExpenseController.totalMealExpense);
// router.route('/expense/mealTotalExpense').get(AuthController.isUser, ExpenseController.totalMealExpense);
router.route('/expense/categoryWiseExpense/:categoryId').get(AuthController.isUser,  ExpenseController.categoryWiseExpense);
router.route('/expense/deleteExpense/:expenseId').delete(AuthController.isAdmin,  ExpenseController.deleteExpense);


module.exports = router;