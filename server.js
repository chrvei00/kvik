//  --  --  --  DEPENDENCIES  --  --  --  //

//Controllers
//devIntegrations
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Node Modules
//  EXPRESS
const express = require("express");
const app = express();
const session = require("express-session");
//  MONGO
const mongoose = require("mongoose");
//  SECURITY
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
//  AUTH
const passport = require("passport");
const localStrategy = require("passport-local");
//ERROR
const flash = require("connect-flash");
//  OTHER
const path = require("path");
const methodOverride = require("method-override");
const expressLayout = require("express-ejs-layouts");

//Controllers
const controller = require("./controllers/serverController");

//Models
const User = require("./models/userModel");

//Middleware and utils
const { isLoggedIn } = require("./middleware/auth");
const { eError, catchError } = require("./middleware/error");

//  --  --  --  APP CONFIG  --  --  --  //

//App INIT

//  Database init
const dbUrl =
  "mongodb+srv://admin:admin@cluster0.hz1aa.mongodb.net/mydatabase?retryWrites=true&w=majority";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
  .on("error", (error) => {
    throw new Error(error);
  })
  .once("open", () => {
    console.log("Connected to database");
  });

//  Express setup
app.set("view engine", "ejs");
app.use(
  express.static(path.join(__dirname, "public"), controller.staticOptions)
);
app.use(session(controller.sessionOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Security
app.use(helmet());
app.use(helmet.contentSecurityPolicy(controller.helmetCSPOptions));
app.use(mongoSanitize());

//ERROR
app.use(flash());
app.use(controller.flash);

//  Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//OTHER
app.use(methodOverride("_method"));
app.use(expressLayout);

//  --  --  --  ROUTES  --  --  --  //

//  Index
app.get("/", (req, res) => {
  res.redirect("/auth");
});
//  Reklamasjon
const reklamasjonRoute = require("./routes/reklamasjonRoute");
app.use("/reklamasjon", reklamasjonRoute);
//  Dashboard
const dashboardRoute = require("./routes/dashboardRoute");
app.use("/dashboard", dashboardRoute);
//  Auth
const authRoute = require("./routes/authRoute");
app.use("/auth", authRoute);

//  --  --  --  Errorhandling --  --  --  //

//  Catch All
app.all("*", (req, res, next) => {
  next(new eError("Not found", 404));
});

//  ErrorMiddleware
app.use(catchError);

//Ready for Launch
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
