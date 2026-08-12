const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema(
  {


     applicationNo: {
      type: String,
      unique: true,
    },
enrollmentNo: {
    type: String,
    unique: true,
    sparse: true
},
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    motherName: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: null,
    },

    nationality: {
      type: String,
      default: "Indian",
    },

  

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    alternateMobile: {
      type: String,
      default: null,
    },



    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },



    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },

    admissionType: {
      type: String,
      required: true,
    },

    academicSession: {
      type: String,
      required: true,
    },

    

    tenthBoard: {
      type: String,
      required: true,
    },

    tenthPercentage: {
      type: String,
      required: true,
    },

    tenthYear: {
      type: String,
      default: null,
    },

    twelfthBoard: {
      type: String,
      required: true,
    },

    twelfthPercentage: {
      type: String,
      required: true,
    },

    twelfthYear: {
      type: String,
      default: null,
    },

    graduation: {
      type: String,
      default: null,
    },

    graduationPercentage: {
      type: String,
      default: null,
    },


    fatherOccupation: {
      type: String,
      default: null,
    },

    motherOccupation: {
      type: String,
      default: null,
    },

    familyIncome: {
      type: String,
      default: null,
    },

    bloodGroup: {
      type: String,
      default: null,
    },

    domicile: {
      type: String,
      default: null,
    },

    disability: {
      type: String,
      default: null,
    },



    photo: {
      type: String,
      default: null,
    },

    signature: {
      type: String,
      default: null,
    },

    aadhaar: {
      type: String,
      default: null,
    },

    tenthMarksheet: {
      type: String,
      default: null,
    },

    twelfthMarksheet: {
      type: String,
      default: null,
    },

    graduationMarksheet: {
      type: String,
      default: null,
    },

  

    paymentMethod: {
      type: String,
      default: null,
    },

    transactionId: {
      type: String,
      default: null,
    },

 

    agreeTerms: {
      type: Boolean,
      default: false,
    },


   

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const admission = mongoose.model("admission", AdmissionSchema);

module.exports = admission;