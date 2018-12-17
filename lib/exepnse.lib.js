const ExpenseModel = require('../models/expenseModel');
const CategoryModel = require('../models/categoryModel');
const UserModel = require('../models/userModel');
class ExpenseLib {
	constructor(){};


	async addExpense(expenseObject){
		try {
			return await ExpenseModel.create(expenseObject);
		} catch (e) {
			return e;
		}

	}
	async totalMessExpense(currentMonthFirstDate, currentMonthLastDate, messId){
		try {
			const data = await ExpenseModel.find({
				messId: messId,
				date: {
					$gte:  currentMonthFirstDate,
					$lte:  currentMonthLastDate,
				}});
			if(data.length){

				let expenseDetails = await Promise.all(data.map(async (item)=>{
					let cat = await CategoryModel.findById(item.categoryId);
					let usr = await UserModel.findById(item.userId);
					let ob = {
						category:'',
						username:'',
						...item._doc
					};
					ob.category = cat.name;
					ob.username = usr.username;
					return ob;
				}));

				let ExpenseArr = data.map((item)=>item.amount);
				let total = ExpenseArr.reduce((sum, expense)=>sum + expense);
				return {
					data: expenseDetails,
					total: total
				}
			} else {
				return 0;
				// throw new Error('No Expense in the mess');
			}
		} catch (e) {
			return e;
		}

	};
	async totalExpenseInMonth(currentMonthFirstDate,currentMonthLastDate,messId){
		try {
			const data = await ExpenseModel.find( {
				messId: messId,
				date: {
					$gte:  currentMonthFirstDate,
					$lte:  currentMonthLastDate,
				}
			});
			if(data.length){
				let ExpenseArr = data.map((item)=>item.amount);
				return ExpenseArr.reduce((sum, expense)=>sum + expense);
			} else {
				throw new Error('No expense in the mess');
			}
		} catch (e) {
			return e;
		}

	};

	async categoryWiseExpense(categoryId){
		try {
			const data = await ExpenseModel.find({categoryId: categoryId});

			if(data.length){
				let ExpenseArr = data.map((item)=>item.amount);
				console.log(ExpenseArr);
					 return ExpenseArr.reduce((sum, expense)=> sum + expense);
			} else {
				throw new Error('No expense in this category');
			}
		} catch (e) {
			return e;
		}
	};

	async updateExpense(expenseId, updateObj){
		try {
			return await ExpenseModel.findByIdAndUpdate({_id: expenseId},updateObj,{new:true});
		} catch (e) {
			return e;
		}
	}

}


module.exports = ExpenseLib;