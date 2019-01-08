const UserModule = require('../user/index');
const UserModel = UserModule.UserModel;

const CategoryModule = require('../category/index');
const CategoryModel = CategoryModule.CategoryModel;

const BalanceModel = require('./balance.model');

const expenseLib= require('../expense/expense.lib');
const ExpenseLib= new expenseLib();
class BalanceLib {
	constructor(){};

	async addBalance(balanceObject){
		try {
			return await BalanceModel.create(balanceObject);
		} catch (e) {
			return e;
		}
	};
	async userTotalBalance(currentMonthFirstDate, currentMonthLastDate, id){
		try {
			const data = await BalanceModel.find({
				userId: id,
				date: {
					$gte:  currentMonthFirstDate,
					$lte:  currentMonthLastDate,
				}
			});

			if(data.length){
				let balanceDetails = await Promise.all(data.map(async (item)=>{
					let cat = await CategoryModel.findById(item.categoryId);
					let usr = await UserModel.findById(item.userId);
					let ob = {
						category:'',
						username:'',
						...item._doc
					};
					ob.category = cat.name;
					ob.username = usr.username;
					// ob.date = item._doc.date.toLocaleDateString();
					return ob;
				}));

				let balanceArr = data.map((item)=>item.amount);
				const total = balanceArr.reduce((sum, balance)=>sum + balance);
				return {
					data: balanceDetails,
					total: total,
				}
			} else
				return {
					data: null,
					total: 0
				}
		} catch (e) {
			return e;
		}
	};

	async userMealBalance(currentMonthFirstDate, currentMonthLastDate, id,messId){
		try {
			const category = await CategoryModel.findOne({
				$and :[{isMeal : 1},{messId: messId}]
			});
			const data = await BalanceModel.find({
				userId: id,
				categoryId: category._id,
				date: {
					$gte:  currentMonthFirstDate,
					$lte:  currentMonthLastDate,
				}
			});

			if(data.length){
				let balanceDetails = await Promise.all(data.map(async (item)=>{
					let cat = await CategoryModel.findById(item.categoryId);
					let usr = await UserModel.findById(item.userId);
					let ob = {
						category:'',
						username:'',
						...item._doc
					};
					ob.category = cat.name;
					ob.username = usr.username;
					return ob;
				}));

				let balanceArr = data.map((item)=>item.amount);
				const total = balanceArr.reduce((sum, balance)=>sum + balance);
				return {
					data: balanceDetails,
					total: total,
				}
			} else
				return {
					data: null,
					total: 0
				}
		} catch (e) {
			return e;
		}
	};

	async totalMessBalance(currentMonthFirstDate,currentMonthLastDate ,messId){
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
					let ob = {
						category:'',
						username:'',
						...item._doc
					};
					ob.category = cat.name;
					ob.username = usr.username;
					// ob.date = item._doc.date.toLocaleDateString();
					return ob;
				}));

				let balanceArr = data.map((item)=>item.amount);
				let total = balanceArr.reduce((sum, balance)=>sum + balance);
				return {
					data:balanceDetails,
					total: total
				}
			} else {
				throw new Error('No balance available in the mess.');
			}
		} catch (e) {
			return e;
		}
	};

	async totalMealBalance(currentMonthFirstDate,currentMonthLastDate, messId){
		try {
			const category = await CategoryModel.findOne({
				$and :[{isMeal : 1},{messId: messId}]
			});
			const data = await BalanceModel.find({
				categoryId: category._id,
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
					let ob = {
						category:'',
						username:'',
						...item._doc
					};
					ob.category = cat.name;
					ob.username = usr.username;
					// ob.date = item._doc.date.toLocaleDateString();
					return ob;
				}));

				let balanceArr = data.map((item)=>item.amount);
				let total = balanceArr.reduce((sum, balance)=>sum + balance);
				return {
					data:balanceDetails,
					total: total
				}
			} else {
				return {
					data: null,
					total: 0
				};
			}
		} catch (e) {
			return e;
		}
	};


	async categoryWiseBalance(currentMonthFirstDate, currentMonthLastDate,categoryId){
		try {
			const data = await BalanceModel.find({
				categoryId: categoryId,
				date: {
					$gte:  currentMonthFirstDate,
					$lte:  currentMonthLastDate,
				}
			});
			if(data.length) {
				let balanceDetails = await Promise.all(data.map(async (item)=>{
					let cat = await CategoryModel.findById(item.categoryId);
					let usr = await UserModel.findById(item.userId);
					let ob = {
						category:'',
						username:'',
						...item._doc
					};
					ob.category = cat.name;
					ob.username = usr.username;
					// ob.date = item._doc.date.toLocaleDateString();
					return ob;
				}));

				let BalanceArr = data.map((item)=> item.amount);
				console.log(BalanceArr);
				let total = BalanceArr.reduce((sum, balance)=>sum + balance);
				return {
					data: balanceDetails,
					total:total
				}
			} else {
				return {
					data: null,
					total: 0
				}
			}
		} catch (e) {
			return e;
		}
	}

	async currentAvailableBalance(currentMonthFirstDate, currentMonthLastDate, messId){
		try {
			let b = new BalanceLib();
			return await Promise.all(
				[
					b.totalMessBalance(currentMonthFirstDate, currentMonthLastDate, messId),
					ExpenseLib.totalMessExpense(currentMonthFirstDate, currentMonthLastDate, messId)
				]).then(result=>{
				if(result[0] instanceof Error){
					return result[0];
				}
				if(result[1] instanceof Error){
					return result[1];
				}
				return result[0].total- result[1].total;
			});
		} catch (e) {
			return e;
		}
	};

	async updateBalance(balanceId, updateObj){
		try {
			return await BalanceModel.findByIdAndUpdate({_id: balanceId},updateObj,{new:true});
		} catch (e) {
			return e;
		}
	}
	async deleteBalance(balanceId){
		try {
			return await BalanceModel.findByIdAndRemove(balanceId);
		} catch (e) {
			return e;
		}
	}

}



module.exports = BalanceLib;