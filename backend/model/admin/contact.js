const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        subject: String,
        message: String,
        status: {
            type: String,
            default: "Active",
        },
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;