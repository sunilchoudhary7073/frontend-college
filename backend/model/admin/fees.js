const mongoose = require("mongoose")
 const feesSchema = new mongoose.Schema({
  studentName: {
        type: String,
       
        required: true
    },

    courseName: {
        type: String,
       
        required: true
    },

    courseId: {
        type: String,
       
        required: true
    },
    discount:{
 type:Number,
 default:0
},

    paidAmount:Number,

    totalFees: {
        type: Number,
        required: true
    },

    dueAmount: {
        type: Number,
        default: 0,
        required:true
    },

    
    // paymentMode: {
    //     type: String,
    //     enum: ["Cash", "UPI", "Card", "Net Banking"],
    //     default: "Cash"
    // },

   //  paymentStatus: {
   //      type: String,
   //      enum: ["Pending", "Partial", "Paid"],
   //      default: "Pending"
   //  },

  

    paymentDate: {
        type: Date
    },
    status:String,

   },
    
{ timestamps: true });



 const fees = mongoose.model("fees", feesSchema)

 module.exports = fees