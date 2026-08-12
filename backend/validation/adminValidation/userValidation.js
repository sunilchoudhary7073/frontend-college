const joi = require("joi")
const { applyTimestamps } = require("../../model/admin/user")

const userValidation = joi.object({


    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.number().required(),
    password:joi.string().required(),
    address: joi.string().required(),
    dob: joi.string().required(),
},{Timestamps:true})



module.exports=userValidation