const ExpenseModel = require('../models/expenseModel');
const ExpenseCategoryModel = require('../models/expenseCategoryModel');
class ExpenseLib {
    constructor(){};

    addExpenseCategory(expenseObject){
        return new Promise((resolve,reject)=>{
            ExpenseCategoryModel.findOne({
                $and: [ {name: expenseObject.name},{messName: expenseObject.messName}]
            },(err,category)=>{
                if(err){
                    reject(err);
                } else {
                    if(category !== null){
                        reject(`Category '${category.name}' already exist`);
                    } else {
                        ExpenseCategoryModel.create(expenseObject,(err,result)=>{
                            if(err){
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        })
                    }

                }
            });
        })
    }

    addExpense(expenseObject){
        return new Promise((resolve,reject)=>{
            ExpenseModel.create(expenseObject, (err,result)=>{
                if(err){
                    reject(err);
                } else {
                resolve(result);
                }
            })
        })
    }
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
    totalMessExpenseMonthly(mess,date){
        return new Promise((resolve,reject)=>{
            ExpenseModel.find({messName: mess},{
                where:{

                }
            }, (err, data)=>{
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