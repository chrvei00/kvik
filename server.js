//devIntegrations
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
//Require
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const mongoose = require("mongoose");
const helmet = require("helmet");
const passport = require("passport");
const localStrategy = require("passport-local");
const flash = require("connect-flash");
const path = require("path");
//Schema
const User = require("./models/userModel");
//Middleware
const { isLoggedIn } = require("./middleware/auth");
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
//App use (standard middleware)
app.use(
  "/static",
  express.static(path.join(__dirname, "../public/"), {
    dotfiles: "ignore",
    etag: true,
    extensions: "ejs",
    index: false,
    maxAge: "7d",
    redirect: false,
  })
);
//App set
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(
  session({
    name: "session",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(express.json());
//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Routes
app.get("/", (req, res) => {
  res.redirect("/dashboard");
});
const reklamasjonRoute = require("./routes/reklamasjonRoute");
app.use("/reklamasjon", reklamasjonRoute);
const dashboardRoute = require("./routes/dashboardRoute");
app.use("/dashboard", isLoggedIn, dashboardRoute);
const authRoute = require("./routes/authRoute");
app.use("/auth", authRoute);
//Launch server on Port
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
