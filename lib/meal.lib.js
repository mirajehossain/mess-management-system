const MealModel = require('../models/mealModel');
const UserModel = require('../models/userModel');
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
	async deleteMeal(mealId){
		try {
			return await MealModel.findByIdAndRemove(mealId);
		} catch (e) {
			return e;
		}
	}
	async totalMealInMonth(currentMonthFirstDate, currentMonthLastDate,messId){
		try {
			const data = await MealModel.find(
				{
					messId: messId,
					date: {
						$gte: currentMonthFirstDate,
						$lte: currentMonthLastDate,
					}
				});

			if(data.length){
				let mealDetails = await Promise.all(data.map(async (item)=>{
					let usr = await UserModel.findById(item.userId);
					let ob = {
						username:'',
						...item._doc
					};
					ob.username = usr.username;
					return ob;
				}));

				let MealArr = data.map((item)=> item.numberOfMeal);
				let meals = MealArr.reduce((sum, meal)=> sum + meal);
				return  {
					data: mealDetails,
					meals: meals
				}
			} else
				return  {
					data:null,
					meals: 0
				}
		} catch (e) {
			return e;
		}
	};


	async totalMeal(currentMonth, currentDate,messId){
		try {
			const data = await MealModel.find(
				{
					messId: messId,
					date: {
						$gte:  currentMonth,
						$lte:  currentDate,
					}
				});

			console.log(data);
			if(data.length){
				let mealDetails = await Promise.all(data.map(async (item)=>{
					let usr = await UserModel.findById(item.userId);
					let ob = {
						username:'',
						...item._doc
					};
					ob.username = usr.username;
					return ob;
				}));
				let MealArr = data.map((item)=>item.numberOfMeal);
				let result =  MealArr.reduce((sum, meal)=>sum + meal);
				return {
					data: mealDetails,
					meals:result
				};
			} else {
				return {
					data: null,
					meals: 0
				}
			}
		} catch (e) {
			return e;
		}
	};


	async currentMeal(currentMonth, currentDate,messId){
		try {
			const data = await MealModel.find(	
				{
					messId: messId,
					date: {
						$gte:  currentMonth,
						$lte:  currentDate,
					}
				});
			if(data.length){
				let mealDetails = await Promise.all(data.map(async (item)=>{
					let usr = await UserModel.findById(item.userId);
					let ob = {
						username:'',
						...item._doc
					};
					ob.username = usr.username;
					return ob;
				}));

				let MealArr = data.map((item)=>item.numberOfMeal);
				let result =  MealArr.reduce((sum, meal)=>sum + meal);
				return {
					data:mealDetails,
					meals:result
				};
			} else {
				return {
					data: null,
					meals: 0
				}
			}
		} catch (e) {
			return e;
		}
	};

	async userWiseMeal(currentMonthFirstDate, currentMonthLastDate, userId){
		try {
			let data = await MealModel.find({
				userId:userId,
				date: {
					$gte: currentMonthFirstDate,
					$lte: currentMonthLastDate
				}
			});

			if(data.length){
				let MealArr = data.map((item)=>item.numberOfMeal);
				let result =  MealArr.reduce((sum, meal)=>sum + meal);
				return {
					data: data,
					meals:result
				};
			} else {
				return {
					data: null,
					meals: 0
				}
			}
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

	async mealRateInMonth(currentMonthFirstDate,currentMonthLastDate,messId){
		try {
			let m = new MealLib();
			return await Promise.all(
				[
					ExpenseLib.totalMealExpense(currentMonthFirstDate,currentMonthLastDate, messId),
					m.totalMealInMonth(currentMonthFirstDate,currentMonthLastDate,messId)
				]).then(result=>{
				if(result[0] instanceof Error) return result[0];

				if (result[1] instanceof Error) return result[1];

				return result[0].total/ result[1].meals;
			});
		} catch (e) {
			return e;
		}
	};


	async mealRate(messId){
		try {
			let m = new MealLib();
			return await Promise.all(
				[
					ExpenseLib.totalMessExpense(messId),
					m.totalMeal(messId)
				]).then(result=>{
				return result[0]/ result[1];
			});
		} catch (e) {
			return e;
		}
	};



}


module.exports = MealLib;