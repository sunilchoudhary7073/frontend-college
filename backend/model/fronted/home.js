const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    image: String,
    link: String
}, { timestamps: true });

const WelcomeMessageSchema = new mongoose.Schema({
    title: String,
    message: String
}, { timestamps: true });

const PrincipalMessageSchema = new mongoose.Schema({
    name: String,
    message: String,
    image: String
}, { timestamps: true });

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    image: String
}, { timestamps: true });


const banner = mongoose.model("banner",bannerSchema)
const welcomeMessage = mongoose.model("welcomeMessage",WelcomeMessageSchema)
const principalMessage = mongoose.model("principalMessage",PrincipalMessageSchema)
const events = mongoose.model("events",eventSchema)


module.exports = {
    banner,
    welcomeMessage,
     principalMessage ,
     events

}