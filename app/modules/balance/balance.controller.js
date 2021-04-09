const response = require('../../../helper/response');
const BalanceLib = require('./balance.lib');

const date = new Date(); const y = date.getFullYear();
const m = date.getMonth();
const currentMonthFirstDate = new Date(y, m, 1).toISOString();
const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();


class BalanceController {
    static async addBalance(req, res) {
        try {
            const balanceObject = req.body;
            const balanceDate = new Date(req.body.date).toISOString();
            balanceObject.messId = req.auth.messId;
            balanceObject.date = balanceDate; // / date format "10/22/2018"

            const balance = await BalanceLib.addBalance(balanceObject);
            res.status(201).json(response.single(true, balance.message, balance.data));
        } catch (e) {
            res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async userTotalBalance(req, res) {
        try {
            const balance = await BalanceLib
                .userTotalBalance(currentMonthFirstDate, currentMonthLastDate, req.auth.id);
            return res.status(200).json(response.single(true, `Total Balance is ${balance.total}`, balance.data));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async userMealBalance(req, res) {
        try {
            const balance = await BalanceLib
                .userMealBalance(currentMonthFirstDate, currentMonthLastDate, req.auth.id, req.auth.messId);
            return res.status(200).json(response.single(true, `Total meal Balance is ${balance.total}`, balance.data));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async totalMessBalance(req, res) {
        try {
            const balance = await BalanceLib
                .totalMessBalance(currentMonthFirstDate, currentMonthLastDate, req.auth.messId);
            return res.status(200).json(response.single(true, `Total Mess Balance is ${balance.total}`, balance.data));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async categoryWiseBalance(req, res) {
        try {
            const { categoryId } = req.params;

            const balance = await BalanceLib
                .categoryWiseBalance(currentMonthFirstDate, currentMonthLastDate, categoryId);
            return res.status(200).json(response.single(true, `Balance amount of the categories is: ${balance.total} `, balance.data));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async currentAvailableBalance(req, res) {
        try {
            const { messId } = req.auth;
            const balance = await BalanceLib
                .currentAvailableBalance(currentMonthFirstDate, currentMonthLastDate, messId);
            return res.status(200).json(response.single(true, `Current available balance of the Mess is: ${balance} `, balance));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async updateBalance(req, res) {
        try {
            const { body } = req; // / categoryId, amount
            const balance = await BalanceLib.updateBalance(req.params.balanceId, body);
            return res.status(200).json(response.single(true, `Your updated balance is : ${balance.amount} `, balance));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async deleteBalance(req, res) {
        try {
            await BalanceLib.deleteBalance(req.params.balanceId);
            return res.status(200).json(response.single(true, 'Delete balance successfully'));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }
}

module.exports = BalanceController;
