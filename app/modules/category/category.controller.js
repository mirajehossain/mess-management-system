const response = require('../../../helper/response');
const CategoryLib = require('./category.lib');

class CategoryController {
    static async addCategory(req, res) {
        try {
            const categoryObject = req.body;
            categoryObject.messId = req.auth.messId;
            const category = await CategoryLib.addCategory(categoryObject);
            if (category.success) return res.status(201).json(response.single(true, category.message, category.data));
            return res.status(200).json(response.single(false, `${category.message}`));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async getCategory(req, res) {
        try {
            const { messId } = req.auth;
            const category = await CategoryLib.getCategory(messId);
            if (category.success) return res.status(200).json(response.single(true, 'Categories ', category.data));
            return res.status(200).json(response.single(false, `${category.message}`));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async updateCategory(req, res) {
        try {
            const { categoryId } = req.params;
            const updateObj = req.body; // name
            updateObj.messId = req.auth.messId;

            const category = await CategoryLib.updateCategory(categoryId, updateObj);
            if (category.success) return res.status(200).json(response.single(true, category.message, category.data));
            return res.status(200).json(response.single(false, category.message));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }

    static async deleteCategory(req, res) {
        try {
            const { categoryId } = req.params;
            await CategoryLib.deleteCategory(categoryId);
            return res.status(200).json(response.single(true, 'Category deleted successfully'));
        } catch (e) {
            return res.status(500).json(response.error(false, 'An error occur', `${e}`));
        }
    }
}

module.exports = CategoryController;
