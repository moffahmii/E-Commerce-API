const categoryModel = require("../models/categoryModel");
const factory = require("./handlers/factoryHandler"); 

exports.getCategories = factory.getAll(categoryModel); 
exports.getCategory = factory.getOne(categoryModel);
exports.createCategory = factory.createOne(categoryModel);
exports.updateCategory = factory.updateOne(categoryModel);
exports.deleteCategory = factory.deleteOne(categoryModel);
