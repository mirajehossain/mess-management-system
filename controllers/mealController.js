let response = require('../helper/response');
const MealModel = require('../models/mealModel');
class MealController {
    constructor(){};

    addMeal(req,res){
        let mealObject = req.body;
            mealObject.userId = req.auth.id;
            mealObject.messName = req.auth.messusername;
            mealObject.date = req.body.date || new Date();

            MealModel.create(mealObject, (err,meal)=>{
                if(err){
                    return res.json(response.error(false, 'An error occur',err))
                } else {
                    return res.json(response.single(true, 'Meal added',meal))
                }
            })
    }

    updateMeal(req,res){}

    totalMeal(req,res){}

    userWiseMeal(req,res){}

}

module.exports = new MealController();