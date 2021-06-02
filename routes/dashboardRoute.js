//Node modules
const express = require("express");
const router = express.Router();

//Controllers
const controller = require("../controllers/dashboard");

//middelware
router.use(controller.setUp);

//Subroutes
const usersSubRoute = require("./subRoutes/usersDash");
const reklamasjonerSubRoute = require("./subRoutes/reklamasjonerDash");
const { route } = require("./subRoutes/usersDash");

//Routes
router.get("/", controller.renderIndex);

router.put("/newNote", controller.addIndexNote);
router.delete("/:id", controller.deleteIndexNote);

router.use("/reklamasjoner", reklamasjonerSubRoute);
router.use("/users", usersSubRoute);

router.get("/statistikk", controller.redirectDashboard);

module.exports = router;
