const express = require("express")
const userRouter = express.Router()

const controller = require("../../controller/Admin/userController")
const userValidation = require("../../validation/adminValidation/userValidation")
const validate = require("../../middleware/validate")
const upload = require("../../middleware/upload")


userRouter.post("/adduser",upload.single("image"),validate(userValidation),controller.addUser)
userRouter.get("/viewuser/:id", controller.viewUser)
userRouter.put("/updateuser/:id",controller.updateUser)
userRouter.delete("/deleteuser/:id", controller.deleteUser)
userRouter.get("/viewalluser", controller.viewAllUser)




module.exports = userRouter