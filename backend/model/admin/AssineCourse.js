const mongoose=require("mongoose")


const assignCourseSchema = new mongoose.Schema(
  {
  studentId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "student",
  required: true,
},

   courseId: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
],

    assignDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);
const Assigncourse=mongoose.model("Assigncourse",assignCourseSchema)

module.exports =Assigncourse

