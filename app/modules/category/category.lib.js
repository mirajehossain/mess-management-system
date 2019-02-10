const CategoryModel = require('./category.model');
const BalanceModel = require('../balance/balance.model');
const ExpenseModel = require('../expense/expense.model');
const MealModel = require('../meal/meal.model');

class CategoryLib {
	constructor(){};

	static async addCategory(categoryObject){
		try {
			const mess = await CategoryModel.findOne({
				$and :[{name: categoryObject.name},{messId: categoryObject.messId}]
			});
			const isMealCheck = await CategoryModel.findOne({
				$and :[{isMeal : 1},{messId: categoryObject.messId}]
			});

			if(mess != null) {
				return {success:false, message: `Category '${mess.name}' already exist`};
			} else {
				if (isMealCheck == null && categoryObject.isMeal == 0){
					const data =await CategoryModel.create(categoryObject);
					if(data != null) return  {success: true, data:data};
				} else if (isMealCheck == null && categoryObject.isMeal == 1){
					const data =await CategoryModel.create(categoryObject);
					if(data != null) return  {success: true, data:data};
				} else if(isMealCheck != null && categoryObject.isMeal == 0){
					const data =await CategoryModel.create(categoryObject);
					if(data != null) return {success: true, data:data};
				} else {
					return {success:false, message: 'Default meal category already selected'};
				}
			}
		} catch (e) {
			throw e;
		}
	};
	static async getCategory(messId){
		try {
			console.log(messId);
			const mess = await CategoryModel.find({messId:messId});
			if(mess.length) {
				return {success: true, data: mess};
			}
			return {success: false , message: `No categories in this mess`};
		} catch (e) {
			throw e;
		}
	};
	static async updateCategory(categoryId, updateObj){
		try {
			const isCategory = await CategoryModel.findOne({_id: categoryId});
			if(isCategory){
				const isMealCheck = await CategoryModel.findOne({
					$and :[{isMeal : 1},{messId: updateObj.messId}]
				});
				if (isMealCheck == null && updateObj.isMeal == 0){
					return {success: true, data: await CategoryModel.findByIdAndUpdate({_id: categoryId}, updateObj, {new: true})};
				} else if (isMealCheck == null && updateObj.isMeal == 1){
					return {success: true, data: await CategoryModel.findByIdAndUpdate({_id: categoryId}, updateObj, {new: true})};
				} else if(isMealCheck != null && updateObj.isMeal == 0){
					return {success: true, data: await CategoryModel.findByIdAndUpdate({_id: categoryId}, updateObj, {new: true})};
				} else {return {success:false, message:'Default meal category already selected'};}
			}  else {return {success:false, message:'No category found in this ID'};}
		} catch (e) {
			throw e;
		}
	};
	static async deleteCategory(categoryId){
		try {
			await MealModel.deleteMany({categoryId: categoryId});
			await BalanceModel.deleteMany({categoryId: categoryId});
			await ExpenseModel.deleteMany({categoryId: categoryId});
			return await CategoryModel.findByIdAndRemove(categoryId);
		} catch (e) {
			throw e;
		}
	};
}

module.exports = CategoryLib;