//Models
const reklamasjonForm = require("../models/reklamasjonModel.js");

//Middleware and utils
const { eError, catchAsync } = require("../middleware/error");

//DB Imports and setup
module.exports.setUp = catchAsync(async (req, res, next) => {
  res.locals.currentuser = req.user;
  res.locals.layout = "dashLayout";
  res.locals.page = "oversikt";
  next();
});

//routeHandlers
module.exports.redirectDashboard = (req, res) => {
  res.redirect("/dashboard");
};

module.exports.renderIndex = catchAsync(async (req, res, next) => {
  const reklamasjoner = await reklamasjonForm.find({});
  res.render("dashboard/index.ejs", { reklamasjoner });
});
