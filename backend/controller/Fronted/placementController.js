
const placement = require("../../model/admin/placement");

// GET ALL
const getPlacements = async (req, res) => {
    try {
        const placementData = await placement.find();

        res.json({
            success: true,
            data: placementData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET BY ID
const getPlacementById = async (req, res) => {
    try {
        const { id } = req.params;

        const placementData = await placement.findById(id);

        if (!placementData) {
            return res.status(404).json({
                success: false,
                message: "Placement not found",
            });
        }

        res.json({
            success: true,
            data: placementData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getPlacements,
    getPlacementById,
};