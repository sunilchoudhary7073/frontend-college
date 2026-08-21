const mongoose = require("mongoose")
const noticeSchema = new mongoose.Schema({


    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    role: {
        type: Number,
        enum: [1, 2, 3], // 1=Teacher,2=Student,3=All
        required: true,
    },

    publishDate: {
        type: Date,
        required: true,
    },

    expiryDate: {
        type: Date,
        required: true,
    },

   //  attachment: {
   //      type: String,
   //      default: "",
   //  },
    category: String,

    status: {
        type: String,
        
    }
},
{
    timestamps: true,
});

const notice = mongoose.model("notice", noticeSchema)


module.exports = notice