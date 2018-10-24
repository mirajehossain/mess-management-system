let response = require('../helper/response');
const MealLib = require('../lib/meal.lib');
class MealController extends MealLib{
    constructor(){
        super();
    };

    addMeal(req,res){
        let mealObject = req.body;
        let date = new Date(req.body.date).toISOString();
        console.log(date)
        mealObject.messName = req.auth.messusername;
        mealObject.date = date;  /// date formate "10/22/2018"

        super.addMeal(mealObject).then(result=>{
            return res.json(response.single(true, 'Meal added', result));
        }).catch(err=>{
            return res.json(response.error(false, 'An error occur', err));
        })
    }

    updateMeal(req,res){
        let mealId = req.params.mealId;
        let updateObj = req.body;
        super.updateMeal(mealId, updateObj).then(result=>{
            return res.json(response.single(true, 'Meal updated successfully', result));
        }).catch(err=>{
            return res.json(response.error(false, 'An error occur', err));
        })
    }

    totalMeal(req,res){}

    userWiseMeal(req,res){
        let userId = req.params.userId;
        super.userWiseMeal(userId).then(result=>{
            return res.json(response.single(true, 'Your total Meals', result));
        }).catch(err=>{
            return res.json(response.error(false, 'An error occur', err));
        })
    }

    currentMessMeal(req,res){
        let messName = req.auth.messusername;
        super.currentMessMeal(messName).then(result=>{
            return res.json(response.single(true, 'Current Mess Meals', result));
        }).catch(err=>{
            return res.json(response.error(false, 'An error occur', err));
        })
    }

    mealRate(req,res){
        let messName = req.auth.messusername;
        super.mealRate(messName).then(result=>{
            return res.json(response.single(true, 'Meal rate', result));
        }).catch(err=>{
            return res.json(response.error(false, 'An error occur', err));
        })
    }

}

module.exports = MealController;