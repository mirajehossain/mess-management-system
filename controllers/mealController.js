let response = require('../helper/response');
const MealLib = require('../lib/meal.lib');
class MealController extends MealLib{
    constructor(){
        super();
    };

    addMeal(req,res){
        let mealObject = req.body;
        mealObject.userId = req.auth.id;
        mealObject.messName = req.auth.messusername;
        mealObject.date = req.body.date || new Date();

        super.addMeal(mealObject).then(result=>{
            return res.json(response.single(true, 'Meal added', result));
        }).catch(err=>{
            return res.json(response.error(false, 'An error occur', err));
        })
    }

    updateMeal(req,res){}

    totalMeal(req,res){}

    userWiseMeal(req,res){}

}

module.exports = MealController;