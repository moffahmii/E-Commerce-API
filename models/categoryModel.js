const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      minlength: [3, "Category name must be at least 3 characters"],
      maxlength: [50, "Category name cannot exceed 50 characters"],
      unique: true,
    },

    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true },
);

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
