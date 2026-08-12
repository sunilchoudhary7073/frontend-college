const express = require("express");
const departmentrouter = express.Router();

const departmentcontroller = require("../../controller/Fronted/departmentController")

departmentrouter.get("/list", departmentcontroller.getAllDepartments);


departmentrouter.get("/details/:id", departmentcontroller.getDepartmentById);

module.exports = departmentrouter;