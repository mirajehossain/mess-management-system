let response = require('../helper/response');
let ExpenseModel = require('../models/expenseModel');
let ExpenseCategoryModel= require('../models/expenseCategoryModel');
let ExpenseLib = require('../lib/exepnse.lib');
class ExpenseController extends ExpenseLib{
    constructor(){
        super();
    };
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
        balanceObject.date = req.body.date || new Date();
        ExpenseModel.create(balanceObject, (err,result)=>{
            if(err){
                return res.json(response.error(false,"An error occur",err))
            } else {
                return res.json(response.single(true, `You are add ${result.amount} amount on your Expense`, result));
            }
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