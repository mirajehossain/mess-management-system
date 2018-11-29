let response = require('../helper/response');
const MealLib = require('../lib/meal.lib');
class MealController extends MealLib{
	constructor(){
		super();
	};

	async addMeal(req,res){
		try {
			let mealObject = req.body;
			let date = new Date(req.body.date).toISOString();
			console.log(date);
			mealObject.messName = req.auth.messusername;
			mealObject.date = date;  /// date formate "10/22/2018"

			const result = await super.addMeal(mealObject);
			return res.status(200).json(response.single(true, 'Meal added', result));
		} catch (e) {
			return res.status(400).json(response.error(false, 'An error occur', e));
		}
	}

	async updateMeal(req,res){
		try {
			let mealId = req.params.mealId;
			let updateObj = req.body;
			const result = await super.updateMeal(mealId, updateObj);
			return res.status(200).json(response.single(true, 'Meal updated successfully', result));
		} catch (e) {
			return res.status(400).json(response.error(false, 'An error occur', e));
		}
	}

	async totalMealInMonth(req,res){
		try {
			let messName = req.auth.messusername;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = new Date(y, m, 1).toISOString();
			const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();
			const result = await super.totalMealInMonth(currentMonthFirstDate, currentMonthLastDate, messName);
			if(result instanceof Error)
				return res.status(400).json(response.error(false,`${result}`, `${result}`));
			else
				return res.status(200).json(response.single(true, 'Total Meals', result));

		} catch (e) {
			return res.status(400).json(response.error(false, 'An error occur', e));
		}
	}

	async totalMeal(req,res){
		try {
			let messName = req.auth.messusername;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = new Date(y, m, 1).toISOString();
			const currentDate = new Date().toISOString();

			const result = await super.totalMeal(currentMonthFirstDate, currentDate, messName);
			if(result instanceof Error)
				return res.status(400).json(response.error(false,`${result}`, `${result}`));
			else
				return res.status(200).json(response.single(true, 'Total Meals', result));
		} catch (e) {
			return res.status(400).json(response.error(false, 'An error occur', e));
		}
	}

	async currentMeal(req,res){
		try {
			let messName = req.auth.messusername;
			const month = new Date().getMonth()+1;
			const year = new Date().getFullYear();
			const currentMonthDate = new Date(`${month},1, ${year}`);
			currentMonthDate.toISOString();
			const currentDate = new Date().toISOString();
			const result =  await super.currentMeal(currentMonthDate, currentDate, messName);
			if(result instanceof Error)
				return res.status(400).json(response.error(false,`${result}`, `${result}`));
			else
				return res.status(200).json(response.single(true, 'Total Meals', result));
		} catch (e) {
			return res.status(400).json(response.error(false, 'An error occur', e));
		}
	}

	async userWiseMeal(req,res){
		try {
			let userId = req.params.userId;
			const result = await super.userWiseMeal(userId);
			return res.status(200).json(response.single(true, 'Your total Meals', result));
		} catch (e) {
			return res.status(400).json(response.error(false, 'An error occur', e));
		}
	}

	async currentMessMeal(req,res){
		try {
			let messName = req.auth.messusername;
			const result = await super.currentMessMeal(messName);
			return res.status(200).json(response.single(true, 'Current Mess Meals', result));

		} catch (e) {
			return res.status(400).json(response.error(false, 'An error occur', e));
		}
	}

	async mealRateInMonth(req,res){
		try {
			let messName = req.auth.messusername;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = new Date(y, m, 1).toISOString();
			const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();

			const result = await super.mealRateInMonth(currentMonthFirstDate,currentMonthLastDate,messName);
			if(result instanceof Error)
				return res.status(400).json(response.error(false,`${result}`, `${result}`));
			else
				return res.status(200).json(response.single(true, 'Meal rate', result));
		} catch (e) {
			return res.status(400).json(response.error(false, 'An error occur', e));
		}
	}
	async mealRate(req,res){
		try {
			let messName = req.auth.messusername;
			const result = await super.mealRate(messName);
			return res.status(200).json(response.single(true, 'Meal rate', result));
		} catch (e) {
			return res.status(400).json(response.error(false, 'An error occur', e));
		}
	}

}

module.exports = MealController;