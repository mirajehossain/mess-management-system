let response = require('../helper/response');
let ExpenseModel = require('../models/expenseModel');
let ExpenseCategoryModel= require('../models/expenseCategoryModel');

class ExpenseController {
    constructor(){};
    addExpenseCategory(req,res){
        let expenseObject = req.body;
        expenseObject.messName = req.auth.messusername;
        console.log(expenseObject);

        ExpenseCategoryModel.findOne({
            $and: [ {name: expenseObject.name},{messName: expenseObject.messName}]
        },(err,category)=>{
            if(err){
                return res.json(response.error(false,"An error occur",err))
            } else {
                if(category !== null){
                    return res.json(response.error(false,`Category '${category.name}' already exist`,null))
                } else {
                    ExpenseCategoryModel.create(expenseObject,(err,result)=>{
                        if(err){
                            return res.json(response.error(false,"An error occur",err))
                        } else {
                            return res.json(response.single(true, "New Expense category Created", result));
                        }
                    })
                }

            }
        });
    };

    addExpense(req,res){
        console.log(req.auth.id);
        let balanceObject = req.body;
        balanceObject.userId = req.auth.id;
        balanceObject.messName = req.auth.messusername;
        balanceObject.date = new Date();
        ExpenseModel.create(balanceObject, (err,result)=>{
            if(err){
                return res.json(response.error(false,"An error occur",err))
            } else {
                return res.json(response.single(true, `You are add ${result.amount} amount on your Expense`, result));
            }
        })
    };


}

module.exports = new ExpenseController();