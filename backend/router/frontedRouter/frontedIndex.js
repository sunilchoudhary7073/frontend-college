const express = require("express")
const router = express.Router()



const homerouter = require("./homeRouter")
const Courserouter = require("./CourseRouter")
const facultyrouter = require("./facultyRouter")
const aboutrouter = require("./aboutRouter")
const departmentrouter = require("./departmentRouter")
const admissionrouter = require("./admissionRouter")
const placementrouter = require("./placementRouter")
const Eventrouter=require('./Event')
const authRouter=require("./authRouter")
const inquireRouter=require('./InquireRouter')



router.use("/home", homerouter)
router.use("/Course", Courserouter)
router.use("/faculty", facultyrouter)
router.use("/about", aboutrouter)
router.use("/department", departmentrouter)
router.use("/admission", admissionrouter)
router.use("/placement", placementrouter)
router.use("/Event",Eventrouter)
router.use("/auth",authRouter)
router.use("/inquire",inquireRouter)

module.exports = router