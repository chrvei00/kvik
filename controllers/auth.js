//Node modules
const passport = require("passport");
//Models
const User = require("../models/userModel");

module.exports.renderLogin = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
    return;
  }
  req.flash("error", "Username or password is wrong.");
  res.render("auth/signIn.ejs");
};

module.exports.redirectOnAuth = (req, res) => {
  req.flash("success", "Velkommen tilbake!");
  res.redirect("/dashboard");
};

module.exports.logOut = (req, res) => {
  req.logout();
  res.redirect("/");
};

//Middleware
module.exports.authenticate = passport.authenticate("local", {
  failureRedirect: "/dashboard",
});
