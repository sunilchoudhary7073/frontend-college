const joi = require("joi");

const admissionValidation = joi.object({

  applicationNo: joi.string(),

    fullName: joi.string().required(),

    fatherName: joi.string().required(),

    motherName: joi.string().required(),

    dob: joi.date().required(),

    gender: joi.string().required(),

    category: joi.string().allow(""),

    nationality: joi.string().allow(""),

    email: joi.string().email().required(),

    mobile: joi.string().required(),

    alternateMobile: joi.string().allow(""),

    address: joi.string().required(),

    city: joi.string().required(),

    state: joi.string().required(),

    pincode: joi.string().required(),

    courseId: joi.string().required(),

    admissionType: joi.string().required(),

    academicSession: joi.string().required(),

    tenthBoard: joi.string().required(),

    tenthPercentage: joi.string().required(),

    tenthYear: joi.string().allow(""),

    twelfthBoard: joi.string().required(),

    twelfthPercentage: joi.string().required(),

    twelfthYear: joi.string().allow(""),

    graduation: joi.string().allow(""),

    graduationPercentage: joi.string().allow(""),

    fatherOccupation: joi.string().allow(""),

    motherOccupation: joi.string().allow(""),

    familyIncome: joi.string().allow(""),

    bloodGroup: joi.string().allow(""),

    domicile: joi.string().allow(""),

    disability: joi.string().allow(""),

    paymentMethod: joi.string().allow(""),

    transactionId: joi.string().allow(""),

    agreeTerms: joi.boolean().required()

});

module.exports = admissionValidation;