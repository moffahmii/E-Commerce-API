const asyncHandler = require("express-async-handler");
const ApiError = require("../../utils/apiError");

exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 4, 1), 100);
    const skip = (page - 1) * limit;

    const documents = await Model.find({}).skip(skip).limit(limit);
    const documentsCount = await Model.countDocuments();
    const numberOfPages = Math.ceil(documentsCount / limit);

    res.status(200).json({
      page,
      limit,
      numberOfPages,
      documentsCount,
      data: documents,
    });
  });

// 2. Get One
exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
      return next(
        new ApiError(404, `Document not found for this id: ${req.params.id}`),
      );
    }
    res.status(200).json({ data: document });
  });

// 3. Create One
exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

// 4. Update One
exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      return next(
        new ApiError(404, `Document not found for this id: ${req.params.id}`),
      );
    }
    res.status(200).json({ data: document });
  });

// 5. Delete One
exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(404, `Document not found for this id: ${id}`));
    }
    res.status(200).json({ msg: "Document deleted successfully" });
  });
