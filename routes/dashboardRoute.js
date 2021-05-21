const express = require("express");
const router = express.Router();

//Routes
router.get("/", (req, res) => {
  res.render("./dashboard/index.ejs");
});

router.get("/unsolved", (req, res) => {
  res.render("./dashboard/unsolved.ejs");
});

router.get("/solved", (req, res) => {
  res.render("./dashboard/solved.ejs");
});

router.get("/statistikk", (req, res) => {
  res.render("./dashboard/stats.ejs");
});

router.get("/users", (req, res) => {
  res.render("./dashboard/users.ejs");
});

module.exports = router;
