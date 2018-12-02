const MealModel = require('../models/mealModel');
const expenseLib = require('../lib/exepnse.lib');
const ExpenseLib =new expenseLib();
class MealLib {
	constructor(){};

	async addMeal(mealObject){
		try {
			return await MealModel.create(mealObject);
		} catch (e) {
			return e;
		}
	}

	async updateMeal(mealId, updateObj){
		try {
			return await MealModel.findByIdAndUpdate({_id: mealId},updateObj,{new:true});
		} catch (e) {
			return e;
		}
	}
	async totalMealInMonth(currentMonthFirstDate, currentMonthLastDate,messName){
		try {
			const data = await MealModel.find(
				{
					messName: messName,
					date: {
						$gte: currentMonthFirstDate,
						$lte: currentMonthLastDate,
					}
				});

			if(data.length){
				let MealArr = data.map((item)=> item.numberOfMeal);
				return  MealArr.reduce((sum, meal)=> sum + meal);
			} else
				throw new Error('No Meals in This month')
		} catch (e) {
			return e;
		}
	};


	async totalMeal(currentMonth, currentDate,messName){
		try {
			const data = await MealModel.find(
				{
					messName: messName,
					date: {
						$gte:  currentMonth,
						$lte:  currentDate,
					}
				});
			if(data.length){
				let MealArr = data.map((item)=>item.numberOfMeal);
				console.log(MealArr);
				let result =  MealArr.reduce((sum, meal)=>sum + meal);
				return {meals:result};
			} else {
				throw new Error('No expense in the mess')
			}
		} catch (e) {
			return e;
		}
	};


	async currentMeal(currentMonth, currentDate,messName){
		try {
			const data = await MealModel.find(
				{
					messName: messName,
					date: {
						$gte:  currentMonth,
						$lte:  currentDate,
					}
				});
			if(data.length){
				let MealArr = data.map((item)=>item.numberOfMeal);
				console.log(MealArr);
				let result =  MealArr.reduce((sum, meal)=>sum + meal);
				return {meals:result};
			} else {
				throw new Error('No expense in the mess');
			}
		} catch (e) {
			return e;
		}
	};

	async userWiseMeal(userId){
		try {
			return await MealModel.find({userId:userId});
		} catch (e) {
			return e;
		}
	};

	async currentMessMeal(messName){
		try {
			return await MealModel.find({messName:messName});
		} catch (e) {
			return e;
		}
	};

	async mealRateInMonth(currentMonthFirstDate,currentMonthLastDate,messName){
		try {
			let m = new MealLib();
			return await Promise.all(
				[
					ExpenseLib.totalExpenseInMonth(currentMonthFirstDate,currentMonthLastDate,messName),
					m.totalMealInMonth(currentMonthFirstDate,currentMonthLastDate,messName)
				]).then(result=>{
				if(result[0] instanceof Error){
					return result[0];
				}

				if (result[1] instanceof Error){
					return result[1];
				}
				return result[0]/ result[1];

			});
		} catch (e) {
			return e;
		}
	};


	async mealRate(messName){
		try {
			let m = new MealLib();
			return await Promise.all(
				[
					ExpenseLib.totalMessExpense(messName),
					m.totalMeal(messName)
				]).then(result=>{
				return result[0]/ result[1];
			});
		} catch (e) {
			return e;
		}
	};



}


module.exports = MealLib;