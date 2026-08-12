const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
   
    batchName: {
        type: String,
        required: true
    },

    courseName: {
        type: String,
        ref: "course",
        required: true
    },

    session: {
        type: String,
        required: true
    },

    semester: {
        type: Number,
        required: true
    },

    section: {
        type: String,
        required: true
    },

    strength: {
        type: Number,
        required: true
    },

    classTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher"
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;