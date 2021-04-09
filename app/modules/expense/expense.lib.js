const ExpenseModel = require('./expense.model');
const CategoryModel = require('../category/category.model');
const UserModel = require('../user/user.model');


async function ExpenseDetails(data) {
    const expenseDetails = await Promise.all(data.map(async (item) => {
        const cat = await CategoryModel.findById(item.categoryId);
        const usr = await UserModel.findById(item.userId);
        return {
            category: cat.name,
            username: usr.username,
            ...item.toObject(),
        };
    }));

    const ExpenseArr = data.map(item => item.amount);
    const total = ExpenseArr.reduce((sum, expense) => sum + expense);
    return {
        data: expenseDetails,
        total,
    };
}

class ExpenseLib {
    static async addExpense(expenseObject) {
        try {
            return await ExpenseModel.create(expenseObject);
        } catch (e) {
            throw e;
        }
    }

    static async totalMessExpense(currentMonthFirstDate, currentMonthLastDate, messId) {
        try {
            const data = await ExpenseModel.find({
                messId,
                date: {
                    $gte: currentMonthFirstDate,
                    $lte: currentMonthLastDate,
                },
            });
            if (data.length) {
                return await ExpenseDetails(data);
            }
            return { data: 0, total: 0 };
        } catch (e) {
            throw e;
        }
    }

    static async totalMealExpense(currentMonthFirstDate, currentMonthLastDate, messId) {
        try {
            const category = await CategoryModel.findOne({
                $and: [{ isMeal: 1 }, { messId }],
            });
            const data = await ExpenseModel.find({
                categoryId: category._id,
                messId,
                date: {
                    $gte: currentMonthFirstDate,
                    $lte: currentMonthLastDate,
                },
            });
            if (data.length) {
                return await ExpenseDetails(data);
            }
            return { data: 0, total: 0 };
        } catch (e) {
            throw e;
        }
    }

    static async categoryWiseExpense(currentMonthFirstDate, currentMonthLastDate, categoryId) {
        try {
            const data = await ExpenseModel.find({
                categoryId,
                date: {
                    $gte: currentMonthFirstDate,
                    $lte: currentMonthLastDate,
                },
            });

            if (data.length) {
                return await ExpenseDetails(data);
            }
            return { data: 0, total: 0 };
        } catch (e) {
            throw e;
        }
    }

    static async updateExpense(expenseId, updateObj) {
        try {
            return await ExpenseModel.findByIdAndUpdate({ _id: expenseId }, updateObj, { new: true });
        } catch (e) {
            throw e;
        }
    }

    static async deleteExpense(expenseId) {
        try {
            return await ExpenseModel.findByIdAndRemove(expenseId);
        } catch (e) {
            throw e;
        }
    }
}


module.exports = ExpenseLib;
