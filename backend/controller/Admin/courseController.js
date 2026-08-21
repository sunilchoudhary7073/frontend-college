const course = require('../../model/admin/course')


// const viewAllcourse = async (req, res) => {
//     try {
//         const courseData = await course.find()
//         res.json({
//             status: true,
//             message: "course found successfully",
//             data: courseData
//         })
//     } catch (error) {
//         res.json({
//             status: false,
//             message: "error",
//             error: error.message
//         })
//     }
// }
const viewAllCourse = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

  
    const totalCourse = await course.countDocuments();

  
    const courseData = await course.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Course found successfully",
      data: courseData,
      currentPage: page,
      totalPages: Math.ceil(totalCourse / limit),
      totalCourse,
      limit,
      hasPrevPage: page > 1,
      hasNextPage: page < Math.ceil(totalCourse / limit),
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

const Viewdesboard = async (req, res) => {
  try {
    const courseData = await course.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      statusCode: 200,
      message: "Found all courses successfully",
      data: courseData,
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

const addCourse = async (req, res) => {
    try {
        const { courseName } = req.body
        const existingcourse = await course.findOne({ courseName })
        if (existingcourse) {
            return res.status(400).json({
                status: false,
                message: "course already exists"
            });
        }
    
        const courseData = await course.create(req.body)
    res.json({

        status: true,
        message: "course added successfully",
        data: courseData
    })
} catch (error) {
    res.json({
        status: false,
        message: "error",
        error: error.message
    })
}
}


const updateCourse = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body
        const courseData = await course.updateOne({ _id: id }, updateData)
        res.json({
            status: true,
            message: "update course successfully",
            data: courseData
        })
    } catch (error) {
        res.json({
            status: false,
            message: "error",
            error: error.message
        })
    }
}

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params
        const courseData = await course.deleteOne({ _id: id })
        res.json({
            status: true,
            message: "delete course successfully",
            data: courseData
        })
    } catch (error) {
        res.json({
            status: false,
            message: "error",
            error: error.message
        })
    }
}

const findcourse = async (req, res) => {
    try {
        const { id } = req.params
        const courseData = await course.findOne({ _id: id }, req.body)
        res.json({
            status: true,
            message: "course found successfully",
            data: courseData
        })
    } catch (error) {
        res.json({
            status: false,
            message: "error",
            error: error.message
        })
    }
}

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Existing Fees
    const courseData = await course.findById(id);

    if (!courseData) {
      return res.status(404).json({
        status: false,
        message: "course not found",
      });
    }

    // Toggle Status
    courseData.status =
      courseData.status === "Active" ? "Inactive" : "Active";

    await courseData.save();

    res.status(200).json({
      status: true,
      message: "course status updated successfully",
      data: courseData,
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
    viewAllCourse,
    addCourse,
    updateCourse,
    deleteCourse,
    findcourse,
    Viewdesboard,
    updateStatus
}