const express = require("express")
const noticerouter = express.Router()

const noticecontroller = require("../../controller/Admin/noticeController")
const noticeValidation = require("../../validation/adminValidation/noticeValidation")
const validate = require("../../middleware/validate")


noticerouter.post("/addnotice",validate(noticeValidation),noticecontroller.addNotice)
noticerouter.get("/findnotice/:id", noticecontroller.findNotice)
noticerouter.put("/updatenotice/:id",noticecontroller.updateNotice)
noticerouter.delete("/deletenotice/:id", noticecontroller.deleteNotice)
noticerouter.get("/viewallnotice", noticecontroller.viewAllNotice)




module.exports = noticerouter