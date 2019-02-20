const express = require('express');

const router = express.Router();

const authController = require('../auth/auth.controller');

const AuthController = new authController();

const MealController = require('./meal.controller');

/**
 * Meal routing
 */
router.route('/addMeal').post(AuthController.isAdmin, MealController.addMeal);
router.route('/updateMeal/:mealId').put(AuthController.isAdmin, MealController.updateMeal);
router.route('/deleteMeal/:mealId').delete(AuthController.isAdmin, MealController.deleteMeal);
router.route('/totalMealInMonth').get(AuthController.isUser, MealController.totalMealInMonth);
router.route('/currentMeal').get(AuthController.isUser, MealController.currentMeal);
router.route('/mealRateInMonth').get(AuthController.isUser, MealController.mealRateInMonth);
router.route('/userWiseMeal/:userId').get(AuthController.isUser, MealController.userWiseMeal);


module.exports = router;
