const MealModel = require('../models/mealModel');
const expenseLib = require('../lib/exepnse.lib');
const ExpenseLib =new expenseLib();
class MealLib {
    constructor(){};

    addMeal(mealObject){
        return new Promise((resolve,reject)=>{
            MealModel.create(mealObject, (err,meal)=>{
                if(err){
                    reject(err)
                } else {
                    resolve(meal);
                }
            })
        })

    }
    updateMeal(mealId, updateObj){
        return new Promise((resolve,reject)=> {
            MealModel.findByIdAndUpdate({_id: mealId},updateObj,{new:true}, (err, meal) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(meal);
                }
            })
        })
    }
    totalMealInMonth(currentMonthFirstDate, currentMonthLastDate,messName){
        return new Promise((resolve,reject)=>{

            console.log(currentMonthFirstDate)
            console.log(currentMonthLastDate)
            MealModel.find(
                {
                    messName: messName,
                    date: {
                        $gte: currentMonthFirstDate,
                        $lte: currentMonthLastDate,
                    }
                }
                ,(err,data)=>{
                if(err){
                    reject(err);
                } else {
                    let MealArr = data.map((item)=>{
                        return item.numberOfMeal;
                    });
                    console.log(MealArr);
                    if(MealArr.length){
                        let result =  MealArr.reduce((sum, meal)=>{
                            return sum + meal;
                        });
                        resolve({meals:result});
                    } else {
                        resolve('No Meals in This month');
                    }
                }
            })
        })
    };


    totalMeal(currentMonth, currentDate,messName){
        return new Promise((resolve,reject)=>{
            MealModel.find(
                {
                    messName: messName,
                    date: {
                        $gte:  currentMonth,
                        $lte:  currentDate,
                    }
                }
                ,(err,data)=>{
                if(err){
                    reject(err);
                } else {
                    let MealArr = data.map((item)=>{
                        return item.numberOfMeal;
                    });
                    console.log(MealArr);
                    if(MealArr.length){
                        let result =  MealArr.reduce((sum, meal)=>{
                            return sum + meal;
                        });
                        resolve({meals:result});
                    } else {
                        resolve('No expense in the mess');
                    }
                }
            })
        })
    };


    currentMeal(currentMonth, currentDate,messName){
        return new Promise((resolve,reject)=>{
            MealModel.find(
                {
                    messName: messName,
                    date: {
                        $gte:  currentMonth,
                        $lte:  currentDate,
                    }
                }
                ,(err,data)=>{
                if(err){
                    reject(err);
                } else {
                    let MealArr = data.map((item)=>{
                        return item.numberOfMeal;
                    });
                    console.log(MealArr);
                    if(MealArr.length){
                        let result =  MealArr.reduce((sum, meal)=>{
                            return sum + meal;
                        });
                        resolve({meals:result});
                    } else {
                        resolve('No expense in the mess');
                    }
                }
            })
        })
    };

    userWiseMeal(userId){
        return new Promise((resolve,reject)=>{
            MealModel.find({userId:userId},(err,meal)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(meal);
                }
            })
        })
    };
    currentMessMeal(messName){
        return new Promise((resolve,reject)=>{
            MealModel.find({messName:messName},(err,meal)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(meal);
                }
            })
        })
    };

    mealRateInMonth(currentMonthFirstDate,currentMonthLastDate,messName){
        let m = new MealLib();
        return  Promise.all(
            [
                ExpenseLib.totalExpenseInMonth(currentMonthFirstDate,currentMonthLastDate,messName),
                m.totalMealInMonth(currentMonthFirstDate,currentMonthLastDate,messName)
            ]).then(result=>{
            return result[0]/ result[1].meals;
        });
    };


    mealRate(messName){
        let m = new MealLib();
        return  Promise.all(
            [
                ExpenseLib.totalMessExpense(messName),
                m.totalMeal(messName)
            ]).then(result=>{
            return result[0]/ result[1];
        });
    };



}


module.exports = MealLib;