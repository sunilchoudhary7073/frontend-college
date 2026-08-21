const express = require("express")
const studentrouter = express.Router()

const controller = require("../../controller/Admin/studentController")
const studentValidation = require("../../validation/adminValidation/studentValidation")
const validate = require("../../middleware/validate")
const upload = require("../../middleware/upload")


studentrouter.post("/add",upload.single("image"),validate(studentValidation),controller.addStudent)
studentrouter.get("/findstudent/:id", controller.findStudent)

studentrouter.get("/findstudent-deshboard", controller.Viewdesboard)
studentrouter.get("/enrollment-trends", controller.getEnrollmentTrends)
studentrouter.put("/updatestudent",validate(studentValidation),controller.updateStudent)
studentrouter.delete("/deletestudent/:id",validate(studentValidation), controller.deleteStudent)
studentrouter.get("/viewall", controller.viewAllStudent)


studentrouter.patch("/status/:id", controller. updateStatus);





module.exports = studentrouter