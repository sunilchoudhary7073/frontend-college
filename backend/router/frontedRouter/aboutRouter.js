const express = require("express")
const aboutrouter = express.Router()

const aboutcontroller = require("../../controller/Fronted/aboutController")


aboutrouter.get("/aboutus", aboutcontroller.getAboutData)



module.exports = aboutrouter