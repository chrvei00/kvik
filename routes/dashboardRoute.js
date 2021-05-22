const express = require("express");
const router = express.Router();
const users = require("../models/userModel.js");
const reklamasjonform = require("../models/reklamasjonModel.js");
//middelware
router.use((req, res, next) => {
  res.locals.currentuser = req.user;
  next();
})
//Routes
router.get("/", (req, res) => {
  console.log(req.user);
  res.render("./dashboard/index.ejs", { layout: "dashLayout" });
});

router.get("/reklamasjoner", async (req, res) => {
  const reklamasjoner = await reklamasjonform.find({});
  reklamasjoner.reverse();
  const brukere = await users.find({});
  res.render("./dashboard/reklamasjoner.ejs", {
    layout: "dashLayout",
    brukere,
    reklamasjoner,
  });
});

router.get("/reklamasjoner/:id", async (req, res) => {
  const { id } = req.params;
  const reklamasjon = await reklamasjonform.findById(id);
  res.render("dashboard/reklamasjonShow.ejs", {
    layout: "dashLayout",
    reklamasjon,
  });
});

router.put("/reklamasjoner/:id", async (req, res) => {
  console.log("hello there");
  const { id } = req.params;
  const reklamasjon = await reklamasjonform.findById(id);
  reklamasjon.finished = !reklamasjon.finished;
  console.log(reklamasjon);
  await reklamasjon.save();
  res.redirect(`/dashboard/reklamasjoner/${reklamasjon._id}`);
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

router.get("/users/edit/:id", async (req, res) => {
  const { id } = req.params;
  const bruker = await users.findById(id);
  res.render("dashboard/userProfile.ejs", {
    layout: "dashLayout",
    bruker,
  });
});

router.put("/users/edit/:id", async (req, res) => {
  const { id } = req.params;
  const bruker = await users.findByIdAndUpdate(id, req.body);
  res.redirect(`/dashboard/users/edit/${bruker._id}`);
});

router.put("/users/edit/password/:id", async (req, res) => {
  const { id } = req.params;
  const bruker = await users.findById(id);
  await bruker.setPassword(req.body.password);
  bruker.save();
  res.redirect(`/dashboard/users/edit/${bruker._id}`);
});

router.get("/users/new", (req, res) => {
  res.render("./auth/newUser.ejs", { layout: "dashLayout" });
});

module.exports = router;
