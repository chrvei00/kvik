//Require
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const mongoose = require("mongoose");
const helmet = require("helmet");
const passport = require("passport");
const localStrategy = require("passport-local");
require("dotenv").config();
//Schema
const User = require("./models/userModel");
//Middleware
//Database setup
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error));
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DB"));
//App set
app.set("view engine", "ejs");
//App use (standard middleware)
app.use(helmet());
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
app.use(expressLayouts);
app.use(express.json());
//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Routes
const reklamasjonRoute = require("./routes/reklamasjonRoute");
app.use("/reklamasjon", reklamasjonRoute);
const dashboardRoute = require("./routes/dashboardRoute");
app.use("/dashboard", dashboardRoute);

//Launch server on Port
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
