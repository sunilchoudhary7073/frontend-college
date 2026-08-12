const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
courseName:String,
  courseCode:String,
  department:String,
  duration:String,
  totalSemester:Number,
  courseType:String, // UG, PG, Diploma
  description:String,
  fees:Number,
  status: {
    type: String,
    default: "Active"
  }
}, {
  timestamps: true


})

const course=mongoose.model('course', courseSchema)

module.exports=course