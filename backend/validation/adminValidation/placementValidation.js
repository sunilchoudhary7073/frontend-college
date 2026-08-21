const joi = require("joi")

const placementValidation = joi.object({
    studentName: joi.string().required(),
    companyName: joi.string().required(),
  
    year: joi.number().required(),
  
})

module.exports = placementValidation