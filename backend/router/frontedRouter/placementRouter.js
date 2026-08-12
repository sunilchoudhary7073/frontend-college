const express = require("express")
const placementrouter = express.Router()

const placementController = require("../../controller/Fronted/placementController")

placementrouter.get("/ViewAllPlacement", placementController.getPlacements);
placementrouter.get("/details/:id", placementController.getPlacementById);

module.exports = placementrouter