const express = require("express")
const eventrouter = express.Router()

const eventcontroller = require("../../controller/Admin/eventController")
const eventValidation = require("../../validation/adminValidation/eventValidation")
const validate = require("../../middleware/validate")
const upload = require("../../middleware/upload")


eventrouter.post("/addEvent",validate(eventValidation),eventcontroller.addevent)
eventrouter.put("/updateevent/:id",validate(eventValidation),eventcontroller.updateevent)
eventrouter.delete("/deleteEvent/:id",eventcontroller.deleteevent)
eventrouter.get("/viewallevent", eventcontroller.viewAllevent)
eventrouter.get("/ViewOne/:id", eventcontroller.viewOne)




module.exports = eventrouter