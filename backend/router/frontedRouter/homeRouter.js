const express = require("express");
const homerouter = express.Router();
const homeController = require("../../controller/Fronted/homeController");
const validate = require("../../middleware/validate");
const homeValidation = require("../../validation/frontedValidation/homeValidation");



homerouter.post("/addbanner",validate(homeValidation.bannerValidation), homeController.addBanner);
homerouter.get("/findbanners",homeController.findAllBanner);
homerouter.post("/addwelcome",validate(homeValidation.welcomeValidation), homeController.addWelcomeMessage);
homerouter.get("/findmessages",homeController.findWelcomeMessage);
homerouter.post("/principalmessage",validate(homeValidation.principalValidation), homeController.addPrincipalMessage);
homerouter.get("/findprincipalmessage",homeController.findPrincipalMessage);
homerouter.post("/addevents",validate(homeValidation.eventValidation), homeController.addEvent);
homerouter.get("/findallevent",homeController.findAllEvents);





module.exports = homerouter;