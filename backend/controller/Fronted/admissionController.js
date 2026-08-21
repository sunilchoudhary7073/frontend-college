const admission = require("../../model/admin/admission");
const { message } = require("../../validation/adminValidation/placementValidation");



const addAdmission=async(req,res)=>{
    try {
        const admissionData= await admission.create(req.body)
        res.json({
            succes:true,
            successcode:200,
            message:"add admission successfully",
            data:admissionData
        })
    } catch (error) {
          res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
// GET ALL
const getAdmissions = async (req, res) => {
    try {
        const admissionData = await admission.find();

        res.json({
            success: true,
            data: admissionData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET BY ID
const getAdmissionById = async (req, res) => {
    try {
        const { id } = req.params;

        const admissionData = await admission.findById(id);

        if (!admissionData) {
            return res.status(404).json({
                success: false,
                message: "Admission not found",
            });
        }

        res.json({
            success: true,
            data: admissionData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAdmissions,
    getAdmissionById,addAdmission
};