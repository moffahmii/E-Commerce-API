const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const ApiError = require("./utils/apiError");

// Load environment variables
dotenv.config({ path: "config.env" });

// Connect to Database
const DatabaseConnection = require("./config/database");
DatabaseConnection();

// Routes
const categoryRoute = require("./routes/categoryRoute");

// Create Express App
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/categories", categoryRoute);

// Route Not Found
app.use((req, res, next) => {
  next(new ApiError(404, "Cannot find this route"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  // Mongoose CastError
  if (err.name === "CastError") {
    err = new ApiError(404, "Invalid ID");
  }

  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
  });
});

// Start Server
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Running on server ${PORT}`);
});
