const bcrypt = require('bcrypt');
const saltRounds = 10;

const BalanceModel = require('../models/balanceModel');
const ExpenseModel = require('../models/expenseModel');
const MealModel = require('../models/mealModel');
const UserModel = require('../models/userModel');
const balanceLib = require('../lib/balance.lib');
const BalanceLib = new balanceLib();

const mealLib = require('../lib/meal.lib');
const MealLib = new mealLib();
const ExpenseLib = require('../lib/exepnse.lib');
class UserLib extends ExpenseLib {
	constructor() {
		super();
	};

	async getProfile(id){
		try {
			const data = await UserModel.findById(id, {password:0});
			if(data != null)
				return data;
			else
				throw new Error(`No data found corresponding ID`);
		} catch (e) {
			return e;
		}
	};

	async updateProfile(id,updateObject){
		try {
			return await UserModel.findByIdAndUpdate(id, updateObject,{new:true});
		} catch (e) {
			return e;
		}
	};

	async changPassword(id, oldPassword, newPassword){
		try {
			const user = await UserModel.findOne({_id: id});
			if(user != null){
				const isMatched = await bcrypt.compare(oldPassword,user.password);
				if(isMatched){
					const hashed = bcrypt.hashSync(newPassword, saltRounds);
					return await UserModel.update({_id: id},{ $set: { password: hashed}}, { new: true });
				} else {
					throw new Error(`Password not matched`);
				}
			} else {
				throw new Error(`User not found corresponding ID`);
			}

		} catch (e) {
			return e;
		}
	};

	async getUsers(messId) {
		try {
			const users = await UserModel.find({messId: messId},{password:0});
			if(users.length){
				return users;
			} else {
				throw new Error(`No User found`);
			}
		} catch (e) {
			return e;
		}
	};
	async removeUser(userId) {
		try {
			await UserModel.findByIdAndRemove(userId);
			await BalanceModel.deleteMany({userId: userId});
			await ExpenseModel.deleteMany({userId: userId});
			await MealModel.deleteMany({userId: userId});
			return true
		} catch (e) {
			return e;
		}
	};

	async addUser(user){
		try {
			user.password = await bcrypt.hashSync(user.password, saltRounds);
			user.role = 'user'; /// admin, user
			let emailobj = {
				email: user.email
			};

			const found = await UserModel.findOne(emailobj);
			if(found != null){
				throw new Error('Email already exist');
			} else {
				return await UserModel.create(user);
			}

		} catch (e) {
			return e;
		}
	};

	async userSummary(currentMonthFirstDate, currentMonthLastDate, userId, messId){
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
			return e;
		}
	}

	async messSummary(currentMonthFirstDate, currentMonthLastDate, messId) {
		try {
			const totalSavings = await BalanceLib.totalMealBalance(currentMonthFirstDate, currentMonthLastDate, messId);
			const totalExpense = await super.totalMealExpense(currentMonthFirstDate, currentMonthLastDate, messId);
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
			return e;
		}
	}
}
module.exports = UserLib;