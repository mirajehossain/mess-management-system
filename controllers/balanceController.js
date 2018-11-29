let response = require('../helper/response');
let BalanceLib = require('../lib/balance.lib');

class BalanceController extends BalanceLib{
	constructor(){
		super();
	};
	async addCategory(req,res){
		try {
			let categoryObject = req.body;
			categoryObject.messName = req.auth.messusername;
			const category = await super.addCategory(categoryObject);
			if(category instanceof Error)
				return res.status(409).json(response.error(false,`${category}`,`${category}`));
			else
				return res.status(201).json(response.single(true, `	New Balance category added `, data));

		} catch (e) {
			return res.status(400).json(response.error(false,'An error occur', e))
		}
	};

	async addBalance(req,res){
		try {
			console.log(req.auth.id);
			let balanceObject = req.body;
			let date = new Date(req.body.date).toISOString();

			balanceObject.userId = req.auth.id;
			balanceObject.messName = req.auth.messusername;
			balanceObject.date = date || new Date().toISOString(); /// date format "10/22/2018"

			const balance = await super.addBalance(balanceObject);
				return res.status(201).json(response.single(true,`You are add ${balance.amount} amount on your balance`, balance));
		} catch (e) {
			return res.status(400).json(response.error(false,'An error occur', e))
		}
	};

	async totalUserBalance(req,res) {
		try {
			const balance = await super.totalUserBalance(req.auth.id);
			if(balance instanceof Error)
				return res.status(400).json(response.error(false,`${balance}`, `${balance}`));
			else
				return res.status(200).json(response.single(true,'Total Balance is '+ balance, balance));
		} catch (e) {
			return res.status(400).json(response.error(false,'An error occur', e))
		}
	}

	async totalMessBalance(req,res){
		try {
			const balance = await super.totalMessBalance(req.auth.messusername);
			if(balance instanceof Error)
				return res.status(400).json(response.error(false,`${balance}`, `${balance}`));
			else
				return res.status(200).json(response.single(true,'Total Mess Balance is '+ balance, balance));
		} catch (e) {
			return res.status(400).json(response.error(false,'An error occur', e));
		}
	};

	async categoryWiseBalance(req,res){
		try {
			let balanceCatId = req.params.balanceCatId;
			const balance = await super.categoryWiseBalance(balanceCatId);
			if(balance instanceof Error)
				return res.status(400).json(response.error(false,`${balance}`, `${balance}`));
			else
				return res.status(200).json(response.single(true, `Balance amount of the categories is: ${balance} `, balance));

		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",e));
		}

	};
	async currentBalance(req,res){
		try {
			const messName = req.auth.messusername;
			const balance = await super.currentBalance(messName);
			if(balance instanceof Error)
				return res.status(400).json(response.error(false,`${balance}`, `${balance}`));
			else
				return res.status(200).json(response.single(true, `Current Balance amount of the Mess is: ${balance} `, balance));

		} catch (e) {
			return res.status(400).json(response.error(false,"An error occur",e));

		}
	};
}

module.exports = BalanceController;