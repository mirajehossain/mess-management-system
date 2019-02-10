let response = require('../../../helper/response');
let ExpenseLib = require('./expense.lib');
class ExpenseController{
	constructor(){};
	static async addExpense(req,res){
		try {
			let expenseObject = req.body;
			let date = new Date(req.body.date).toISOString();
			expenseObject.messId = req.auth.messId;
			expenseObject.date = date;  /// date formate "10/22/2018"
			const result = await ExpenseLib.addExpense(expenseObject);
			return res.status(200).json(response.single(true,`You are add ${result.amount} amount on your Expense`, result));
		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
	};

	static async totalMessExpense(req,res){
		try {
			let messId = req.auth.messId;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = new Date(y, m, 1).toISOString();
			const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();

			const expense = await ExpenseLib.totalMessExpense(currentMonthFirstDate, currentMonthLastDate, messId);
			if(expense instanceof Error)
				return res.status(400).json(response.error(false,`${expense}`,`${expense}`));
			else
				return res.status(200).json(response.single(true, `Total expense of mess: ${expense.total} `, expense));

		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
	}

	static async totalMealExpense(req,res){
		try {
			const messId = req.auth.messId;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = new Date(y, m, 1).toISOString();
			const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();
			const expense = await ExpenseLib.totalMealExpense(currentMonthFirstDate, currentMonthLastDate, messId);
			if(expense instanceof Error)
				return res.status(400).json(response.error(false,`${expense}`,`${expense}`));
			else
				return res.status(200).json(response.single(true, `Total expense of mess: ${expense.total} `, expense));

		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
	}

	static async categoryWiseExpense(req, res){
		try {
			let categoryId = req.params.categoryId;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = new Date(y, m, 1).toISOString();
			const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();

			const expense = await ExpenseLib.categoryWiseExpense(currentMonthFirstDate, currentMonthLastDate, categoryId);
			if(expense instanceof Error)
				return res.status(400).json(response.error(false,`${expense}`,`${expense}`));
			else
				return res.status(200).json(response.single(true, `Expense amount of the categories is: ${expense.total} `, expense));
		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
	};

	static async updateExpense(req, res){
		try {
			const expenseId = req.params.expenseId;
			const body = req.body;
			const expense = await ExpenseLib.updateExpense(expenseId, body);
			if(expense instanceof Error)
				return res.status(400).json(response.error(false,`${expense}`,`${expense}`));
			else
				return res.status(200).json(response.single(true, `Your updated expense is: ${expense.amount} `, expense));
		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
	}
	static async deleteExpense(req, res){
		try {
			const expenseId = req.params.expenseId;
			await ExpenseLib.deleteExpense(expenseId);
			return res.status(200).json(response.single(true, `Delete expense successfully`));
		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
	}
	/*
		async totalExpenseInMonth(req, res) {
			try {
				const messId = req.auth.messId;
				const date = new Date(), y = date.getFullYear(), m = date.getMonth();
				const currentMonthFirstDate = new Date(y, m, 1).toISOString();
				const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();
				const result = await super.totalExpenseInMonth(currentMonthFirstDate, currentMonthLastDate, messId);
				if(result instanceof Error)
					return res.status(400).json(response.error(false,`${result}`, `${result}`));
				else
					return res.status(200).json(response.single(true, 'Total expense', result));

			} catch (e) {
				return res.status(400).json(response.error(false, 'An error occur', `${e}`));
			}
		};
	*/

}

module.exports = ExpenseController;