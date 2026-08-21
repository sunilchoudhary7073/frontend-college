

const Course = require("../../model/admin/course"); 

// GET ALL COURSES
const getAllCourse = async (req, res) => {
  try {
    const courses=await Course.find({status: "Active"})

   console.log("Active Courses:", courses);
    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET COURSE BY ID
const getCourseById = async (req, res) => {
  try {
    const {id} = req.params
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllCourse,
  getCourseById,
};