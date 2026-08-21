const express = require("express")
const placementrouter = express.Router()


const placementController = require("../../controller/Admin/placementController")
const placementValidation = require("../../validation/adminValidation/placementValidation")
const validate = require("../../middleware/validate")


placementrouter.post("/AddPlacment", validate(placementValidation), placementController.addPlacement)
placementrouter.get("/find", placementController.getPlacements)
placementrouter.put("/update/:id", placementController.updatePlacement)
placementrouter.delete("/delete/:id", placementController.deletePlacement)
placementrouter.patch("/status/:id", placementController. updateStatus);


module.exports = placementrouter