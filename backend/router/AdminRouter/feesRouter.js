const express = require("express")
const feesrouter = express.Router()

const feescontroller = require("../../controller/Admin/feesController")
const feesValidation = require("../../validation/adminValidation/feesValidation")
const validate = require("../../middleware/validate")

feesrouter.post("/add",validate(feesValidation),feescontroller.addFees)
feesrouter.get("/viewAll",feescontroller.viewAllFees)
feesrouter.put("/updatefees/:id",feescontroller.updateFees)
feesrouter.delete("/delete/:id",feescontroller.deletefees)
feesrouter.get("/find/:id",feescontroller.findOneFees)







module.exports = feesrouter