
const joi = require("joi")

const feesValidation = joi.object({

    studentName: joi.string().required(),
    courseId: joi.string().required(),

    courseName: joi.string().required(),
    totalFees: joi.number().required(),
    paidAmount:joi.number().required(),
    dueAmount:joi.number().required(),
    // paymentMode:joi.string().required(),
    // paymentStatus:joi.string().required(),
    // transactionId:joi.string().required(),
    paymentDate:joi.string().required(),
    discount:joi.number().required(),
    status: joi.string().required(),


})


module.exports= feesValidation