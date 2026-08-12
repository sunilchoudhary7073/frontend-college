const Joi = require("joi");

const contactValidation = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
});

module.exports = contactValidation;