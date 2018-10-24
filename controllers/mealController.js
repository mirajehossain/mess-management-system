let response = require('../helper/response');
const MealLib = require('../lib/meal.lib');
class MealController extends MealLib{
    constructor(){
        super();
    };

    addMeal(req,res){
        let mealObject = req.body;
        let date = new Date(req.body.date).toISOString();
        console.log(date);
        mealObject.messName = req.auth.messusername;
        mealObject.date = date;  /// date formate "10/22/2018"

        super.addMeal(mealObject).then(result=>{
            return res.status(200).json(response.single(true, 'Meal added', result));
        }).catch(err=>{
            return res.status(400).json(response.error(false, 'An error occur', err));
        })
    }

    updateMeal(req,res){
        let mealId = req.params.mealId;
        let updateObj = req.body;
        super.updateMeal(mealId, updateObj).then(result=>{
            return res.status(200).json(response.single(true, 'Meal updated successfully', result));
        }).catch(err=>{
            return res.status(400).json(response.error(false, 'An error occur', err));
        })
    }

    totalMealInMonth(req,res){
        let messName = req.auth.messusername;
        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const currentMonthFirstDate = new Date(y, m, 1).toISOString();
        const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();


        super.totalMealInMonth(currentMonthFirstDate, currentMonthLastDate, messName).then(result=>{
            return res.status(200).json(response.single(true, 'Total Meals', result));
        }).catch(err=>{
            return res.status(400).json(response.error(false, 'An error occur', err));
        })
    }

    totalMeal(req,res){
        let messName = req.auth.messusername;
        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const currentMonthFirstDate = new Date(y, m, 1).toISOString();
        const currentDate = new Date().toISOString();


        super.totalMeal(currentMonthFirstDate, currentDate, messName).then(result=>{
            return res.status(200).json(response.single(true, 'Total Meals', result));
        }).catch(err=>{
            return res.status(400).json(response.error(false, 'An error occur', err));
        })
    }

    currentMeal(req,res){
        let messName = req.auth.messusername;
        const month = new Date().getMonth()+1;
        const year = new Date().getFullYear();
        const currentMonthDate = new Date(`${month},1, ${year}`);
        currentMonthDate.toISOString();
        const currentDate = new Date().toISOString();
        super.currentMeal(currentMonthDate, currentDate, messName).then(result=>{
            return res.status(200).json(response.single(true, 'Total Meals', result));
        }).catch(err=>{
            return res.status(400).json(response.error(false, 'An error occur', err));
        })
    }

    userWiseMeal(req,res){
        let userId = req.params.userId;
        super.userWiseMeal(userId).then(result=>{
            return res.status(200).json(response.single(true, 'Your total Meals', result));
        }).catch(err=>{
            return res.status(400).json(response.error(false, 'An error occur', err));
        })
    }

    currentMessMeal(req,res){
        let messName = req.auth.messusername;
        super.currentMessMeal(messName).then(result=>{
            return res.status(200).json(response.single(true, 'Current Mess Meals', result));
        }).catch(err=>{
            return res.status(400).json(response.error(false, 'An error occur', err));
        })
    }

    mealRateInMonth(req,res){
        let messName = req.auth.messusername;
        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const currentMonthFirstDate = new Date(y, m, 1).toISOString();
        const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();

        super.mealRateInMonth(currentMonthFirstDate,currentMonthLastDate,messName).then(result=>{
            return res.status(200).json(response.single(true, 'Meal rate', result));
        }).catch(err=>{
            return res.status(400).json(response.error(false, 'An error occur', err));
        })
    }
    mealRate(req,res){
        let messName = req.auth.messusername;

        super.mealRate(messName).then(result=>{
            return res.status(200).json(response.single(true, 'Meal rate', result));
        }).catch(err=>{
            return res.status(400).json(response.error(false, 'An error occur', err));
        })
    }

}

module.exports = MealController;