const mongoose=require('mongoose')
const mongooseSchema=new mongoose.Schema({
   subjectName: {
      type: String,
      required: true,
      trim: true,
    },

    subjectCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    credits: {
      type: Number,
      default: 0,
    },

    subjectType: {
      type: String,
      enum: ["Core", "Elective", "Practical"],
      default: "Core",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  })

  const Subject= mongoose.model("Subject",mongooseSchema)

  module.exports=Subject