const mongoose = require("mongoose")

const placementSchema = new mongoose.Schema({
    studentName: String,
    companyName: String,
   
    year: Number,
    status: String
},
    { timestamps: true }
)

const placement = mongoose.model("placement", placementSchema)

module.exports = placement