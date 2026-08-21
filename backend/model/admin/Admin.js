const mongoose = require("mongoose")

const mongooseSchema = new mongoose.Schema({
    full_Name: String,
    email: String,
    phone: Number,
    password: String,
  



    oldPassword:String,
    newPassword:String,
    confirmPassword:String,


    NewPassword:String,







})

const Admin = mongoose.model("Admin", mongooseSchema)

module.exports = Admin