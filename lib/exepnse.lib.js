const ExpenseModel = require('../models/expenseModel');
class ExpenseLib {
    constructor(){};

    totalMessExpense(mess){
        return new Promise((resolve,reject)=>{
            ExpenseModel.find({messName: mess}, (err, data)=>{
                if(err){
                    reject(err);
                } else {
                    let ExpenseArr = data.map((item)=>{
                        return item.amount;
                    });
                    console.log(ExpenseArr);
                    if(ExpenseArr.length){
                        let result =  ExpenseArr.reduce((sum, expense)=>{
                            return sum + expense;
                        });
                        resolve(result);
                    } else {
                        resolve('No expense in the mess');
                    }

                }
            })
        })

    };

    categoryWiseExpense(categoryId){
        return new Promise((resolve,reject)=>{
            ExpenseModel.find({expenseCategoryId: categoryId}, (err, data)=>{
                if(err){
                    reject(err);
                } else {
                    let ExpenseArr = data.map((item)=>{
                        return item.amount;
                    });
                    console.log(ExpenseArr);
                    if(ExpenseArr.length){
                        let result =  ExpenseArr.reduce((sum, expense)=>{
                            return sum + expense;
                        });
                        resolve(result);
                    } else {
                        resolve('No expense in this category');
                    }
                }
            })
        })

    }

}


module.exports = ExpenseLib;