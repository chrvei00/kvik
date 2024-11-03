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

module.exports.register = async (req, res) => {
  console.log("Registering a new user");

  try {
    // Attempt to register the user
    await User.register(
      new User({
        username: req.body.username,
        name: req.body.name,
        telefon: req.body.telefon,
        rolle: req.body.rolle,
        sex: req.body.sex,
      }),
      req.body.password
    );

    // Send a success response once registration is complete
    res.status(201).send("Registered successfully");
  } catch (error) {
    // Log the error for debugging
    console.error("Registration error:", error);

    // Send an error response to the client
    res
      .status(500)
      .send({ message: "Registration failed", error: error.message });
  }
};
