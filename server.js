//Require
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const ejs = require("ejs");
require("dotenv").config();
//App set
app.set("view engine", "ejs");

//Feedback-form logic

//Routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/feedback", (req, res) => {
  res.render("form.ejs");
});
//Launch server on Port
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
