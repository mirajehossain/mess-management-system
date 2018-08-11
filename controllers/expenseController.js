let response = require('../helper/response');
let ExpenseLib = require('../lib/exepnse.lib');
class ExpenseController extends ExpenseLib{
    constructor(){
        super();
    };
    addExpenseCategory(req,res){
        let expenseObject = req.body;
        expenseObject.messName = req.auth.messusername;
        console.log(expenseObject);
        super.addExpenseCategory(expenseObject).then(result=>{
            return res.json(response.single(true,`You are add new Expense category`, result));
        }).catch(err=>{
            return res.json(response.error(false,"An error occur",err));
        })

    };

    addExpense(req,res){
        console.log(req.auth.id);
        let expenseObject = req.body;
        expenseObject.userId = req.auth.id;
        expenseObject.messName = req.auth.messusername;
        expenseObject.date = req.body.date || new Date();
        super.addExpense(expenseObject).then(result=>{
            return res.json(response.single(true,`You are add ${result.amount} amount on your Expense`, result));
        }).catch(err=>{
            return res.json(response.error(false,"An error occur",err));
        })
    };

    totalMessExpense(req,res){
        let mess = req.auth.messusername;
        super.totalMessExpense(mess).then(expense=>{
            return res.json(response.single(true, `Total expense of mess: ${expense} `, expense));
        }).catch(err=>{
            return res.json(response.error(false,"An error occur",err));
        })
    }

    categoryWiseExpense(req, res){
        let categoryId = req.params.categoryId;
        super.categoryWiseExpense(categoryId).then(expense=>{
            return res.json(response.single(true, `Expense amount of the categories is: ${expense} `, expense));
        }).catch(err=>{
            return res.json(response.error(false,"An error occur",err));
        })
    }


}

module.exports = ExpenseController;