const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
   admissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admission"
},

applicationNo: {
    type: String
},

enrollmentNo: {
    type: String,
    unique: true,
    required: true
},

StudentName: {
    type: String
},

Phonenumber: {
    type: String
},

email: {
    type: String
},

address: {
    type: String
},

Course: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "course"
}
],
dob: {
    type: Date
},

password: {
    type: String
},
status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
}, { timestamps: true })

const student = mongoose.model("student", studentSchema)


module.exports = student