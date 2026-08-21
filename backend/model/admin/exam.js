const mongoose = require("mongoose")
const examSchema = new mongoose.Schema({
    examName: String,
    classId: String,
    academicYear:String,
    startDate:Date,
    endData:Date,
    maxMarks:Number,
    minMarks:Number
    
}, { timestamps: true })

const exam= mongoose.model("exam", examSchema)


module.exports = exam