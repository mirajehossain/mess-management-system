const MealModel = require('./meal.model');
const UserModel = require('../user/user.model');
const ExpenseLib = require('../expense/expense.lib');
class MealLib {
	constructor(){};

	static async addMeal(mealObject){
		try {
			return await MealModel.create(mealObject);
		} catch (e) {
			throw e;
		}
	}

	static async updateMeal(mealId, updateObj){
		try {
			return await MealModel.findByIdAndUpdate({_id: mealId},updateObj,{new:true});
		} catch (e) {
			throw e;
		}
	}
	async deleteMeal(mealId){
		try {
			return await MealModel.findByIdAndRemove(mealId);
		} catch (e) {
			throw e;
		}
	}
	static async totalMealInMonth(currentMonthFirstDate, currentMonthLastDate,messId){
		try {
			const data = await MealModel.find(
				{
					messId: messId,
					date: {$gte: currentMonthFirstDate, $lte: currentMonthLastDate}
				});

			if(data.length){
				let mealDetails = await Promise.all(data.map(async (item)=>{
					let usr = await UserModel.findById(item.userId);
					return {
						username:usr.username,
						...item.toObject()
					};
				}));

				let MealArr = data.map((item)=> item.numberOfMeal);
				let meals = MealArr.reduce((sum, meal)=> sum + meal);
				return  { data: mealDetails, meals: meals}
			} else
				return  { data:null, meals: 0 }
		} catch (e) {
			throw e;
		}
	};


	static async totalMeal(currentMonth, currentDate,messId){
		try {
			const data = await MealModel.find(
				{
					messId: messId,
					date: {$gte:  currentMonth, $lte:  currentDate}
				});

			if(data.length){
				let mealDetails = await Promise.all(data.map(async (item)=>{
					let usr = await UserModel.findById(item.userId);
					return {
						username:usr.username,
						...item.toObject()
					};
				}));
				let MealArr = data.map((item)=>item.numberOfMeal);
				let result =  MealArr.reduce((sum, meal)=>sum + meal);
				return {data: mealDetails, meals:result};
			} else {
				return {data: null, meals: 0}
			}
		} catch (e) {
			throw e;
		}
	};


	static async currentMeal(currentMonth, currentDate,messId){
		try {
			const data = await MealModel.find(	
				{
					messId: messId,
					date: {$gte:  currentMonth, $lte:  currentDate}
				});
			if(data.length){
				let mealDetails = await Promise.all(data.map(async (item)=>{
					let usr = await UserModel.findById(item.userId);
					return {
						username:usr.username,
						...item.toObject()
					};
				}));

				let MealArr = data.map((item)=>item.numberOfMeal);
				let result =  MealArr.reduce((sum, meal)=>sum + meal);
				return {data:mealDetails, meals:result};
			} else {
				return {data: null, meals: 0}
			}
		} catch (e) {
			throw e;
		}
	};

	static async userWiseMeal(currentMonthFirstDate, currentMonthLastDate, userId){
		try {
			let data = await MealModel.find({
				userId:userId,
				date: {$gte: currentMonthFirstDate, $lte: currentMonthLastDate}
			});

			if(data.length){
				let MealArr = data.map((item)=>item.numberOfMeal);
				let result =  MealArr.reduce((sum, meal)=>sum + meal);
				return {data: data, meals:result};
			} else {
				return {data: null, meals: 0}
			}
		} catch (e) {
			throw e;
		}
	};


	static async mealRateInMonth(currentMonthFirstDate,currentMonthLastDate,messId){
		try {
			return await Promise.all(
				[
					ExpenseLib.totalMealExpense(currentMonthFirstDate,currentMonthLastDate, messId),
					MealLib.totalMealInMonth(currentMonthFirstDate,currentMonthLastDate,messId)
				]).then(result=>{
					return result[0].total/ result[1].meals;
			});
		} catch (e) {
			throw e;
		}
	};


	static async mealRate(messId){
		try {
			return await Promise.all(
				[
					ExpenseLib.totalMessExpense(messId),
					MealLib.totalMeal(messId)
				]).then(result=>{
				return result[0]/ result[1];
			});
		} catch (e) {
			throw e;
		}
	};

}


module.exports = MealLib;