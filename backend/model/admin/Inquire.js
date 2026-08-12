const mongoose=require('mongoose')
const mongooseSchema=new mongoose.Schema({
studentName:{
    type:String,
    
},
email:{
    type:String
},
mobile:{
    type:String
},
courseName:{
    type:String
},
message:{
    type:String
}
})

const Inquire=mongoose.model("Inquire",mongooseSchema)

module.exports=Inquire
