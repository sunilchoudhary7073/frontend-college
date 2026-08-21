const express=require("express")

const Eventrouter=express.Router()

const eventController=require('../../controller/Fronted/EventController')
const { modelName } = require("../../model/admin/user")

Eventrouter.get('/ViewAllEvent',eventController.viewallEvent)
Eventrouter.get("/viewOne/:id",eventController.findOne)

module.exports=Eventrouter

