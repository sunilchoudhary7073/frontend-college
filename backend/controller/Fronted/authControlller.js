const student = require("../../model/admin/student") 


const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwt");








const login = async (req, res) => {
    try {
        const { enrollmentNo, password } = req.body;

        // Check request
        if (!enrollmentNo || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and Password are required"
            });
        }

        // Find Student
        const studentData = await student.findOne({ enrollmentNo });

        if (!studentData) {
            return res.status(404).json({
                status: false,
                message: "Student not found"
            });
        }

        // Debug Logs
        console.log("Student Data:", studentData);
        console.log("Request Password:", password);
        console.log("DB Password:", studentData.password);

        // Check Password Exists
        if (!studentData.password) {
            return res.status(400).json({
                status: false,
                message: "Password not found in database"
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, studentData.password);

        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({
                status: false,
                message: "Invalid Password"
            });
        }

        // Generate Token
        const token = await generateToken({
            id: studentData._id,
            enrollmentNo: studentData.enrollmentNo,
            role: "student"
        });

        return res.status(200).json({
            status: true,
            message: "Student Login Successfully",
            token,
            data: studentData
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const updatepassword = async (req, res) => {
    try {
        const userRes = await user.findById(req.params.id);

        const {
            oldPassword,
            newPassword,
            confirmPassword
        } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New Password and Confirm Password do not match"
            });
        }



        if (!userRes) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old Password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        userRes.password = hashedPassword;

        await userRes.save();

        res.status(200).json({
            success: true,
            message: "Password Updated Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




const forgetePassword = async (req, res) => {
  try {
    const { value } = req.params;
    const { NewPassword } = req.body;

    const userRes = await user.findOne({$or:[{ email:value }, { contact_number:value}]
});

    if (!userRes) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const hashedPassword = await bcrypt.hash(NewPassword, 10);

    userRes.password = hashedPassword;

    await userRes.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getProfile = async (req, res) => {
    try {
        console.log("USER:", req.user);

        const user = await student.findById(req.user.id)
            .select("-password")
            .populate("Course");

        console.log("PROFILE DATA:", user);

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        console.log("PROFILE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};






module.exports={
    login,
    forgetePassword,
    updatepassword,
    getProfile
}