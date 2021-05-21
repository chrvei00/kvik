const express = require("express");
const router = express.Router();
const users = require("../models/userModel.js");
const reklamasjonform = require("../models/reklamasjonModel.js");

//Routes
router.get("/", (req, res) => {
  res.render("./dashboard/index.ejs", { layout: "dashLayout" });
});

router.get("/reklamasjoner", async (req, res) => {
  const reklamasjoner = await reklamasjonform.find({});
  const brukere = await users.find({});
  res.render("./dashboard/reklamasjoner.ejs", {
    layout: "dashLayout",
    brukere,
    reklamasjoner,
  });
});

router.get("/solved", (req, res) => {
  res.redirect("/dashboard/reklamasjoner");
});
router.get("/unsolved", (req, res) => {
  res.redirect("/dashboard/reklamasjoner");
});

router.get("/statistikk", (req, res) => {
  res.render("./dashboard/stats.ejs", { layout: "dashLayout" });
});

router.get("/users", async (req, res) => {
  const brukere = await users.find({});
  res.render("./dashboard/users.ejs", {
    layout: "dashLayout",
    brukere: brukere,
  });
});

router.get("/users/new", (req, res) => {
  res.render("./auth/newUser.ejs", { layout: "dashLayout" });
});

module.exports = router;
