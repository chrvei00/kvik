//Require
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();
//Schema
const userSchema = require("./models/userSchema");
//Middleware
//Database setup
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DB"));
//App set
app.set("view engine", "ejs");
//App use (standard middleware)
app.use(
  express.static("public", {
    dotfiles: "ignore",
    etag: true,
    extensions: "ejs",
    index: false,
    maxAge: "7d",
    redirect: false,
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(expressLayouts);
app.use(express.json());
//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//User Admin:
// const admin = new userSchema({
//   name: "admin",
//   email: "chrvei00@gmail.com",
//   pwd: "admin",
//   permission: { feedback: true, reklamasjon: true, user: true },
// });
passport.deserializeUser((id, done) => {
  admin.findById(id, (err, user) => {
    done(err, user);
  });
});
passport.use(
  new localStrategy((username, password, done) => {
    admin.findOne({ name: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.pwd, (err, res) => {
        if (err) return done(err);
        if (res == false) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      });
    });
  })
);
//Routes
const homeRoute = require("./routes/homeRoute");
app.use("/", homeRoute);
const feedbackRoute = require("./routes/feedbackRoute");
app.use("/feedback", feedbackRoute);
const reklamasjonRoute = require("./routes/reklamasjonRoute");
app.use("/reklamasjon", reklamasjonRoute);
const kontaktRoute = require("./routes/kontaktRoute");
app.use("/kontakt", kontaktRoute);
const dashboardRoute = require("./routes/dashboardRoute");
app.use("/dashboard", dashboardRoute);

//Launch server on Port
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
