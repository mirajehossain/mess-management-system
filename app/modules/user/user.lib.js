const bcrypt = require('bcryptjs');

const saltRounds = 10;

const BalanceModule = require('../balance/index');

const { BalanceModel } = BalanceModule;
const ExpenseModel = require('../expense/expense.model');
const MealModel = require('../meal/meal.model');
const UserModel = require('./user.model');

class UserLib {
    static async getProfile(id) {
        try {
            return await UserModel.findById(id, { password: 0 });
        } catch (e) {
            throw e;
        }
    }

    static async updateProfile(id, updateObject) {
        try {
            return await UserModel.findByIdAndUpdate(id, updateObject, { new: true });
        } catch (e) {
            throw e;
        }
    }

    static async changPassword(id, oldPassword, newPassword) {
        try {
            const user = await UserModel.findOne({ _id: id });
            if (user) {
                const isMatched = await bcrypt.compare(oldPassword, user.password);
                if (isMatched) {
                    const hashed = bcrypt.hashSync(newPassword, saltRounds);
                    return {
                        success: true,
                        data: await UserModel.findOneAndUpdate({ _id: id }, { $set: { password: hashed } }, { new: true }),
                    };
                }
                return {
                    success: false,
                    message: 'Password not matched',
                };
            }
            return {
                success: false,
                message: 'User not found',
            };
        } catch (e) {
            throw e;
        }
    }

    static async getUsers(messId) {
        try {
            return await UserModel.find({ messId }, { password: 0 });
        } catch (e) {
            throw e;
        }
    }

    static async removeUser(userId) {
        try {
            await UserModel.findByIdAndRemove(userId);
            await BalanceModel.deleteMany({ userId });
            await ExpenseModel.deleteMany({ userId });
            await MealModel.deleteMany({ userId });
            return true;
        } catch (e) {
            throw e;
        }
    }

    static async addUser(user) {
        try {
            user.password = await bcrypt.hashSync(user.password, saltRounds);
            user.role = 'user'; // / admin, user
            const found = await UserModel.findOne({ email: user.email });
            if (found) {
                return {
                    success: false,
                    message: 'Email already exist',
                };
            }
            return {
                success: true,
                data: await UserModel.create(user),
            };
        } catch (e) {
            throw e;
        }
    }
}
module.exports = UserLib;
