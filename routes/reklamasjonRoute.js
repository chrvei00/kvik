//Node Modules
const express = require("express");
const router = express.Router();
//Controllers
const controller = require("../controllers/reklamasjon");
//Middleware
const { validateReklamasjon } = require("../middleware/validate");
//Routes
router
  .route("/")
  .get(controller.renderForm)
  .post(
    controller.sendReklamasjonBilder,
    validateReklamasjon,
    controller.sendReklamasjon
  );

module.exports = router;
