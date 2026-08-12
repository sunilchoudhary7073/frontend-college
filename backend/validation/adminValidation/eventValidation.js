const joi = require("joi")

const eventValidation = joi.object({


    eventTitle: joi.string().required(),
    tag:joi.string().required(),
    description:joi.string().required(),
    event_date: joi.string().required(),
    start_time: joi.string().required(),
    end_time:joi.string().required(),
    location: joi.string().required(),
    
})


module.exports =eventValidation
