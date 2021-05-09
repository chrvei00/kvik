const express = require("express");
const router = express.Router();

//GET HomePage
//Routes
router.get("/", (req, res) => {
  res.render("./reklamasjon/form.ejs");
});

module.exports = router;
