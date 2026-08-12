const express=require('express')
const Subjectrouter=express.Router()

const SubjectController=require('../../controller/Admin/SubjectController')

const validate=require('../../middleware/validate')
const SubjectValidation=require('../../validation/adminValidation/SubjectValidation')

Subjectrouter.post('/addsubject',validate(SubjectValidation),SubjectController.AddSubject)
Subjectrouter.get('/ViewAll',SubjectController.ViewSbuject)
Subjectrouter.get('/ViewOne/:id',SubjectController.findone)
Subjectrouter.put('/update-subject/:id',validate(SubjectValidation),SubjectController.update)
Subjectrouter.delete('/delete/:id',SubjectController.Delete)

module.exports=Subjectrouter