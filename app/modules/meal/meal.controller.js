let response = require('../../../helper/response');
const MealLib = require('./meal.lib');
class MealController{
	constructor(){};

	static async addMeal(req,res){
		try {
			let mealObject = req.body;
			let date = new Date(req.body.date).toISOString();
			console.log(date);
			mealObject.messId = req.auth.messId;
			mealObject.date = date;  /// date formate "10/22/2018"

			const result = await MealLib.addMeal(mealObject);
			return res.status(200).json(response.single(true, 'Meal added', result));
		} catch (e) {
			return res.status(500).json(response.error(false, 'An error occur', `${e}`));
		}
	}

	static async updateMeal(req,res){
		try {
			let mealId = req.params.mealId;
			let updateObj = req.body;
			const result = await MealLib.updateMeal(mealId, updateObj);
			return res.status(200).json(response.single(true, 'Meal updated successfully', result));
		} catch (e) {
			return res.status(500).json(response.error(false, 'An error occur', `${e}`));
		}
	}
	static async deleteMeal(req,res){
		try {
			let mealId = req.params.mealId;
			await MealLib.deleteMeal(mealId);
			return res.status(200).json(response.single(true, 'Meal Delete successfully'));
		} catch (e) {
			return res.status(500).json(response.error(false, 'An error occur', `${e}`));
		}
	}

	static async totalMealInMonth(req,res){
		try {
			let messId = req.auth.messId;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = new Date(y, m, 1).toISOString();
			const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();
			const result = await MealLib.totalMealInMonth(currentMonthFirstDate, currentMonthLastDate, messId);
			return res.status(200).json(response.single(true, 'Total Meals '+result.meals, result.data));
		} catch (e) {
			return res.status(500).json(response.error(false, 'An error occur', `${e}`));
		}
	}

	static async totalMeal(req,res){
		try {
			let messId = req.auth.messId;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = new Date(y, m, 1).toISOString();
			const currentDate = new Date().toISOString();

			const result = await MealLib.totalMeal(currentMonthFirstDate, currentDate, messId);
			return res.status(200).json(response.single(true, 'Total Meals '+ result.meals, result.data));
		} catch (e) {
			return res.status(500).json(response.error(false, 'An error occur', `${e}`));
		}
	}

	static async currentMeal(req,res){
		try {
			let messId = req.auth.messId;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = new Date(y, m, 1).toISOString();
			const currentDate = new Date().toISOString();
			const result =  await MealLib.currentMeal(currentMonthFirstDate, currentDate, messId);
			return res.status(200).json(response.single(true, 'Total Meals '+result.meals, result.data));
		} catch (e) {
			return res.status(500).json(response.error(false, 'An error occur', `${e}`));
		}
	}

	static async userWiseMeal(req,res){
		try {
			let userId = req.params.userId;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = new Date(y, m, 1).toISOString();
			const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();
			const result = await MealLib.userWiseMeal(currentMonthFirstDate, currentMonthLastDate, userId);
			return res.status(200).json(response.single(true, 'Your total Meal is '+ result.meals, result));
		} catch (e) {
			return res.status(500).json(response.error(false, 'An error occur', `${e}`));
		}
	}

	static async mealRateInMonth(req,res){
		try {
			let messId = req.auth.messId;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = new Date(y, m, 1).toISOString();
			const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();

			const result = await MealLib.mealRateInMonth(currentMonthFirstDate,currentMonthLastDate,messId);
			return res.status(200).json(response.single(true, 'Meal rate', `${result}`));
		} catch (e) {
			return res.status(500).json(response.error(false, 'An error occur', `${e}`));
		}
	}
	static async mealRate(req,res){
		try {
			let messName = req.auth.messusername;
			const result = await MealLib.mealRate(messName);
			return res.status(200).json(response.single(true, 'Meal rate', result));
		} catch (e) {
			return res.status(500).json(response.error(false, 'An error occur', `${e}`));
		}
	}

}

module.exports = MealController;