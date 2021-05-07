//Require
const express = require("express");
const app = express();
const multiparty = require("multiparty");
const expressLayouts = require("express-ejs-layouts");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
require("dotenv").config();
//App set
app.set("view engine", "ejs");
//App use
app.use(expressLayouts);
//Feedback-form logic
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //replace with your email provider
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Rdy for message");
  }
});
app.post("/submit", (req, res) => {
  //1.
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    //2. You can configure the object however you want
    const mail = {
      from: data.name,
      to: process.env.recEMAIL,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };

    //3.
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});
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
