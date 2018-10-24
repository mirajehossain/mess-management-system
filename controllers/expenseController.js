let response = require('../helper/response');
let ExpenseLib = require('../lib/exepnse.lib');
class ExpenseController extends ExpenseLib{
    constructor(){
        super();
    };
    addExpense(req,res){
        console.log(req.auth.id);
        let expenseObject = req.body;
        expenseObject.userId = req.auth.id;
        expenseObject.messName = req.auth.messusername;
        expenseObject.date = req.body.date || new Date().toLocaleDateString();  /// date formate "10/22/2018"
        super.addExpense(expenseObject).then(result=>{
            return res.status(200).json(response.single(true,`You are add ${result.amount} amount on your Expense`, result));
        }).catch(err=>{
            return res.status(400).json(response.error(false,"An error occur",err));
        })
    };

    totalMessExpense(req,res){
        let mess = req.auth.messusername;
        super.totalMessExpense(mess).then(expense=>{
            return res.status(200).json(response.single(true, `Total expense of mess: ${expense} `, expense));
        }).catch(err=>{
            return res.status(400).json(response.error(false,"An error occur",err));
        })
    }

    categoryWiseExpense(req, res){
        let categoryId = req.params.categoryId;
        super.categoryWiseExpense(categoryId).then(expense=>{
            return res.status(200).json(response.single(true, `Expense amount of the categories is: ${expense} `, expense));
        }).catch(err=>{
            return res.status(400).json(response.error(false,"An error occur",err));
        })
    }


}

module.exports = ExpenseController;