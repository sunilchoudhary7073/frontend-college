const express=require("express")
const assineCourserouter=express.Router()
const AssinecourseController=require("../../controller/Admin/AssinecourseControlller")

const validate=require('../../middleware/validate')
const validation=require("../../validation/adminValidation/assinecourseValidation")


assineCourserouter.post('/AddCourse',validate(validation),AssinecourseController.Addcourse)
assineCourserouter.get('/viewAll',AssinecourseController.viewall)
assineCourserouter.get('/viewOne/:id',AssinecourseController.findOne)
assineCourserouter.put('/Upate-course/:id',validate(validation),AssinecourseController.update)
assineCourserouter.delete('/delete/:id',AssinecourseController.Delete)

module.exports=assineCourserouter

