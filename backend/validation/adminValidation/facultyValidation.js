const joi = require("joi")
const facultyValidation = joi.object({

    TeacherName: joi.string().required(),
    Email: joi.string().required(),
    PhoneNumber: joi.number().required(),
    Department: joi.string().required(),
    Qualification: joi.string().required(),
      Experience:joi.string().required(),
  gender:joi.string().required(),

  
   



})

module.exports = facultyValidation