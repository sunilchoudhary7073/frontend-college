const express=require("express")
const courserouter=express.Router();

const coursecontroller=require('../../controller/Admin/courseController')
const validate=require('../../middleware/validate')
const courseValidations=require('../../validation/adminValidation/courseValidation')

courserouter.get("/viewall", coursecontroller.viewAllCourse,)
courserouter.get("/viewallDeshboard", coursecontroller.Viewdesboard,)
courserouter.post("/add",validate(courseValidations), coursecontroller.addCourse)
courserouter.put("/update/:id", coursecontroller.updateCourse)
courserouter.delete("/delete/:id",validate(courseValidations),coursecontroller.deleteCourse)
courserouter.get('/findOne/:id',coursecontroller.findcourse)
courserouter.patch("/status/:id", coursecontroller. updateStatus);





module.exports=courserouter