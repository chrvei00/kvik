//Models
const reklamasjonForm = require("../models/reklamasjonModel");

//Middleware and utils
const { catchAsync } = require("../middleware/error");
const { cloudinary } = require("../middleware/cloudinary");
const { date } = require("joi");

//DB imports && setup
module.exports.findReklamasjoner = catchAsync(async (req, res, next) => {
  const uferdigReklamasjon = await reklamasjonForm.find({ status: false });
  const arkivertReklamasjon = await reklamasjonForm.find({
    status: true,
  });
  const reklamasjoner = await reklamasjonForm.find({});
  res.locals.uferdigReklamasjon = uferdigReklamasjon.reverse();
  res.locals.arkivertReklamasjon = arkivertReklamasjon.reverse();
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
module.exports.redirectUferdigReklamasjoner = (req, res) => {
  res.redirect("/dashboard/reklamasjoner/uferdigReklamasjoner");
};

module.exports.renderArkivertReklamasjoner = (req, res) => {
  res.locals.page = "arkivertReklamasjon";
  res.render("./dashboard/arkivertReklamasjon.ejs");
};

module.exports.renderUferdigReklamasjoner = (req, res) => {
  res.locals.page = "uferdigReklamasjon";
  res.render("./dashboard/uferdigReklamasjon.ejs");
};

module.exports.renderReklamasjon = catchAsync(async (req, res, next) => {
  if (res.locals.reklamasjon.status) {
    res.locals.page = "arkivertReklamasjon";
  } else {
    res.locals.page = "uferdigReklamasjon";
  }
  res.render("dashboard/visReklamasjon.ejs");
});

module.exports.updateReklamasjon = catchAsync(async (req, res, next) => {
  reklamasjon = await reklamasjonForm.findById(req.params.id);
  reklamasjon.status = !reklamasjon.status;
  if (reklamasjon.status) {
    reklamasjon.finished = Date.now();
    if (reklamasjon.finished < reklamasjon.expectedFinished) {
      reklamasjon.stats.finishedInTime = true;
    } else {
      reklamasjon.stats.finishedInTime = false;
    }
  }
  await reklamasjon.save();
  req.flash("success", "Status oppdatert");
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

module.exports.addNote = catchAsync(async (req, res, next) => {
  res.locals.reklamasjon.notes.push({
    content: req.body.content,
    username: res.locals.currentuser.name,
    date: Date.now(),
  });
  await res.locals.reklamasjon.save();
  res.redirect(`/dashboard/reklamasjoner/${req.params.id}`);
});

module.exports.removeNote = catchAsync(async (req, res, next) => {
  const { id, noteId } = req.params;
  const rek = await reklamasjonForm.findById(id);
  const savedRek = await rek.notes.pull(noteId);
  await rek.save();
  res.redirect(`/dashboard/reklamasjoner/${rek._id}`);
});
