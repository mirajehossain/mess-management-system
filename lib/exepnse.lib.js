const ExpenseModel = require('../models/expenseModel');
const CategoryModel = require('../models/categoryModel');
class ExpenseLib {
    constructor(){};


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
    totalExpenseInMonth(currentMonthFirstDate,currentMonthLastDate,mess){
        return new Promise((resolve,reject)=>{
            ExpenseModel.find(    {
                    messName: mess,
                    date: {
                        $gte:  currentMonthFirstDate,
                        $lte:  currentMonthLastDate,
                    }
                },
                (err, data)=>{
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