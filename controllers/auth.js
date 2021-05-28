//Node modules
const passport = require("passport");
//Models
const User = require("../models/userModel");

module.exports.renderLogin = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
    return;
  }
  res.render("auth/signIn.ejs");
};

module.exports.redirectOnAuth = (req, res) => {
  req.flash("success", "Velkommen tilbake!");
  res.redirect("/dashboard");
};

module.exports.logOut = (req, res) => {
  req.logout();
  req.flash("success", "Logget ut!");
  res.redirect("/");
};

//Middleware
module.exports.authenticate = passport.authenticate("local", {
  failureRedirect: "/dashboard",
  failureFlash: true,
});
