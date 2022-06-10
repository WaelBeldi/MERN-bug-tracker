const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/connectDB");

const bugRoutes = require("./routes/bugRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT;
connectDB();

app.use(express.json());
app.use(cors());

app.use("/bugs", bugRoutes);
app.use("/user", userRoutes);

app.listen(port, (err) => {
  err ? console.log(err) : console.log(`Server is running at ${port}.`);
});
