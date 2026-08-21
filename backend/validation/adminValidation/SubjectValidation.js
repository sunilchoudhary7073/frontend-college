const joi = require("joi");

const SubjectValidation = joi.object({
    subjectName: joi.string().trim().required(),

    subjectCode: joi.string().trim().required(),

    courseId: joi.string().required(),

    semester: joi.number().required(),

    credits: joi.number().default(0),

    subjectType: joi.string()
        .valid("Core", "Elective", "Practical")
        .default("Core"),
});

module.exports = SubjectValidation;