const MealModel = require('../models/mealModel');

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
    totalMeal(){};

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

    mealRate(){};



}


module.exports = MealLib;