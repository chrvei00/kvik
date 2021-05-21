const express = require("express");
const router = express.Router();

//Routes
router.get("/", (req, res) => {
  res.render("./dashboard/index.ejs", { layout: "dashLayout" });
});

router.get("/unsolved", (req, res) => {
  res.render("./dashboard/unsolved.ejs", { layout: "dashLayout" });
});

router.get("/solved", (req, res) => {
  res.render("./dashboard/solved.ejs", { layout: "dashLayout" });
});

router.get("/statistikk", (req, res) => {
  res.render("./dashboard/stats.ejs", { layout: "dashLayout" });
});

router.get("/users", (req, res) => {
  res.render("./dashboard/users.ejs", { layout: "dashLayout" });
});

router.get("/users/new", (req, res) => {
  res.render("./auth/newUser.ejs", { layout: "dashLayout" });
});

module.exports = router;
