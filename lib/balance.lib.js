const CategoryModel = require('../models/categoryModel');
const BalanceModel = require('../models/balanceModel');
const UserModel = require('../models/userModel');
const ExpenseModel = require('../models/expenseModel');
const MealModel = require('../models/mealModel');
const expenseLib= require('../lib/exepnse.lib');
const ExpenseLib= new expenseLib();
class BalanceLib {
	constructor(){};

	async addCategory(categoryObject){
		try {
			const mess = await CategoryModel.findOne({
				$and :[{name: categoryObject.name},{messId: categoryObject.messId}]
			});
			const isMealCheck = await CategoryModel.findOne({
				$and :[{isMeal : 1},{messId: categoryObject.messId}]
			});

			if(mess != null) {
				throw new Error(`Category '${mess.name}' already exist`);
			} else {
				if (isMealCheck == null && categoryObject.isMeal == 0){
					const data =await CategoryModel.create(categoryObject);
					if(data != null) return data;
				} else if (isMealCheck == null && categoryObject.isMeal == 1){
					const data =await CategoryModel.create(categoryObject);
					if(data != null) return data;
				} else if(isMealCheck != null && categoryObject.isMeal == 0){
					const data =await CategoryModel.create(categoryObject);
					if(data != null) return data;
				} else {
					return new Error('Default meal category already selected');
				}
			}
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
			const isMealCheck = await CategoryModel.findOne({
				$and :[{isMeal : 1},{messId: updateObj.messId}]
			});
			if (isMealCheck == null && updateObj.isMeal == 0){
				return await CategoryModel.findByIdAndUpdate({_id: categoryId}, updateObj, {new: true});
			} else if (isMealCheck == null && updateObj.isMeal == 1){
				return await CategoryModel.findByIdAndUpdate({_id: categoryId}, updateObj, {new: true});
			} else if(isMealCheck != null && updateObj.isMeal == 0){
				return await CategoryModel.findByIdAndUpdate({_id: categoryId}, updateObj, {new: true});
			} else {
				return new Error('Default meal category already selected');
			}
		} catch (e) {
			return e;
		}
	};

	async deleteCategory(categoryId){
		try {
			await MealModel.deleteMany({categoryId: categoryId});
			await BalanceModel.deleteMany({categoryId: categoryId});
			await ExpenseModel.deleteMany({categoryId: categoryId});
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

	async userMealBalance(currentMonthFirstDate, currentMonthLastDate, id){
		try {
			const category = await CategoryModel.findOne({isMeal: 1});
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
			const category = await CategoryModel.findOne({isMeal: 1});
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
				throw new Error('No Balance in this category');
			}
		} catch (e) {
			return e;
		}
	}

	async currentBalance(currentMonthFirstDate, currentMonthLastDate, messId){
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