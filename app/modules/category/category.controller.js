let response = require('../../../helper/response');
let CategoryLib = require('./category.lib');

class CategoryController {
	static async addCategory(req, res){
		try {
			let categoryObject = req.body;
			categoryObject.messId = req.auth.messId;
			const category = await CategoryLib.addCategory(categoryObject);
			if(category.success)
				res.status(201).json(response.single(true, category.message, category.data));
			res.status(201).json(response.single(false,`${category.message}`));

		} catch (e) {
			res.status(500).json(response.error(false,'An error occur', `${e}`))
		}
	};
	static async getCategory (req, res){
		try {
			const messId = req.auth.messId;
			const category = await CategoryLib.getCategory(messId);
			if(category.success)
				res.status(200).json(response.single(true, `Categories `, category.data));
			res.status(200).json(response.single(false,`${category.message}`));

		} catch (e) {
			res.status(500).json(response.error(false,'An error occur', `${e}`))
		}
	};
	static async updateCategory(req, res){
		try {
			const categoryId = req.params.categoryId;
			let updateObj = req.body; // name
			updateObj.messId = req.auth.messId;

			const category = await CategoryLib.updateCategory(categoryId , updateObj);
			if(category.success)
				res.status(200).json(response.single(true, category.message, category.data));
			res.status(200).json(response.single(false, category.message));

		} catch (e) {
			res.status(500).json(response.error(false,'An error occur', `${e}`))
		}
	};

	static async deleteCategory(req, res){
		try {
			const categoryId = req.params.categoryId;
			await CategoryLib.deleteCategory(categoryId);
			res.status(200).json(response.single(true, `Category deleted successfully`));
		} catch (e) {
			res.status(500).json(response.error(false,'An error occur', `${e}`))
		}
	};
}

module.exports = CategoryController;