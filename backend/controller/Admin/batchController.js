const Batch = require("../../model/admin/batchModel")



const viewAll = async (req, res) => {

    try {

        
        const batchData = await Batch.find().sort({createdAt: -1 })
        res.json({
            message: "batch found succesfully",
            data: batchData
        })
    } catch (error) {
        res.json({
            message: "error"
        })

    }
}


const addBatch = async( req,res) => {
    try {
        const {batchName}=req.body
        const existingBatch=await Batch.findOne({batchName})
        if(existingBatch){
    return res.status(400).json({
        status:false,
        message:"Batch already exists"
    });
}

        const BatchData = await Batch.create(req.body)
        res.status(201).json({
            status:true,
            message:"batch added successfully",
            data:BatchData
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            error:error.message
        })
    }
}

const findBatch = async (req, res) => {

    try {
        const { id } = req.params
        const batchData = await Batch.findOne({ _id: id })
        res.json({
            message: "batch found succesfully",
            data: batchData
        })
    } catch (error) {
        res.json({
            message: "error"
        })

    }
}

const updateBatch = async (req, res) => {

    try {
        const { id } = req.params
        const updatedata = req.body
        const batchData = await Batch.updateOne({ _id: id }, updatedata)
        res.json({
            message: "updated batch succesfully",
            data: batchData
        })
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}

const deleteBatch = async (req, res) => {

    try {
        const { id } = req.params
        const batchData = await Batch.deleteOne({ _id: id })
        res.json({
            message: "batch deleted succesfully",
            data: batchData
        })
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Existing Fees
    const feesData = await fees.findById(id);

    if (!feesData) {
      return res.status(404).json({
        status: false,
        message: "Fees not found",
      });
    }

    // Toggle Status
    feesData.status =
      feesData.status === "Active" ? "Inactive" : "Active";

    await feesData.save();

    res.status(200).json({
      status: true,
      message: "Fees status updated successfully",
      data: feesData,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error updating status",
      error: error.message,
    });
  }
};

module.exports = {
    addBatch,
    findBatch,
    updateBatch,
    deleteBatch,
    viewAll,
    updateStatus
}