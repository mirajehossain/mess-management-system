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
    totalMeal(){};
    currentMeal(){};
    userMeal(){};
    mealRate(){};



}


module.exports = MealLib;