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
	async getCategory(messId){
		try {
			const mess = await CategoryModel.find({messId:messId});
			if(mess.length) {
				return mess;
			} else {
				throw new Error(`No categories in this mess`);
			}
		} catch (e) {
			return e;
		}
	};
	async updateCategory(categoryId, updateObj){
		try {
			return await CategoryModel.findByIdAndUpdate({_id: categoryId},updateObj,{new:true});
		} catch (e) {
			return e;
		}
	};

	async deleteCategory(categoryId){
		try {
			return await CategoryModel.findByIdAndRemove(categoryId);
		} catch (e) {
			return e;
		}
	};

	async addBalance(balanceObject){
		try {
			return await BalanceModel.create(balanceObject);
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
	async totalMessBalance(messId){
		try {
			const data = await BalanceModel.find({messId: messId});
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

	async currentBalance(messId){
		try {
			let b = new BalanceLib();
			return await Promise.all(
				[
					b.totalMessBalance(messId),
					ExpenseLib.totalMessExpense(messId)
				]).then(result=>{
					if(result[0] instanceof Error){
						return result[0];
					}
					if(result[1] instanceof Error){
						return result[1];
					}
				return result[0]- result[1];
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