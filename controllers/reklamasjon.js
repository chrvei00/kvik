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

const request = require("request");
module.exports.reCaptcha = function (req, res, next) {
  if (
    req.body["g-recaptcha-response"] === undefined ||
    req.body["g-recaptcha-response"] === "" ||
    req.body["g-recaptcha-response"] === null
  ) {
    return res.json({ responseError: "something goes to wrong" });
  }
  const secretKey = process.env.reCaptcha_SECRET_KEY;
  const response = req.body["g-recaptcha-response"];
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${response}&remoteip=${req.connection.remoteAddress}`;

  const result = request(verificationURL, (err, response, body) => {
    const result = JSON.parse(body);
    if (result.success) {
      return next();
    }
    return next(new eError());
  });
};
