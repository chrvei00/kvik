module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Feil brukernavn eller passord.");
    return res.redirect("/auth");
  }
  next();
};

module.exports.isAdmin = (req, res, next) => {
  if (
    req.user.rolle.toString() == "admin" ||
    req.user.rolle.toString() == "utvikler"
  ) {
    next();
  } else {
    req.flash("error", "Feil brukernavn eller passord.");
    return res.redirect("/dashboard");
  }
};
