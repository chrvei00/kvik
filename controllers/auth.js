//Node modules
const passport = require("passport");
const { catchAsync } = require("../middleware/error");
//Models
const User = require("../models/userModel");

module.exports.renderLogin = (req, res) => {
  if (req.isAuthenticated()) {
    res.locals.isLoggedIn = true;
  } else {
    res.locals.isLoggedIn = false;
  }
  res.render("auth/signIn.ejs");
};

module.exports.logOut = (req, res) => {
  req.logout();
  req.flash("success", "Logget ut!");
  res.redirect("/");
};

//Middleware
module.exports.authenticate = passport.authenticate("local", {
  failureRedirect: "/",
  failureFlash: "Feil brukernavn eller passord.",
  successRedirect: "/dashboard",
});
