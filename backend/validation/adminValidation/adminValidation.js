const joi = require("joi")

const registerValidation = joi.object({

    full_Name: joi.string().required(),
    phone: joi.number().required(),
    email: joi.string().required(),
    password: joi.string().required(),
      role: {
    type: String,
    default: "admin"
  }

})


const loginValidation = joi.object({

    email: joi.string().required(),
    password: joi.string().required(),


})
const updatepasswordValidation=joi.object({
      oldPassword:joi.string().required(),
    newPassword:joi.string().required(),
    confirmPassword:joi.string().required(),
})

const forgetePasswordValidation=joi.object({
     NewPassword:joi.string().required(),
})


module.exports = { registerValidation, loginValidation, forgetePasswordValidation,updatepasswordValidation }