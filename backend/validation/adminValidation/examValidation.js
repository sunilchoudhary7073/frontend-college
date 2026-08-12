const joi = require("joi")

const examValidation = joi.object({


    examName: joi.string().required(),
    classId:joi.string().required(),
    academicYear: joi.string().required(),
    startDate: joi.date().required(),
    endDate:joi.date().required(),
    maxMarks: joi.number().required(),
    minMarks: joi.number().required(),
})


module.exports = examValidation