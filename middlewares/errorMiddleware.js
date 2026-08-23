const globalError = (err, req, res, next) => {
  if (err.name === "CastError") {
    err = new ApiError(404, "Invalid ID");
  }

  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
  });
};

module.exports = globalError;
