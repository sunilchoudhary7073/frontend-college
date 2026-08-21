const express = require("express");
const admissionrouter = express.Router();

const admissionController = require("../../controller/Fronted/admissionController");
const admissionValidation=require("../../validation/adminValidation/admissionValidation");

const validate =require("../../middleware/validate")

admissionrouter.get("/list", admissionController.getAdmissions);
admissionrouter.get("/details/:id", admissionController.getAdmissionById);
admissionrouter.post("/Add",validate(admissionValidation),admissionController.addAdmission)

module.exports = admissionrouter;