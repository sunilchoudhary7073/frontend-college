const express = require("express")
const batchrouter = express.Router()

const Batchcontroller = require("../../controller/Admin/batchController")

const validate = require("../../middleware/validate")
const BatchValidation = require("../../validation/adminValidation/batchValidation")

batchrouter.get("/viewAll",Batchcontroller.viewAll)
batchrouter.post("/add",validate(BatchValidation),Batchcontroller.addBatch)
batchrouter.get("/find/:id",Batchcontroller.findBatch)
batchrouter.put("/update/:id",Batchcontroller.updateBatch)
batchrouter.delete("/delete/:id",Batchcontroller.deleteBatch)
batchrouter.patch("/status/:id", Batchcontroller. updateStatus);







module.exports = batchrouter