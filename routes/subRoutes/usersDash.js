//Node modules
const express = require("express");
const subRouter = express.Router();

//Controllers
const controller = require("../../controllers/usersDash");

//Middleware
const { isAdmin } = require("../../middleware/auth");

//DB import & Layout
subRouter.use(controller.findUsers);

//Routes
subRouter.get("/", controller.renderUsers);

subRouter
  .route("/new")
  .get(controller.renderNewUserForm)
  .post(isAdmin, controller.saveNewUser);

subRouter
  .route("/:id")
  .get(controller.findUser, controller.renderUserProfile)
  .delete(controller.deleteUser)
  .put(controller.updateUserProfile);

subRouter.put(
  "/:id/password",
  controller.findUser,
  controller.updateUserPassword
);

module.exports = subRouter;
