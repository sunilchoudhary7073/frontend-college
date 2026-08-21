const joi =require("joi")
const { model } = require("mongoose")

const validation=joi.object({
   studentId:joi.string().required(),
   courseId:joi.array().required(),
     assignDate: joi.date().required(),
})

module.exports=validation