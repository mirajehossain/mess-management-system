const CategoryModule = require('../category/index');
const CategoryModel = CategoryModule.CategoryModel;

const BalanceModule = require('../balance/index');
const BalanceModel = BalanceModule.BalanceModel;

const ExpenseModel = require('../expense/expense.model');
const MealModel = require('../../../models/mealModel');
class CategoryLib {
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

}

module.exports = CategoryLib;