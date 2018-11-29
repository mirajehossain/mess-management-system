const CategoryModel = require('../models/categoryModel');
const BalanceModel = require('../models/balanceModel');
const expenseLib= require('../lib/exepnse.lib');
const ExpenseLib= new expenseLib();
class BalanceLib {
	constructor(){};

	async addCategory(categoryObject){
		try {
			const mess = await CategoryModel.findOne({$and: [ {name: categoryObject.name},{messName: categoryObject.messName}]});
			if(mess != null) {
				throw new Error(`Category '${mess.name}' already exist`);
			}
			const data =await CategoryModel.create(categoryObject);
			if(data != null) return data;
		} catch (e) {
			return e;
		}
	};
	async addBalance(balanceObject){
		try {
			const result = await BalanceModel.create(balanceObject);
			if(result !=null)
				return result;
		} catch (e) {
			return e;
		}
	};
	async totalUserBalance(id){
		try {
			 const data = await BalanceModel.find({userId: id});
			 if(data != null){
				 let balanceArr = data.map((item)=>item.amount);
				 console.log(balanceArr);
				 if(balanceArr.length)
					 return balanceArr.reduce((sum, balance)=>sum + balance);
			 } else
				 throw new Error('No balance')
		} catch (e) {
			return e;
		}
	};
	async totalMessBalance(mess){
		try {
			const data = await BalanceModel.find({messName: mess});
			if(data.length){
				let balanceArr = data.map((item)=>item.amount);
					return balanceArr.reduce((sum, balance)=>sum + balance);
			} else {
				throw new Error('No balance available in the mess.');
			}
		} catch (e) {
			return e;
		}
	};


	async categoryWiseBalance(balanceCatId){
		try {
			const data = await BalanceModel.find({balanceCategoryId: balanceCatId});
			if(data.length){
				let BalanceArr = data.map((item)=> item.amount);
				console.log(BalanceArr);
					return BalanceArr.reduce((sum, balance)=>sum + balance);
			} else {
				throw new Error('No Balance in this category');
			}
		} catch (e) {
			return e;
		}
	}

	async currentBalance(messName){
		try {
			let b = new BalanceLib();
			return await Promise.all(
				[
					b.totalMessBalance(messName),
					ExpenseLib.totalMessExpense(messName)
				]).then(result=>{
				return result[0]- result[1];
			});
		} catch (e) {
			return e;
		}
	};
}


module.exports = BalanceLib;