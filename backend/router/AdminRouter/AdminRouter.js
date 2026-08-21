const express = require("express")
const adminrouter = express.Router();

const Admincontroller = require('../../controller/Admin/Admincontroller')
const { registerValidation, loginValidation ,updatepasswordValidation,forgetePasswordValidation} = require('../../validation/adminValidation/adminValidation')

const validate = require('../../middleware/validate')

const Tokenverify = require('../../middleware/veriifyToken')

adminrouter.post('/register', validate(registerValidation),  Admincontroller.register)
adminrouter.post('/login', validate(loginValidation),  Admincontroller.login)
adminrouter.put('/update_password/:id',validate(updatepasswordValidation), Admincontroller.updatepassword)
adminrouter.delete('/forgate_password/:value',validate(forgetePasswordValidation), Admincontroller.forgetePassword)



module.exports = adminrouter