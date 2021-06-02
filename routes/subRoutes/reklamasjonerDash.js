//Node modules
const express = require("express");
const subRouter = express.Router();
//Controllers
const controller = require("../../controllers/reklamasjonDash");
//Middleware and utils
subRouter.use(controller.findReklamasjoner);

//Routes
subRouter.get("/", controller.redirectUferdigReklamasjoner);
subRouter.get("/arkivert", controller.renderArkivertReklamasjoner);
subRouter.get("/uferdig", controller.renderUferdigReklamasjoner);

subRouter
  .route("/:id")
  .get(controller.findReklamasjon, controller.renderReklamasjon)
  .put(controller.findReklamasjon, controller.updateReklamasjon)
  .delete(controller.findReklamasjon, controller.deleteReklamasjon);

subRouter.put("/:id/newNote", controller.findReklamasjon, controller.addNote);
subRouter.delete(
  "/note/:id/:noteId",
  controller.findReklamasjon,
  controller.removeNote
);

module.exports = subRouter;
