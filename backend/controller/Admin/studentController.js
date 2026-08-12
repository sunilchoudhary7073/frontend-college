const student = require("../../model/admin/student")

const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwt");







const generatePassword = () => {
    const random4Digit = Math.floor(1000 + Math.random() * 9000);
    return `JAAT${random4Digit}`;
};

const addStudent = async (req, res) => {
    try {
        const { email } = req.body;

        // Check Email
        const existingStudent = await student.findOne({ email });

        if (existingStudent) {
            return res.status(409).json({
                status: false,
                message: "Email already exists",
            });
        }

        // Generate Random Password
        const plainPassword = generatePassword();

        console.log("Generated Password:", plainPassword);

        // Hash Password
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        console.log("Hash:", hashedPassword);

        // Upload Image
        const photo = req.file ? req.file.filename : "";

        // Save Student
        const studentData = await student.create({
            ...req.body,
            image: photo ? [photo] : [],
            password: hashedPassword,
        });

        return res.status(201).json({
            status: true,
            message: "Student added successfully",
            data: studentData,

            // Login ke liye ye password frontend ko bhej do
            loginCredentials: {
                email: studentData.email,
                password: plainPassword,
            },
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};




const findStudent  = async (req, res) => {
    try {
        const { id } = req.params
        const studentData = await student.findOne({ _id: id })
        res.json({
            status: true,
            statusCode: 200,
            message: "found student successfully",
            data: studentData
        })

    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "error"
        })
    }
}

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body
        const studentData = await student.updateOne({ _id: id }, updateData)
        res.json({
            status: true,
            statusCode: 200,
            message: "student updated successfully",
            data: studentData
        })
    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "error"
        })

    }
}

const deleteStudent = async (req, res) => {

    try {
        const { id } = req.params
        const studentData = await student.deleteOne({ _id: id })
        res.json({
            status: true,
            statuscode: 200,
            message: "student deleted successfully",
            data: studentData
        })
    } catch (error) {
        res.json({
            status: false,
            statuscode: 500,
            message: "error",
        })
    }
}

const viewAllStudent = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalStudents = await student.countDocuments();

  const studentData = await student
  .find()
  .populate({
    path: "Course",
    select: "courseName"
  })
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);

    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Student found successfully",
      data: studentData,

      currentPage: page,
      totalPages: Math.ceil(totalStudents / limit),
      totalStudents,
      limit,
      hasPrevPage: page > 1,
      hasNextPage: page < Math.ceil(totalStudents / limit),
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

const Viewdesboard = async (req, res) => {
  try {
    const studentData = await student.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      statusCode: 200,
      message: "Found all student successfully",
      data: studentData,
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

    const studentRes = await student.findById(id);

    if (!studentRes) {
      return res.status(404).json({
        status: false,
        message: "Student not found",
      });
    }

    studentRes.status =
      studentRes.status === "Active" ? "Inactive" : "Active";

    await studentRes.save();

    return res.status(200).json({
      status: true,
      message: "Status updated successfully",
      data: studentRes,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


const getEnrollmentTrends = async (req, res) => {
  try {
    const studentData = await student.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          students: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const data = months.map((month, index) => {
      const found = studentData.find(
        (item) => item._id === index + 1
      );

      return {
        month,
        students: found ? found.students : 0,
      };
    });

    return res.json({
      status: true,
      data,
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

 


module.exports = {
    addStudent,
    findStudent,
    updateStudent,
    deleteStudent,
    viewAllStudent,
    Viewdesboard,
    getEnrollmentTrends,
    updateStatus,
  
   
}
