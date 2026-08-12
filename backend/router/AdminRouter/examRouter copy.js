const express = require("express")
const examrouter = express.Router()

const examcontroller = require("../../controller/Admin/examController")
const examValidation = require("../../validation/adminValidation/examValidation")
const validate = require("../../middleware/validate")





examrouter.post("/add", validate(examValidation), examcontroller.addExam)
examrouter.get("/find/:id", examcontroller.findExam)
examrouter.put("/update/:id", examcontroller.updateExam)
examrouter.delete("/delete/:id", examcontroller.deleteExam)
examrouter.get("/viewall", examcontroller.viewAllExam)




module.exports = examrouter