module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Feil brukernavn eller passord.");
    return res.redirect("/auth");
  }
  next();
};
