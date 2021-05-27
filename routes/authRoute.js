//Node modules
const express = require("express");
const router = express.Router();
//Controllers
const controller = require("../controllers/auth");
//Middleware
const { isLoggedIn } = require("../middleware/auth");

//Routes
router
  .route("/")
  .get(controller.renderLogin)
  .post(controller.authenticate, controller.redirectOnAuth);

router.get("/logout", controller.logOut);

module.exports = router;
