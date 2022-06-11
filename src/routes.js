const express = require("express");

const routes = express.Router();

const TeamController = require("./app/controllers/TeamController");
const CareerController = require("./app/controllers/CareerController");

routes.get("/members", TeamController.index);
routes.post("/members", TeamController.create);
routes.put("/members/:id", TeamController.update);
routes.delete("/members/:id", TeamController.delete);

routes.get("/careers", CareerController.index);
routes.post("/careers", CareerController.create);
routes.put("/careers/:id", CareerController.update);
routes.delete("/career/:id", CareerController.delete);

module.exports = routes;
