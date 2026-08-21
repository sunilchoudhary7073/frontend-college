const express = require("express");
const contactrouter = express.Router();

const contactController = require("../../controller/Admin/contactController");
const contactValidation = require("../../validation/adminValidation/contactValidation");
const validate = require("../../middleware/validate");

contactrouter.post("/addcontact", validate(contactValidation), contactController.addContact);
contactrouter.get("/find/:id", contactController.findContact);
contactrouter.put("/update/:id", contactController.updateContact);
contactrouter.delete("/delete/:id", contactController.deleteContact);
contactrouter.get("/viewall", contactController.viewAllContact);

module.exports = contactrouter;