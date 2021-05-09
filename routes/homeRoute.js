const express = require("express");
const router = express.Router();

//GET HomePage
//Routes
router.get("/", (req, res) => {
  res.render("home.ejs");
});

module.exports = router;
