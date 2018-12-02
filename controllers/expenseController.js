let response = require('../helper/response');
let ExpenseLib = require('../lib/exepnse.lib');
class ExpenseController extends ExpenseLib{
	constructor(){
		super();
	};
	async addExpense(req,res){
		try {
			console.log(req.auth.id);
			let expenseObject = req.body;
			expenseObject.userId = req.auth.id;
			expenseObject.messName = req.auth.messusername;
			expenseObject.date = req.body.date || new Date().toLocaleDateString();  /// date formate "10/22/2018"
			const result = await super.addExpense(expenseObject);
			return res.status(200).json(response.single(true,`You are add ${result.amount} amount on your Expense`, result));
		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
	};

	async totalMessExpense(req,res){
		try {
			let mess = req.auth.messusername;
			const expense = await super.totalMessExpense(mess);
			if(expense instanceof Error)
				return res.status(400).json(response.error(false,`${expense}`,`${expense}`));
			else
				return res.status(200).json(response.single(true, `Total expense of mess: ${expense} `, expense));

		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
	}

	async categoryWiseExpense(req, res){
		try {
			let categoryId = req.params.categoryId;
			const expense = await super.categoryWiseExpense(categoryId);
			if(expense instanceof Error)
				return res.status(400).json(response.error(false,`${expense}`,`${expense}`));
			else
				return res.status(200).json(response.single(true, `Expense amount of the categories is: ${expense} `, expense));
		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
	}


}

module.exports = ExpenseController;