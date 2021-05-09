const express = require("express");
const router = express.Router();

//GET HomePage
//Routes
router.get("/", (req, res) => {
  res.render("./kontakt/kontakt.ejs");
});

module.exports = router;
