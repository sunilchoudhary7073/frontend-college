const express = require("express");
const contactRouter = express.Router();

const contactController = require("../../controller/Fronted/contactController");

contactRouter.get("/list", contactController.getAllContact);

contactRouter.get("/details/:id", contactController.getContactById);

contactrouter.post("/addcontact", validate(contactValidation), contactController.addContact);

module.exports = contactRouter;