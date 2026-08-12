const express = require("express")
const admissionrouter = express.Router()

const admissioncontroller = require("../../controller/Admin/admissionController")
const admissionValidation = require ("../../validation/adminValidation/admissionValidation")
const validate = require ("../../middleware/validate")

const upload=require("../../middleware/upload")
const admission = require("../../model/admin/admission")


admissionrouter.post("/Addadmission",    upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: "aadhaar", maxCount: 1 },
    { name: "tenthMarksheet", maxCount: 1 },
    { name: "twelfthMarksheet", maxCount: 1 },
    { name: "graduationMarksheet", maxCount: 1 },
  ]),validate(admissionValidation),admissioncontroller.addAdmission)
admissionrouter.get("/findOne/:id",admissioncontroller.findAdmission)
// admissionrouter.put("/updateadmission/:id",validate(admissionValidation), admissioncontroller.approveAdmission);
admissionrouter.put("/approve/:id",admissioncontroller. approveAdmission);
admissionrouter.put("/reject/:id",admissioncontroller. rejectAdmission);
admissionrouter.get("/ViewAll",admissioncontroller.findAllAdmission)
admissionrouter.delete("/delete/:id", admissioncontroller. deleteaAdmission);
// admissionrouter.patch("/status/:id", admissioncontroller. updateStatus);



module.exports = admissionrouter