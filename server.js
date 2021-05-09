//Require
const express = require("express");
const app = express();
const multiparty = require("multiparty");
const expressLayouts = require("express-ejs-layouts");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();
//Database setup
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DB"));
//App set
app.set("view engine", "ejs");
//App use
app.use(helmet());
app.use(expressLayouts);
app.use(express.json());
//Routes
const feedbackRoute = require("./routes/feedbackRoute");
app.use("/feedback", feedbackRoute);
const homeRoute = require("./routes/homeRoute");
app.use("/", homeRoute);
//Feedback-form logic

//Launch server on Port
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
