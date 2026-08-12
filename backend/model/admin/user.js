const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    password:String,
    address:String,
    dob:String,
      role: {
      type: String,
      enum: ["admin", "subadmin", "staff"],
      default: "staff",
    },
    image:String
})

const user = mongoose.model("user", userSchema)

module.exports = user