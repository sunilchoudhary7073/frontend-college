const express=require("express")
const Inquirerouter=express.Router()
const InquireController=require('../../controller/Admin/InquireController')
const InquireValidation=require('../../validation/adminValidation/InquireValidation')
const validate=require('../../middleware/validate')

Inquirerouter.get('FindAll-Inquire',InquireController.ViewAll)
Inquirerouter.delete('/delete-Inquire',InquireController.Delete)
Inquirerouter.get('/ViewOne/:id',InquireController.findOne)








module.exports=Inquirerouter
