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

router.post("/registrer", isLoggedIn, async (req, res) => {
  const { email, username, password } = req.body;
  const user = new User({
    email,
    username,
  });
  const savedUser = await User.register(user, password);
  console.log(savedUser);
  res.redirect("/dashboard");
});

module.exports = router;
