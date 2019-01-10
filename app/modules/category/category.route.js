const express = require('express');
const router = express.Router();

const authController = require('../auth/auth.controller');
const AuthController = new authController();

const categoryController = require('./category.controller');
const CategoryController = new categoryController ();

/**
 * Category routing
 */

router.route('/addCategory').post(AuthController.isAdmin, CategoryController.addCategory);
router.route('/getCategory').get(AuthController.isUser, CategoryController.getCategory);
router.route('/updateCategory/:categoryId').put(AuthController.isAdmin, CategoryController.updateCategory);
router.route('/deleteCategory/:categoryId').delete(AuthController.isAdmin, CategoryController.deleteCategory);



module.exports = router;