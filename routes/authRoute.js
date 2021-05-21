const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/userModel");
const { isLoggedIn } = require("../middleware/auth");

//Routes
router.get("/", (req, res) => {
  res.render("auth/signIn.ejs", { layout: "" });
});

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/dashboard",
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/newUser", isLoggedIn, async (req, res) => {
  const { name, username, password, telefon, rolle, sex } = req.body;
  const user = new User({
    name,
    telefon,
    rolle,
    sex,
    username,
  });
  const savedUser = await User.register(user, password);
  console.log(savedUser);
  res.redirect("/dashboard");
});

module.exports = router;
