//Models
const reklamasjonForm = require("../models/reklamasjonModel.js");
const indexNoteModel = require("../models/indexNoteModel.js");

//Middleware and utils
const { eError, catchAsync } = require("../middleware/error");

//DB Imports and setup
module.exports.setUp = catchAsync(async (req, res, next) => {
  res.locals.indexNotes = await (await indexNoteModel.find()).reverse();
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
  const reklamasjoner = await reklamasjonForm.find();
  res.locals.solved = 0;
  res.locals.unsolved = 0;
  res.locals.finished = 0;
  res.locals.unFinished = 0;
  for (skjema of reklamasjoner) {
    skjema.status ? res.locals.solved++ : res.locals.unsolved++;
  }
  for (skjema of reklamasjoner) {
    skjema.finished && skjema.status ? res.locals.finished++ : "";
  }
  const reklamasjonerYearly = await reklamasjonForm.find({
    reklamasjonsDate: {
      $gte: new Date(new Date().getFullYear(), 0, 1),
    },
  });
  res.locals.m0Reklamasjoner = 0;
  res.locals.m1Reklamasjoner = 0;
  res.locals.m2Reklamasjoner = 0;
  res.locals.m3Reklamasjoner = 0;
  res.locals.m4Reklamasjoner = 0;
  res.locals.m5Reklamasjoner = 0;
  res.locals.m6Reklamasjoner = 0;
  res.locals.m7Reklamasjoner = 0;
  res.locals.m8Reklamasjoner = 0;
  res.locals.m9Reklamasjoner = 0;
  res.locals.m10Reklamasjoner = 0;
  res.locals.m11Reklamasjoner = 0;
  for (reklamasjon of reklamasjonerYearly) {
    var a = reklamasjon.reklamasjonsDate.getMonth();
    a = parseInt(a);
    switch (a) {
      case 0:
        res.locals.m0Reklamasjoner += 1;
        break;
      case 1:
        res.locals.m1Reklamasjoner += 1;
        break;
      case 2:
        res.locals.m2Reklamasjoner += 1;
        break;
      case 3:
        res.locals.m3Reklamasjoner += 1;
        break;
      case 4:
        res.locals.m4Reklamasjoner += 1;
        break;
      case 5:
        res.locals.m5Reklamasjoner += 1;
        break;
      case 6:
        res.locals.m6Reklamasjoner += 1;
        break;
      case 7:
        res.locals.m7Reklamasjoner += 1;
        break;
      case 8:
        res.locals.m8Reklamasjoner += 1;
        break;
      case 9:
        res.locals.m9Reklamasjoner += 1;
        break;
      case 10:
        res.locals.m10Reklamasjoner += 1;
        break;
      case 11:
        res.locals.m11Reklamasjoner += 1;
        break;
      default:
        break;
    }
  }
  reklamasjoner.reverse();
  res.render("dashboard/index.ejs", { reklamasjoner });
});

module.exports.addIndexNote = catchAsync(async (req, res, next) => {
  const note = new indexNoteModel({
    content: req.body.content,
    username: res.locals.currentuser.name,
  });
  await note.save();
  res.redirect("/dashboard");
});

module.exports.deleteIndexNote = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await indexNoteModel.findByIdAndDelete(id);
  res.redirect("/dashboard");
});
