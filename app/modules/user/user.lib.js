const bcrypt = require('bcrypt');
const saltRounds = 10;

const BalanceModule = require('../balance/index');
const BalanceModel = BalanceModule.BalanceModel;
const ExpenseModel = require('../expense/expense.model');
const MealModel = require('../meal/meal.model');
const UserModel = require('./user.model');
const BalanceLib= BalanceModule.BalanceLib;

const MealLib= require('../meal/meal.lib');
const ExpenseLib = require('../expense/expense.lib');
class UserLib{
	constructor() {};

	static async getProfile(id){
		try {
			return await UserModel.findById(id, {password:0});
		} catch (e) {
			throw e;
		}
	};

	static async updateProfile(id,updateObject){
		try {
			return await UserModel.findByIdAndUpdate(id, updateObject,{new:true});
		} catch (e) {
			throw e;
		}
	};

	static async changPassword(id, oldPassword, newPassword){
		try {
			const user = await UserModel.findOne({_id: id});
			if(user != null){
				const isMatched = await bcrypt.compare(oldPassword,user.password);
				if(isMatched){
					const hashed = bcrypt.hashSync(newPassword, saltRounds);
					return await UserModel.update({_id: id},{ $set: { password: hashed}}, { new: true });
				} else {
					throw (`Password not matched`);
				}
			} else {
				throw (`User not found corresponding ID`);
			}

		} catch (e) {
			throw e;
		}
	};

	static async getUsers(messId) {
		try {
			return await UserModel.find({messId: messId},{password:0});
		} catch (e) {
			throw e;
		}
	};
	static async removeUser(userId) {
		try {
			await UserModel.findByIdAndRemove(userId);
			await BalanceModel.deleteMany({userId: userId});
			await ExpenseModel.deleteMany({userId: userId});
			await MealModel.deleteMany({userId: userId});
			return true
		} catch (e) {
			throw e;
		}
	};

	static async addUser(user){
		try {
			user.password = await bcrypt.hashSync(user.password, saltRounds);
			user.role = 'user'; /// admin, user
			let emailobj = {
				email: user.email
			};

			const found = await UserModel.findOne(emailobj);
			if(found != null){
				throw ('Email already exist');
			} else {
				return await UserModel.create(user);
			}

		} catch (e) {
			throw e;
		}
	};

	static async userSummary(currentMonthFirstDate, currentMonthLastDate, userId, messId){
		try {
			const totalSavings = await BalanceLib.userMealBalance(currentMonthFirstDate, currentMonthLastDate, userId, messId);
			const meal = await MealLib.userWiseMeal(currentMonthFirstDate, currentMonthLastDate, userId);
			const mealRate = await MealLib.mealRateInMonth(currentMonthFirstDate, currentMonthLastDate, messId);
			const totalExpense = mealRate * meal.meals;
			const balanceStatus = totalSavings.total - (mealRate * meal.meals) ;
			return {
				totalSavings: totalSavings.total,
				totalExpense: totalExpense.toFixed(2),
				balanceStatus: balanceStatus.toFixed(2),
				meals: meal.meals,
			}
		} catch (e) {
			throw e;
		}
	}

	static async messSummary(currentMonthFirstDate, currentMonthLastDate, messId) {
		try {
			const totalSavings = await BalanceLib.totalMealBalance(currentMonthFirstDate, currentMonthLastDate, messId);
			const totalExpense = await ExpenseLib.totalMealExpense(currentMonthFirstDate, currentMonthLastDate, messId);
			const totalMeals = await MealLib.totalMealInMonth(currentMonthFirstDate, currentMonthLastDate, messId);
			const mealRate = await MealLib.mealRateInMonth(currentMonthFirstDate, currentMonthLastDate,messId);
			const balanceStatus = totalSavings.total - totalExpense.total;
			return {
				totalSavings : totalSavings.total,
				totalExpense : totalExpense.total,
				balanceStatus: balanceStatus.toFixed(2),
				totalMeals : totalMeals.meals,
				mealRate : mealRate.toFixed(2)
			}
		} catch (e) {
			throw e;
		}
	}
}
module.exports = UserLib;