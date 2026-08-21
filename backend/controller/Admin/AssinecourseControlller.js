const Assigncourse=require("../../model/admin/AssineCourse")
const student = require("../../model/admin/student");
const course = require("../../model/admin/course");


const Addcourse = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { studentId, courseId } = req.body;

    // =========================
    // CHECK STUDENT
    // =========================

    const studentData = await student.findById(studentId);

    if (!studentData) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // =========================
    // CHECK COURSE
    // =========================

    const courseData = await course.findById(courseId);

    if (!courseData) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // =========================
    // CHECK DUPLICATE COURSE
    // =========================

    const alreadyAssigned = studentData.Course?.some(
      (id) => id.toString() === courseId.toString()
    );

    if (alreadyAssigned) {
      return res.status(400).json({
        success: false,
        message: "Course already assigned to this student",
      });
    }

    // =========================
    // SAVE ASSIGN COURSE
    // =========================

    const assignCourseData = await Assigncourse.create({
      studentId,
      courseId,
    });

    // =========================
    // ADD COURSE TO STUDENT
    // =========================

    if (!Array.isArray(studentData.Course)) {
      studentData.Course = [];
    }

    studentData.Course.push(courseId);

    await studentData.save();

    // =========================
    // GET UPDATED STUDENT
    // =========================

    const updatedStudent = await student
      .findById(studentId)
      .populate("Course");

    // =========================
    // RESPONSE
    // =========================

    return res.status(200).json({
      success: true,
      successcode: 200,
      message: "Course assigned successfully",
      data: {
        assignCourse: assignCourseData,
        student: updatedStudent,
      },
    });

  } catch (error) {
    console.log("ADD COURSE ERROR:", error);

    return res.status(500).json({
      success: false,
      successcode: 500,
      message: error.message,
    });
  }
};

// const Addcourse = async (req, res) => {
//   try {
//     console.log("REQ BODY:", req.body);

//     const assignCourseData = await Assigncourse.create(req.body);

//     res.json({
//       success: true,
//       successcode: 200,
//       message: "add course successfully",
//       data: assignCourseData,
//     });
//   } catch (error) {
//     console.log("ADD COURSE ERROR:", error);

//     res.json({
//       success: false,
//       successcode: 500,
//       message: "error",
//       error: error.message,
//     });
//   }
// };
const viewall = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalassignCourseData = await Assigncourse.countDocuments();

    const assignCourseData = await Assigncourse.find()
      .populate({
        path: "studentId",
        select: "StudentName",
      })
      .populate({
        path: "courseId",
        select: "courseName",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalassignCourseData / limit);

    res.json({
      success: true,
      successcode: 200,
      message: "find course successfully",
      data: assignCourseData,
      totalPages: totalPages,
      currentPage: page,
      total: totalassignCourseData,
    });
  } catch (error) {
    console.log("View Assign Course Error:", error);

    res.status(500).json({
      success: false,
      successcode: 500,
      message: "error",
      error: error.message,
    });
  }
};

const update=async (req,res)=>{
    try {
        const {id}=req.params
        const assignCourseData=await Assigncourse.updateOne({id:id})
        res.json({
            success:true,
            successcode:200,
            message:"update course successfully",
            data:assignCourseData
        })
    } catch (error) {
         res.json({
            success:false,
            successcode:500,
            message:"error",
            error:error.message
        })
    }
    };
const Delete=async (req,res)=>{
    try {
        const {id}=req.params
        const assignCourseData=await Assigncourse.deleteOne({id:id})
        res.json({
            success:true,
            successcode:200,
            message:"delete course successfully",
            data:assignCourseData
        })
    } catch (error) {
         res.json({
            success:false,
            successcode:500,
            message:"error",
            error:error.message
        })
    }
    };

    const findOne=async (req,res)=>{
    try {
        const {id}=req.params
        const assignCourseData=await Assigncourse.findOne({id:id})
        res.json({
            success:true,
            successcode:200,
            message:"find course successfully",
            data:assignCourseData
        })
    } catch (error) {
         res.json({
            success:false,
            successcode:500,
            message:"error",
            error:error.message
        })
    }
    };


    module.exports={
        Addcourse,viewall,update,Delete,findOne
    }