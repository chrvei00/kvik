//Models
const reklamasjonForm = require("../models/reklamasjonModel");

//Middleware and utils
const { catchAsync } = require("../middleware/error");
const { cloudinary } = require("../middleware/cloudinary");

//DB imports && setup
module.exports.findReklamasjoner = catchAsync(async (req, res, next) => {
  const reklamasjoner = await reklamasjonForm.find({});
  res.locals.reklamasjoner = reklamasjoner.reverse();
  res.locals.page = "reklamasjoner";
  next();
});

module.exports.findReklamasjon = catchAsync(async (req, res, next) => {
  const reklamasjon = await reklamasjonForm.findById(req.params.id);
  res.locals.reklamasjon = reklamasjon;
  next();
});

//routehandlers:
module.exports.renderReklamasjoner = (req, res) => {
  const filter = req.query.solved;
  res.render("./dashboard/reklamasjoner.ejs", {
    filter,
  });
};

module.exports.renderReklamasjon = catchAsync(async (req, res, next) => {
  res.render("dashboard/reklamasjonShow.ejs");
});

module.exports.updateReklamasjon = catchAsync(async (req, res, next) => {
  res.locals.reklamasjon.finished = !res.locals.reklamasjon.finished;
  await res.locals.reklamasjon.save();
  res.redirect(`/dashboard/reklamasjoner/${res.locals.reklamasjon._id}`);
});

module.exports.deleteReklamasjon = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const reklamasjon = await reklamasjonForm.findByIdAndDelete(id);
  for (let img of reklamasjon.images) {
    await cloudinary.uploader.destroy(img.filename);
  }
  req.flash("success", "Reklamasjonen har blitt slettet.");
  res.redirect(`/dashboard/reklamasjoner`);
});
