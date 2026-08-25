const { param, body } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid Category Id"),

  validatorMiddleware,
];

exports.createCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("Category name must be between 3 and 32 characters")
    .trim(),

  validatorMiddleware,
];

exports.updateCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid Category Id"),

  body("name")
    .optional()
    .isLength({ min: 3, max: 32 })
    .withMessage("Category name must be between 3 and 32 characters")
    .trim(),

  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid Category Id"),

  validatorMiddleware,
];
