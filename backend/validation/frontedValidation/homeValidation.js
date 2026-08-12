const Joi = require("joi");

const bannerValidation = Joi.object({
  title: Joi.string().required(),
  subtitle: Joi.string().optional(),
  image: Joi.string().required(),
  link: Joi.string().optional()
});


const welcomeValidation = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required()
});


const principalValidation = Joi.object({
  name: Joi.string().required(),
  message: Joi.string().required(),
  image: Joi.string().optional()
});


const eventValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  startDate: Joi.date().required(),
    endDate: Joi.date().optional(),
 image:Joi.string().required()
  })


    module.exports = {
        bannerValidation,
        welcomeValidation,
        principalValidation,
        eventValidation
    }