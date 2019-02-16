let response = require('../../../helper/response');
const MessLib = require('./mess.lib');

class MessController  {
	constructor(){};

	static async userSummary(req,res) {
		try {
			let userId = req.params.userId;
			let messId = req.auth.messId;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = new Date(y, m, 1).toISOString();
			const currentMonthLastDate = new Date(y, m + 1, 0).toISOString();
			const summary = await MessLib.userSummary(currentMonthFirstDate, currentMonthLastDate, userId, messId);
			return res.status(200).json(response.single(true, `User Summary `, summary));
		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
	};
	static async messSummary(req,res){
		try {
			let firstDate = req.body.firstDate;
			let lastDate = req.body.lastDate;
			const messId = req.auth.messId;
			const date = new Date(), y = date.getFullYear(), m = date.getMonth();
			const currentMonthFirstDate = firstDate || new Date(y, m, 1).toISOString();
			const currentMonthLastDate = lastDate || new Date(y, m + 1, 0).toISOString();
			const summary = await MessLib.messSummary(currentMonthFirstDate, currentMonthLastDate, messId);
			return res.status(200).json(response.single(true, `Mess Summary `, summary));

		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",`${e}`));
		}
	};

}

module.exports = MessController;