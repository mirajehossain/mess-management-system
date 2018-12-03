const ExpenseModel = require('../models/expenseModel');
const CategoryModel = require('../models/categoryModel');
class ExpenseLib {
	constructor(){};


	async addExpense(expenseObject){
		try {
			return await ExpenseModel.create(expenseObject);
		} catch (e) {
			return e;
		}

	}
	async totalMessExpense(messId){
		try {
			const data = await ExpenseModel.find({messId: messId});
			console.log(data)
			if(data.length){
				let ExpenseArr = data.map((item)=>item.amount);
				console.log(ExpenseArr);
				return ExpenseArr.reduce((sum, expense)=>sum + expense);
			} else {
				throw new Error('No Expense in the mess');
			}
		} catch (e) {
			return e;
		}

	};
	async totalExpenseInMonth(currentMonthFirstDate,currentMonthLastDate,mess){
		try {
			const data = await ExpenseModel.find( {
				messName: mess,
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
	}

	async totalMessExpenseMonthly(mess,date){
		try {
			const data = await ExpenseModel.find({messName: mess},{
				where:{
					// TODO
				}
			});
			if(data.length){
				let ExpenseArr = data.map((item)=> item.amount);
				console.log(ExpenseArr);
					return ExpenseArr.reduce((sum, expense)=>sum + expense);
			} else {
				throw new Error('No expense in the mess');
			}

		} catch (e) {
			return e;
		}

	};

}


module.exports = ExpenseLib;