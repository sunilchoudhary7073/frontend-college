
const {
        banner,
    welcomeMessage,
     principalMessage ,
     events
    } = require("../../model/fronted/home")


    const addBanner = async(req, res ) => {
        try {
            const bannerData = await banner.create(req.body)
            res.json({
                status: true,
                statusCode:200,
                message:"banner created successfully",
                data:bannerData
            })
        } catch (error) {
            res.json({
                status:false,
                statusCode:500,
                message:error.message
            })
            
        }
    }

    const findAllBanner = async(req,res) =>{
        try {
            const bannerData = await banner.find()
            res.json({
                status:true,
                statusCode:200,
                message:"found all banners successfully",
                data:bannerData
            })
        } catch (error) {
            res.json({
                status:false,
                statusCode:500,
                message:error.message
            })
        }
    }

// create welcome message

    const addWelcomeMessage = async (req, res) => {
  try {
    const welcomemessageData = await welcomeMessage.create(req.body);

    res.status(201).json({
      success: true,
      message: "Welcome message created",
      data:welcomemessageData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const findWelcomeMessage = async (req, res) => {
  try {
    const welcomemessageData = await welcomeMessage.find();

    res.status(200).json({
      success: true,
      message:"found welcome message successfully",
      data:welcomemessageData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



const addPrincipalMessage = async (req, res) => {
  try {
    const principalmessageData = await principalMessage.create(req.body);

    res.status(201).json({
      success: true,
      message: "Principal message created",
      data:principalmessageData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,

    });
  }
};



const findPrincipalMessage = async (req, res) => {
  try {
    const principalmessageData = await principalMessage.findOne();

    res.status(200).json({
      success: true,
      data:principalmessageData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const addEvent = async (req, res) => {
  try {
    const newEvent = await events.create(req.body);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const findAllEvents = async (req, res) => {
  try {
    const Events = await events.find().sort({ startDate: 1 });

    res.status(200).json({
      success: true,
      data: Events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

























module.exports= {
    addBanner,
    findAllBanner,
    addWelcomeMessage,
    findWelcomeMessage,
    addPrincipalMessage,
    findPrincipalMessage,
    addEvent,
    findAllEvents
}