module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Du må logge inn.");
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
    return res.redirect("/dashboard");
  }
};
