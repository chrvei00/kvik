//Dependencies
const { catchAsync } = require("../middleware/error");

module.exports.mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

module.exports.staticOptions = {
  dotfiles: "ignore",
  etag: true,
  extensions: "ejs",
  index: false,
  maxAge: 600000,
  redirect: false,
};

const MongoStore = require("connect-mongo");
module.exports.sessionOptions = {
  name: "session",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
    touchAfter: 60,
  }),
};

module.exports.findReklamasjoner = catchAsync(async (req, res, next) => {
  const form = require("../models/reklamasjonModel");
  result = await form.find({});
  res.send(result);
});

module.exports.helmetCSPOptions = {
  useDefaults: true,
  directives: {
    "img-src": [
      "'self' data:",
      "http://www.w3.org/",
      "https://res.cloudinary.com/",
    ],
    "style-src": [
      "'self' 'unsafe-inline'",
      "'nonce-gReCaptcha'",
      "https://fonts.googleapis.com/",
      "https://use.fontawesome.com/releases/v5.7.1/css/all.css",
      "https://fonts.gstatic.com",
    ],
    "script-src": [
      "'self'",
      "https://www.gstatic.com/recaptcha/",
      "https://www.google.com/recaptcha/",
      "https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
      "https://www.google.com/",
      "http://www.w3.org/",
    ],
    "frame-src": [
      "https://www.google.com/recaptcha/",
      "https://recaptcha.google.com/recaptcha/",
    ],
  },
};

const flash = require("connect-flash");
module.exports.flash = (req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
};
