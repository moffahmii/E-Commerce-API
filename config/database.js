const mongoose = require("mongoose");

const DatabaseConnection = () => {
  return mongoose
    .connect(process.env.db_url)
    .then(() => {
      console.log("Database Connected");
      console.log("Database:", mongoose.connection.name);
    })
};

module.exports = DatabaseConnection;
