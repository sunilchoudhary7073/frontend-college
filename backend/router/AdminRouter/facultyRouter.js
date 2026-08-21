const express = require("express")
const facultyrouter = express.Router()


const facultycontroller = require("../../controller/Admin/facultyController")
const validate = require("../../middleware/validate")
const facultyValidation = require("../../validation/adminValidation/facultyValidation")
const uplode=require("../../middleware/upload")

facultyrouter.post(
  "/add",
  uplode.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  validate(facultyValidation),
  facultycontroller.addfaculty
);
facultyrouter.get("/findOne/:id", facultycontroller.findFaculty)
facultyrouter.get("/ViewAll-desboard",facultycontroller.Viewdesboard)

facultyrouter.put("/update/:id",validate(facultyValidation),facultycontroller.updateFaculty)
facultyrouter.delete("/delete/:id",validate(facultyValidation),facultycontroller.deleteFaculty)
facultyrouter.get("/viewAll", facultycontroller.viewAllFaculty)
facultyrouter.patch("/status/:id", facultycontroller. updateStatus);




module.exports = facultyrouter