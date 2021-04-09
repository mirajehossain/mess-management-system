const response = require('../../../helper/response');
const MealLib = require('./meal.lib');

const date = new Date(); const y = date.getFullYear();
const m = date.getMonth();
const currentMonthFirstDate = new Date(y, m, 1).toISOString();
const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();

class MealController {
    static async addMeal(req, res) {
        try {
            const mealObject = req.body;
            mealObject.messId = req.auth.messId;
            mealObject.date = new Date(req.body.date).toISOString();// / date formate "10/22/2018"

            const result = await MealLib.addMeal(mealObject);
            return res.status(200).json(response.single(true, 'Meal added', result));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async updateMeal(req, res) {
        try {
            const { mealId } = req.params;
            const updateObj = req.body;
            const result = await MealLib.updateMeal(mealId, updateObj);
            return res.status(200).json(response.single(true, 'Meal updated successfully', result));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async deleteMeal(req, res) {
        try {
            const { mealId } = req.params;
            await MealLib.deleteMeal(mealId);
            return res.status(200).json(response.single(true, 'Meal Delete successfully'));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async totalMealInMonth(req, res) {
        try {
            const { messId } = req.auth;
            const result = await MealLib
                .totalMealInMonth(currentMonthFirstDate, currentMonthLastDate, messId);
            return res.status(200).json(response.single(true, `Total Meals ${result.meals}`, result.data));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async currentMeal(req, res) {
        try {
            const { messId } = req.auth;
            const result = await MealLib.currentMeal(currentMonthFirstDate, currentMonthLastDate, messId);
            return res.status(200).json(response.single(true, `Total Meals ${result.meals}`, result.data));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async userWiseMeal(req, res) {
        try {
            const { userId } = req.params;
            const result = await MealLib
                .userWiseMeal(currentMonthFirstDate, currentMonthLastDate, userId);
            return res.status(200).json(response.single(true, `Your total Meal is ${result.meals}`, result));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async mealRateInMonth(req, res) {
        try {
            const { messId } = req.auth;
            const result = await MealLib
                .mealRateInMonth(currentMonthFirstDate, currentMonthLastDate, messId);
            return res.status(200).json(response.single(true, 'Meal rate', `${result}`));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async mealRate(req, res) {
        try {
            const messName = req.auth.messusername;
            const result = await MealLib.mealRate(messName);
            return res.status(200).json(response.single(true, 'Meal rate', result));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }
}

module.exports = MealController;
