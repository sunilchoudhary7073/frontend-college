const express = require("express");

const authRouter = express.Router();

const authController = require("../../controller/Fronted/authControlller");
const authMiddleware = require("../../middleware/authMiddleware");

authRouter.post("/login", authController.login);

authRouter.post("/update_password", authController.updatepassword);

authRouter.post("/forgate_password", authController.forgetePassword);
authRouter.get("/profile",authMiddleware,authController.getProfile)


module.exports = authRouter;