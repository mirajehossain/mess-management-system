const BalanceLib = require('../balance/balance.lib');
const MealLib = require('../meal/meal.lib');
const ExpenseLib = require('../expense/expense.lib');

class MessLib {
    static async userSummary(currentMonthFirstDate, currentMonthLastDate, userId, messId) {
        try {
            const totalSavings = await BalanceLib.userMealBalance(currentMonthFirstDate, currentMonthLastDate, userId, messId);
            const meal = await MealLib.userWiseMeal(currentMonthFirstDate, currentMonthLastDate, userId);
            const mealRate = await MealLib.mealRateInMonth(currentMonthFirstDate, currentMonthLastDate, messId);
            const totalExpense = mealRate * meal.meals;
            const balanceStatus = totalSavings.total - (mealRate * meal.meals);
            return {
                totalSavings: totalSavings.total,
                totalExpense: totalExpense.toFixed(2),
                balanceStatus: balanceStatus.toFixed(2),
                meals: meal.meals,
            };
        } catch (e) {
            throw e;
        }
    }

    static async messSummary(currentMonthFirstDate, currentMonthLastDate, messId) {
        try {
            const totalSavings = await BalanceLib.totalMealBalance(currentMonthFirstDate, currentMonthLastDate, messId);
            const totalExpense = await ExpenseLib.totalMealExpense(currentMonthFirstDate, currentMonthLastDate, messId);
            const totalMeals = await MealLib.totalMealInMonth(currentMonthFirstDate, currentMonthLastDate, messId);
            const mealRate = await MealLib.mealRateInMonth(currentMonthFirstDate, currentMonthLastDate, messId);
            const balanceStatus = totalSavings.total - totalExpense.total;
            return {
                totalSavings: totalSavings.total,
                totalExpense: totalExpense.total,
                balanceStatus: balanceStatus.toFixed(2),
                totalMeals: totalMeals.meals,
                mealRate: mealRate.toFixed(2),
            };
        } catch (e) {
            throw e;
        }
    }
}
module.exports = MessLib;
