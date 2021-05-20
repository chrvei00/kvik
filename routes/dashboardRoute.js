const express = require("express");
const router = express.Router();

//Routes
router.get("/", (req, res) => {
  res.render("./dashboard/index.ejs");
});

router.get("/admin", (req, res) => {
  res.render("./dashboard/adminDash.ejs");
});

router.get("/reklamasjon", (req, res) => {
  res.render("./dashboard/reklamasjonDash.ejs");
});

router.get("/brukere", (req, res) => {
  res.render("./dashboard/brukere.ejs", { layout: "altLayout" });
});

module.exports = router;
