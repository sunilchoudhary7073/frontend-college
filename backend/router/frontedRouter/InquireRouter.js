const express=require('express')
const inquireRouter=express.Router();

const InquireController=require('../../controller/Fronted/InquireController')
const InquireValidation=require('../../validation/adminValidation/InquireValidation')
const Validate=require('../../middleware/validate');


inquireRouter.post('/AddInquire',Validate(InquireValidation),InquireController.Addinquire)
inquireRouter.get('/ViewAllInquire',InquireController.ViewAll)
inquireRouter.delete('/delete-Inquire/:id',InquireController.Delete)


module.exports=inquireRouter
