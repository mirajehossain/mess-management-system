let response = require('../../../helper/response');
let CategoryLib = require('./category.lib');

class CategoryController extends CategoryLib{
	constructor(){
		super();
	};
	async addCategory(req,res){
		try {
			let categoryObject = req.body;
			categoryObject.messId = req.auth.messId;
			const category = await super.addCategory(categoryObject);
			if(category instanceof Error)
				return res.status(409).json(response.error(false,`${category}`,`${category}`));
			else
				return res.status(201).json(response.single(true, `New Balance category added `, category));

		} catch (e) {
			return res.status(400).json(response.error(false,'An error occur', `${e}`))
		}
	};
	async getCategory (req,res){
		try {
			const messId = req.auth.messId;
			const category = await super.getCategory(messId);
			if(category instanceof Error)
				return res.status(409).json(response.error(false,`${category}`,`${category}`));
			else
				return res.status(200).json(response.single(true, `Categories `, category));

		} catch (e) {
			return res.status(400).json(response.error(false,'An error occur', `${e}`))
		}
	};
	async updateCategory(req,res){
		try {
			const categoryId = req.params.categoryId;
			let updateObj = req.body; // name
			updateObj.messId = req.auth.messId;

			const category = await super.updateCategory(categoryId , updateObj);
			if(category instanceof Error){
				return res.status(400).json(response.error(false, `${category}`, `${category}`))
			} else {
				return res.status(200).json(response.single(true, `Updated Category `, `${category}`));
			}

		} catch (e) {
			return res.status(400).json(response.error(false,'An error occur', `${e}`))
		}
	};

	async deleteCategory(req,res){
		try {
			const categoryId = req.params.categoryId;
			await super.deleteCategory(categoryId);
			return res.status(200).json(response.single(true, `Category deleted successfully`));

		} catch (e) {
			return res.status(400).json(response.error(false,'An error occur', `${e}`))
		}
	};
}

module.exports = CategoryController;