const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(() => console.log("Connected to database."))
      .catch((err) => console.log("Failed to connect to database!", err));
  } catch (err) {
    handleError(err);
  }
};

module.exports = connectDB;
