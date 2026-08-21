const joi=require('joi')
const { applyTimestamps } = require('../../model/admin/course')

const courseValidation=joi.object({



    courseName:joi.string().required(),
    courseCode:joi.string().required(),
    department:joi.string().required(),
    duration:joi.string().required(),
    totalSemester:joi.number().required(),
    courseType:joi.string().required(),
    description:joi.string().required(),
    fees:joi.number().required()
  




})



module.exports=courseValidation