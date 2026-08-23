const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

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
app.get("/", (req, res) => {
  res.send("E-Commerce API");
});

app.use("/api/v1/categories", categoryRoute);

// Start Server
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Running on server ${PORT}`);
});
