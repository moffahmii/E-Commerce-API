const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// Get all categories
exports.getCategories = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);

  const limit = Math.min(Math.max(parseInt(req.query.limit) || 4, 1), 100);

  const skip = (page - 1) * limit;

  const categories = await categoryModel.find({}).skip(skip).limit(limit);

  const documentsCount = await categoryModel.countDocuments();

  const numberOfPages = Math.ceil(documentsCount / limit);

  res.status(200).json({
    page,
    limit,
    numberOfPages,
    documentsCount,
    data: categories,
  });
});

// Get single category
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await categoryModel.findById(id);

  if (!category) {
    return next(new ApiError(404, "Category not found"));
  }

  res.status(200).json({
    data: category,
  });
});

// Create category
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await categoryModel.create({
    name,
    slug: slugify(name),
  });

  res.status(201).json({
    data: category,
  });
});

// Update category
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await categoryModel.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!category) {
    return next(new ApiError(404, "Category not found"));
  }

  res.status(200).json({
    data: category,
  });
});

// Delete category
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await categoryModel.findByIdAndDelete(id);

  if (!category) {
    return next(new ApiError(404, "Category not found"));
  }

  res.status(200).json({
    msg: "Category deleted successfully",
  });
});
