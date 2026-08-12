const placement = require("../../model/admin/placement")



const addPlacement = async (req, res) => {
    try {
        const { studentName, companyName } = req.body;
        const existing = await placement.findOne({
            studentName,
            companyName

        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "This placement record already exists"
            });
        }


        const placementData = await placement.create({
            studentName,
            companyName


        });

        return res.status(201).json({
            success: true,
            message: "Placement created successfully",
            data: placementData
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};






























const getPlacements = async (req, res) => {
    try {
        const placementData = await placement.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: placementData
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const updatePlacement = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body

        const Placement = await placement.findById(id);

        if (!Placement) {
            return res.status(404).json({
                success: false,
                message: "Placement not found"
            });
        }
        const placementData = await placement.findByIdAndUpdate(id, updateData);

        return res.status(200).json({
            success: true,
            message: "Placement updated successfully",
            data: placementData
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
























const deletePlacement = async (req, res) => {
    try {
        const { id } = req.params
        const placementData = await placement.deleteOne({ _id: id })
        res.json({
            status: true,
            statusCode: 200,
            message: "placement deleted successfully",
            data: placementData
        })
    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "error"
        })
    }
}

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const placementRes = await placement.findById(id);

    if (!placementRes) {
      return res.status(404).json({
        status: false,
        message: "Student not found",
      });
    }

    placementRes.status =
      placementRes.status === "Active" ? "Inactive" : "Active";

    await placementRes.save();

    return res.status(200).json({
      status: true,
      message: "Status updated successfully",
      data: placementRes,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
    addPlacement,
    getPlacements,
    updatePlacement,
    deletePlacement,
    updateStatus
}
