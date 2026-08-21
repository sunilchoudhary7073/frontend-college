const express = require("express")
const examrouter = express.Router()

const examcontroller = require("../../controller/Admin/examController")
const examValidation = require("../../validation/adminValidation/examValidation")
const validate = require("../../middleware/validate")





examrouter.post("/addexam",validate(examValidation),examcontroller.addExam)
examrouter.get("/findexam/:id", examcontroller.findExam)
examrouter.put("/updateexam/:id",examcontroller.updateExam)
examrouter.delete("/deleteexam/:id", examcontroller.deleteExam)
examrouter.get("/viewallexam", examcontroller.viewAllExam)




module.exports = examrouter