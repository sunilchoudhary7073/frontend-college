const joi = require("joi")

const studentValidation = joi.object({


    StudentName: joi.string().required(),
    email: joi.string().email().required(),
    Phonenumber: joi.number().required(),
    Course:joi.string().required(),
    address: joi.string().required(),
    dob: joi.date().required(),
    password:joi.string()
})


module.exports = studentValidation