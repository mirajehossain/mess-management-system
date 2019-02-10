const UserModel = require('../user/user.model');

const CategoryModel = require('../category/category.model');

const BalanceModel = require('./balance.model');

const ExpenseLib= require('../expense/expense.lib');
// const ExpenseLib= new expenseLib();
class BalanceLib {
	constructor(){};

	static async addBalance(balanceObject){
		try {
			const balance = await BalanceModel.create(balanceObject);
			return {success: true, message: `You are add ${balance.amount} amount on your balance`, data: balance}
		} catch (e) {
			throw e;
		}
	};
	static async userTotalBalance(currentMonthFirstDate, currentMonthLastDate, id){
		try {
			const data = await BalanceModel.find({
				userId: id,
				date: {$gte:  currentMonthFirstDate, $lte:  currentMonthLastDate}
			});

			if(data.length){
				let balanceDetails = await Promise.all(data.map(async (item)=>{
					let cat = await CategoryModel.findById(item.categoryId);
					let usr = await UserModel.findById(item.userId);
					return {
						category:cat.name,
						username:usr.messusername,
						...item.toObject()
					};
				}));

				let balanceArr = data.map((item)=>item.amount);
				const total = balanceArr.reduce((sum, balance)=>sum + balance);
				return {data: balanceDetails, total}
			} else
				return {data: null, total: 0}
		} catch (e) {
			throw e;
		}
	};
	static async userMealBalance(currentMonthFirstDate, currentMonthLastDate, id,messId){
		try {
			const category = await CategoryModel.findOne({
				$and :[{isMeal : 1},{messId: messId}]
			});
			const data = await BalanceModel.find({
				userId: id,
				categoryId: category._id,
				date: {$gte:  currentMonthFirstDate, $lte:  currentMonthLastDate}
			});

			if(data.length){
				let balanceDetails = await Promise.all(data.map(async (item)=>{
					let cat = await CategoryModel.findById(item.categoryId);
					let usr = await UserModel.findById(item.userId);
					return {
						category:cat.name,
						username:usr.username,
						...item.toObject()
					};
				}));

				let balanceArr = data.map((item)=>item.amount);
				const total = balanceArr.reduce((sum, balance)=>sum + balance);
				return {data: balanceDetails, total: total}
			} else
				return {data: null, total: 0}
		} catch (e) {
			throw e;
		}
	};
	static async totalMessBalance(currentMonthFirstDate,currentMonthLastDate ,messId){
		try {
			const data = await BalanceModel.find({
				messId: messId,
				date: {
					$gte:  currentMonthFirstDate,
					$lte:  currentMonthLastDate,
				}
			});
			if(data.length){

				let balanceDetails = await Promise.all(data.map(async (item)=>{
					let cat = await CategoryModel.findById(item.categoryId);
					let usr = await UserModel.findById(item.userId);
					return {
						category: cat.name,
						username:usr.username,
						...item.toObject()
					};
				}));

				let balanceArr = data.map((item)=>item.amount);
				let total = balanceArr.reduce((sum, balance)=>sum + balance);
				return {
					data:balanceDetails,
					total: total
				}
			} else {
				return {data: null, total: 0};
			}
		} catch (e) {
			throw e;
		}
	};
	static async totalMealBalance(currentMonthFirstDate,currentMonthLastDate, messId){
		try {
			const category = await CategoryModel.findOne({
				$and :[{isMeal : 1},{messId: messId}]
			});
			const data = await BalanceModel.find({
				categoryId: category._id,
				messId: messId,
				date: {$gte:  currentMonthFirstDate, $lte:  currentMonthLastDate}
			});
			if(data.length){

				let balanceDetails = await Promise.all(data.map(async (item)=>{
					let cat = await CategoryModel.findById(item.categoryId);
					let usr = await UserModel.findById(item.userId);
					return {
						category:cat.name,
						username:usr.username,
						...item.toObject()
					};
				}));

				let balanceArr = data.map((item)=>item.amount);
				let total = balanceArr.reduce((sum, balance)=>sum + balance);
				return {data:balanceDetails, total: total}
			} else {
				return {data: null, total: 0};
			}
		} catch (e) {
			throw e;
		}
	};
	static async categoryWiseBalance(currentMonthFirstDate, currentMonthLastDate,categoryId){
		try {
			const data = await BalanceModel.find({
				categoryId: categoryId,
				date: {$gte:  currentMonthFirstDate, $lte:  currentMonthLastDate}
			});
			if(data.length) {
				let balanceDetails = await Promise.all(data.map(async (item)=>{
					let cat = await CategoryModel.findById(item.categoryId);
					let usr = await UserModel.findById(item.userId);
					return {
						category:cat.name,
						username:usr.username,
						...item.toObject()
					};
				}));

				let BalanceArr = data.map((item)=> item.amount);
				console.log(BalanceArr);
				let total = BalanceArr.reduce((sum, balance)=>sum + balance);
				return {data: balanceDetails, total:total}
			} else {
				return {data: null, total: 0}
			}
		} catch (e) {
			throw e;
		}
	}
	static async currentAvailableBalance(currentMonthFirstDate, currentMonthLastDate, messId){
		try {
			return await Promise.all(
				[
					this.totalMessBalance(currentMonthFirstDate, currentMonthLastDate, messId),
					ExpenseLib.totalMessExpense(currentMonthFirstDate, currentMonthLastDate, messId)
				]).then(result=>{
				return result[0].total- result[1].total;
			});
		} catch (e) {
			throw e;
		}
	};
	static async updateBalance(balanceId, updateObj){
		try {
			return await BalanceModel.findByIdAndUpdate({_id: balanceId},updateObj,{new:true});
		} catch (e) {
			throw e;
		}
	}
	static async deleteBalance(balanceId){
		try {
			return await BalanceModel.findByIdAndRemove(balanceId);
		} catch (e) {
			throw e;
		}
	}

}



module.exports = BalanceLib;