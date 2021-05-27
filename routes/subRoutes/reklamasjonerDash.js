//Node modules
const express = require("express");
const subRouter = express.Router();
//Controllers
const controller = require("../../controllers/reklamasjonDash");
//Middleware and utils
subRouter.use(controller.findReklamasjoner);

//Routes
subRouter.get("/", controller.renderReklamasjoner);

subRouter
  .route("/:id")
  .get(controller.findReklamasjon, controller.renderReklamasjon)
  .put(controller.findReklamasjon, controller.updateReklamasjon)
  .delete(controller.findReklamasjon, controller.deleteReklamasjon);

module.exports = subRouter;
