const fees = require("../../model/admin/fees")


const addFees = async (req, res) => {
  try {

    const {
      studentName,
      totalFees,
      discount,
      paidAmount,
    } = req.body;

    // Student ki latest fees check karo
    const oldFees = await fees
      .findOne({ studentName })
      .sort({ createdAt: -1 });

    // First time discount
    if (!oldFees) {
      req.body.dueAmount =
        Number(totalFees) -
        Number(discount) -
        Number(paidAmount);
    } else {
      // Second time discount not allowed
      req.body.discount = 0;

      // Due fees se payment chalegi
      req.body.totalFees = oldFees.dueAmount;

      req.body.dueAmount =
        Number(oldFees.dueAmount) -
        Number(paidAmount);
    }

    const feesData = await fees.create(req.body);

    res.json({
      status: true,
      message: "Fees added successfully",
      data: feesData,
    });

  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};


// 
const viewAllFees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

  
    const totalFees = await fees.countDocuments();

  
    const feesData = await fees.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Feesfound successfully",
      data: feesData,
      currentPage: page,
      totalPages: Math.ceil(totalFees / limit),
     totalFees,
      limit,
      hasPrevPage: page > 1,
      hasNextPage: page < Math.ceil(totalFees / limit),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message,
    });
  }
};

const updateFees = async (req, res) => {

  try {
    const{id} = req.params
    const updateData = req.body
    const feesData = await fees.updateOne({_id:id},updateData);
    res.json({
      message:"fees updated successfully",
      status:true,
      data:feesData
    })
    
  } catch (error) {
    res.json({
      message:"error"
    })
    
  }
}
const deletefees = async (req, res) => {
  try {
    const { id } = req.params;

    const feesData = await fees.deleteOne({ _id: id });

    res.json({
      message: "Fees deleted successfully",
      status: true,
      data: feesData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
}

const findOneFees = async (req, res) => {

  try {
    const{id} = req.params
    const feesData = await fees.findOne({_id:id});
    res.json({
      statuscode:200,
      message:"fees find successfully",
      status:true,
      data:feesData
    })
    
  } catch (error) {
    res.json({
      message:"error"
    })
    
  }
}




module.exports = {
    addFees,
    viewAllFees,
    updateFees,
    deletefees,
    findOneFees

}