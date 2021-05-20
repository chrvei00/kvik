//Require
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
//schemaes
const reklamasjonForm = require("../models/reklamasjonsSkjemaModel");
//Routes
router.get("/", (req, res) => {
  res.render("./reklamasjon/form.ejs", { layout: "altLayout" });
});

router.post("/send", upload.array("images"), async (req, res) => {
  // //Parse input
  const form = new reklamasjonForm(req.body.reklamasjon);
  form.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  //Save to DB
  try {
    await form.save();
    console.log(form);
    res.status(201).render("./reklamasjon/formSubmitted.ejs");
  } catch (error) {
    res.status(500).render("./reklamasjon/formError.ejs");
  }
});

module.exports = router;
