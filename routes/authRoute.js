//Node modules
const express = require("express");
const router = express.Router();
//Controllers
const controller = require("../controllers/auth");
//Middleware
const { isLoggedIn } = require("../middleware/auth");
const { validateLogin } = require("../middleware/validate");

//Routes
router
  .route("/")
  .get(controller.renderLogin)
  .post(validateLogin, controller.authenticate);

router.get("/logout", isLoggedIn, controller.logOut);

module.exports = router;
