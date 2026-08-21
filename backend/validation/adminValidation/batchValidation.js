const joi = require("joi")

const BatchValidation = joi.object({

 batchName :joi.string().required(), 

courseName: joi.string().required(),
    session:joi.string().required(),
    semester:joi.number().required(),
    section:joi.string().required(),
    strength:joi.string().required(),
    classTeacher:joi.string().required(),
    startDate:joi.date().required(),
  endDate: joi.date().required(),
    





})


module.exports = BatchValidation