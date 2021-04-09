const response = require('../../../helper/response');
const MessLib = require('./mess.lib');

const date = new Date(); const y = date.getFullYear(); const
    m = date.getMonth();
const currentMonthFirstDate = new Date(y, m, 1).toISOString();
const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();

class MessController {
    static async userSummary(req, res) {
        try {
            const summary = await MessLib.userSummary(currentMonthFirstDate, currentMonthLastDate, req.params.userId, req.auth.messId);
            return res.status(200).json(response.single(true, 'User Summary ', summary));
        } catch (e) {
            return res.status(400).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async messSummary(req, res) {
        try {
            const summary = await MessLib.messSummary(req.body.firstDate, req.body.lastDate, req.auth.messId);
            return res.status(200).json(response.single(true, 'Mess Summary ', summary));
        } catch (e) {
            return res.status(400).json(response.error(false, 'An error occur', `${e}`));
        }
    }
}

module.exports = MessController;
