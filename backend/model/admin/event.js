const mongoose = require("mongoose")
const eventSchema = new mongoose.Schema({
    eventTitle:String,
    tag:String,
    description:String,
    event_date:String,
    start_time:String,
    end_time:String,
    location:String,
    
   
}, { timestamps: true })

const event= mongoose.model("event", eventSchema)


module.exports = event