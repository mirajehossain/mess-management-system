const express = require('express');
const router = express.Router();

const authController = require('../auth/auth.controller');
const AuthController = new authController();

const MealController = require('./meal.controller');



/**
 * Meal routing
 */
router.route('/meal/addMeal').post(AuthController.isAdmin, MealController.addMeal);
router.route('/meal/updateMeal/:mealId').put(AuthController.isAdmin, MealController.updateMeal);
router.route('/meal/deleteMeal/:mealId').delete(AuthController.isAdmin, MealController.deleteMeal);
router.route('/meal/totalMealInMonth').get(AuthController.isUser, MealController.totalMealInMonth);
router.route('/meal/currentMeal').get(AuthController.isUser, MealController.currentMeal);
router.route('/meal/mealRateInMonth').get(AuthController.isUser, MealController.mealRateInMonth);
router.route('/meal/userWiseMeal/:userId').get(AuthController.isUser, MealController.userWiseMeal);


module.exports = router;