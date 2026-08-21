const joi = require("joi")

const noticeValidation = joi.object({

title:joi.string().required(),
description:joi.string().required(),
role:joi.number().required(),
 publishDate:joi.date().required(),
 expiryDate:joi.date().required(),
  category:joi.string().required(),
    
}, {
    timestamps:true
})


module.exports = noticeValidation