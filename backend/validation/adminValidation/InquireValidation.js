const joi=require("joi")

const InquireValidation=joi.object({

studentName:joi.string().required(),
    

email:joi.string().required(),

mobile:joi.string().required(),
courseName:joi.string().required(),
message:joi.string().required(),



})

module.exports=InquireValidation