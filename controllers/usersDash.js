//Models
const User = require("../models/userModel");

//Middleware and utils
const { catchAsync } = require("../middleware/error");

//DB imports && setup
module.exports.findUsers = catchAsync(async (req, res, next) => {
  res.locals.brukere = await User.find({});
  res.locals.page = "brukere";
  next();
});

module.exports.findUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const bruker = await User.findById(id);
  res.locals.bruker = bruker;
  next();
});

//routehandlers:
module.exports.renderUsers = (req, res) => {
  res.render("./dashboard/users.ejs");
};

module.exports.saveNewUser = catchAsync(async (req, res, next) => {
  const { name, username, password, telefon, rolle, sex } = req.body;
  const user = new User({
    name,
    telefon,
    rolle,
    sex,
    username,
  });
  const savedUser = await User.register(user, password);
  res.redirect("/dashboard/users");
});

module.exports.renderUserProfile = catchAsync(async (req, res, next) => {
  res.render("dashboard/userProfile.ejs");
});

module.exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const bruker = await User.findByIdAndUpdate(id, req.body);
  req.flash("success", "Oppdatering lagret");
  res.redirect(`/dashboard/users/${bruker._id}`);
});

module.exports.updateUserPassword = catchAsync(async (req, res, next) => {
  await res.locals.bruker.setPassword(req.body.password);
  res.locals.bruker.save();
  req.flash("success", "Oppdatering lagret");
  res.redirect(`/dashboard/users/${res.locals.bruker._id}`);
});

module.exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  req.flash("success", "Bruker slettet");
  res.redirect(`/dashboard/users`);
});

module.exports.renderNewUserForm = (req, res) => {
  res.render("auth/newUser.ejs");
};
