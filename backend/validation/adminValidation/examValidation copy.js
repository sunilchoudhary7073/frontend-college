const joi = require("joi")

const examValidation = joi.object({


    ExamName: joi.string().required(),
    ClassId: joi.string().required(),
    AcademicYear: joi.string().required(),
    StartDate: joi.date().required(),
    EndDate: joi.date().required(),
    MaxMarks: joi.number().required(),
    MinMarks: joi.number().required(),
})


module.exports = examValidation