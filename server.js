//Require
const express = require("express");
const app = express();
const multiparty = require("multiparty");
const expressLayouts = require("express-ejs-layouts");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const helmet = require("helmet");
require("dotenv").config();
//Database setup
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://ChristianV:${process.env.PASS}@feedbackforms.alzqv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
//App set
app.set("view engine", "ejs");
//App use
app.use(expressLayouts);
//app.use(helmet());
//Feedback-form logic
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //replace with your email provider
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
// Connect med mailserver
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("App is ready...");
  }
});

app.post("/send", (req, res) => {
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
      subject: `Tilbakemelding fra: ${data.name}`,
      html: `<h2>Tilbakemelding fra: ${data.name} - ${data.email}</h2> <h2>Svar:</h2> <h3>Kundeservice: ${data.q1Radio}</h3><h3>Rekkomendert til en venn? ${data.q2Radio}</h3><h3>Noe å legge til?:</h3><h4> ${data.additionalText}</h4>`,
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
