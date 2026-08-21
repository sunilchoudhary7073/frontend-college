const express = require("express")
const Courserouter = express.Router()


const coursecontroller = require("../../controller/Fronted/courseController")



Courserouter.get("/ViewAll",coursecontroller.getAllCourse)
Courserouter.get("/detailsOne/:id", coursecontroller.getCourseById)



module.exports = Courserouter