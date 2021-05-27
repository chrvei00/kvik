//Node modules
const multer = require("multer");
//Models
const reklamasjonForm = require("../models/reklamasjonModel");
//Middleware
const { storage } = require("../middleware/cloudinary");
const upload = multer({ storage });
//Utils
const { eError, catchAsync } = require("../middleware/error");

module.exports.sendReklamasjon = catchAsync(async (req, res, next) => {
  // //Parse input
  const form = new reklamasjonForm(req.body.reklamasjon);
  form.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  //Save to DB
  await form.save();
  req.flash("success", "sendt!");
  res.status(201).render("./reklamasjon/formSubmitted.ejs");
});

module.exports.sendReklamasjonBilder = upload.array("images");

module.exports.renderForm = (req, res, next) => {
  res.render("./reklamasjon/form.ejs");
};
