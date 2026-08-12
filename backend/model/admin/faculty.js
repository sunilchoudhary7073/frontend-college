const mongoose = require("mongoose")
const facultySchema = new mongoose.Schema({
  TeacherName: String,
  Email: String,
  PhoneNumber: Number,
  Department: String,
  Qualification: String,  
  Experience:String,
  gender:String,
image: {
  type: String
},
  status:String
 
},{
    timestamps: true
  })

 
const faculty= mongoose.model("faculty", facultySchema)


module.exports=faculty