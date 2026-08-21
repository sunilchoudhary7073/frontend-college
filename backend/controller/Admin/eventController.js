const event = require("../../model/admin/event")


const addevent = async (req, res) => {
    
    try {

        
       
        const eventData = await event.create(req.body)
        res.status(201).json({
            status: true,
            message: "event added successfully",
            data: eventData
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "error"
        })

    }
}



const updateevent = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body
        const eventData = await event.updateOne({ _id: id }, updateData)
        res.json({
            status: true,
            statusCode: 200,
            message: "event updated successfully",
            data:eventData
        })
    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "error"
        })

    }
}

const deleteevent = async (req, res) => {

    try {
        const { id } = req.params
        const eventData = await event.deleteOne({ _id: id })
        res.json({
            status: true,
            statuscode: 200,
            message: "event deleted successfully",
            data: eventData
        })
    } catch (error) {
        res.json({
            status: false,
            statuscode: 500,
            message: "error",
        })
    }
}

const viewAllevent = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // Total Events
    const totalEvents = await event.countDocuments();

    // Paginated Events
    const eventData = await event
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      status: true,
      statusCode: 200,
      message: "Events found successfully",
      data: eventData,
      currentPage: page,
      totalPages: Math.ceil(totalEvents / limit),
      totalEvents,
      limit,
      hasPrevPage: page > 1,
      hasNextPage: page < Math.ceil(totalEvents / limit),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error",
      error: error.message,
    });
  }
};


const viewOne = async (req, res) => {

    try {
        const { id } = req.params
        const eventData = await event.findOne({ _id: id })
        res.json({
            status: true,
            statuscode: 200,
            message: "event find successfully",
            data: eventData
        })
    } catch (error) {
        res.json({
            status: false,
            statuscode: 500,
            message: "error",
        })
    }
}


module.exports = {
    addevent,
    updateevent,
    deleteevent,
    viewAllevent,
    viewOne
}
