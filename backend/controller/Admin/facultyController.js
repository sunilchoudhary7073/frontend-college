const faculty = require("../../model/admin/faculty")



const addfaculty = async (req,res) => {
    try {
        const {Email} = req.body
        const existingfaculty = await faculty.findOne({Email})
        if (existingfaculty){
            return res.json({
                status :false,
                statusCode:500,
                message:"faculty already exist"
            })
        }
         const image = req.files?.image?.[0]?.filename;
        const facultyData = await faculty.create({...req.body,image});
        
        res.status(201).json({
            status:true,
            message:"faculty added successfully",
            data:facultyData
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            message:"error",
            error:error.message
        })
    }
}

const findFaculty = async(req, res) => {
    try {
        const {id}=req.params
        const facultyData = await faculty.findOne({_id:id})
        res.status(201).json({
            status:true,
            message:"faculty found successfully",
            data:facultyData
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            message:"error"
        })
    }
}

const Viewdesboard=async(req,res)=>{
    try {
        const facultyData = await faculty.find().sort({createdAt: -1 })
        res.json({
            status:true,
            statusCode:200,
            message:"found all faculty successfully",
            data:facultyData
        })
    } catch (error) {
        res.json({
            status:false,
            statusCode:500,
            message:"error"
        })
    }
}

const updateFaculty = async( req, res) => {

try {
    const {id} = req.params
    const updateData = req.body

console.log("ID:", id);
console.log("Update Data:", updateData);

    const facultyData = await faculty.updateOne({_id:id}, updateData)
    res.json({
        status:true,
        message:"faculty upodated successfully",
        data:facultyData
    })

} catch (error) {
    res.json({
        status:false,
        message:"error"
    })
}

}

const deleteFaculty = async (req, res) => {
    try {
        const {id}=req.params
        const facultyData = await faculty.deleteOne({_id:id})
        res.json({
            status:true,
            statusCode:200,
            message:"faculty deleted successfully",
            data:facultyData
        })
    } catch (error) {
        res.json({
            status:false,
            statusCode:500,
            message:"error"
        })
    }
}


// const viewAllFaculty = async (req, res) => {
//     try {
//         const facultyData = await faculty.find().sort({createdAt: -1 })
//         res.json({
//             status:true,
//             statusCode:200,
//             message:"found all faculty successfully",
//             data:facultyData
//         })
//     } catch (error) {
//         res.json({
//             status:false,
//             statusCode:500,
//             message:"error"
//         })
//     }
// }
const viewAllFaculty = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

  
    const totalFaculty= await faculty.countDocuments();

  
    const facultyData = await faculty.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "facultyfound successfully",
      data: facultyData,
      currentPage: page,
      totalPages: Math.ceil(totalFaculty / limit),
      totalFaculty,
      limit,
      hasPrevPage: page > 1,
      hasNextPage: page < Math.ceil(totalFaculty / limit),
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

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const teacherData = await faculty.findById(id);

    if (!teacherData) {
      return res.status(404).json({
        status: false,
        message: "Teacher not found",
      });
    }

    teacherData.status =
      teacherData.status === "Active" ? "Inactive" : "Active";

    await teacherData.save();

    res.json({
      status: true,
      message: "Status updated successfully",
      data: teacherData,
    });

  } catch (error) {
    console.log(error); // <-- Ye console ka output bhi bhejna
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
    


module.exports = {
    addfaculty,
    findFaculty,
    updateFaculty,
    deleteFaculty,
    viewAllFaculty,
    Viewdesboard,
    updateStatus
}