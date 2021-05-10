//Require

//modules
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const mongoose = require("mongoose");
//schemaes
const reklamasjonForm = require("../models/reklamasjonSchema");

//GET HomePage
//Routes
router.get("/", async (req, res) => {
  try {
    const forms = await reklamasjonForm.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/form", (req, res) => {
  res.render("./reklamasjon/form.ejs");
});

//POST form
//Define mail-server
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
    console.log("REKLAMASJON - Connected to mailServer");
  }
});
//POST FORM
router.post("/send", (req, res) => {
  //1. Parse input
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, async function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    //2. Define mail and DB-input
    const mail = {
      from: data.name,
      to: process.env.recEMAIL,
      subject: `Reklamasjon fra: ${data.name}`,
      html: `<h2>Reklamasjon fra: ${data.name} - ${data.email}</h2> <h2>Svar:</h2> <h3>Kundeservice: ${data.q1Radio}</h3><h3>Rekkomendert til en venn? ${data.q2Radio}</h3><h3>Noe å legge til?:</h3><h4> ${data.additionalText}</h4>`,
    };
    const form = new reklamasjonForm({
      name: data.name,
      email: data.email,
      q1Radio: data.q1Radio,
      q2Radio: data.q2Radio,
      additionalText: data.additionalText,
    });
    //Save to DB and Send mail
    try {
      await form.save();
      await transporter.sendMail(mail);
      res.status(201).render("./reklamasjon/formSubmitted.ejs");
    } catch (error) {
      res.status(500).render("./reklamasjon/formError.ejs");
    }
  });
  //3. Send mail Save DB
});

module.exports = router;
