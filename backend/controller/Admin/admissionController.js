const admission = require("../../model/admin/admission");
const student = require("../../model/admin/student")
const bcrypt = require("bcrypt");


const addAdmission = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);

    const { email } = req.body;

    // Check existing email
    const existingEmail = await admission.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Admission already exists",
      });
    }

    // Generate JAAT Application Number
    const random = Math.floor(100000 + Math.random() * 900000);
    const applicationNo = `JAAT-${random}`;

    // Files
    const photo =
      req.files?.photo?.[0]?.filename || null;

    const signature =
      req.files?.signature?.[0]?.filename || null;

    const aadhaar =
      req.files?.aadhaar?.[0]?.filename || null;

    const tenthMarksheet =
      req.files?.tenthMarksheet?.[0]?.filename || null;

    const twelfthMarksheet =
      req.files?.twelfthMarksheet?.[0]?.filename || null;

    const graduationMarksheet =
      req.files?.graduationMarksheet?.[0]?.filename || null;

    // Create Admission
    const admissionData = await admission.create({
      ...req.body,

      // Application Number
      applicationNo,

      // Documents
      photo,
      signature,
      aadhaar,
      tenthMarksheet,
      twelfthMarksheet,
      graduationMarksheet,
    });

    return res.status(201).json({
      success: true,
      message: "Admission successful",
      applicationNo: admissionData.applicationNo,
      data: admissionData,
    });

  } catch (error) {
    console.log("ADMISSION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; 

const findAdmission = async (req, res) => {
    try {
        const { id } = req.params
        const admissionData = await admission.findOne({ _id: id })
        res.json({
            status: true,
            statusCode: 200,
            message: "found successfully",
            data: admissionData
        })
    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "error"
        })
    }
}


const findAllAdmission = async (req, res) => {
    try {
        const admissionData = await admission.find().sort({createAt:-1}).populate("courseId","courseName")
        res.json({
            status: true,
            statusCode: 200,
            message: "found all admission successfully",
            data: admissionData

        })
    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "error"
        })

    }

}



const deleteaAdmission = async (req, res) => {
    try {
        const { id } = req.params
        const admissionData = await admission.deleteOne({ _id: id })
        res.json({
            status: true,
            statusCode: 200,
            message: "Detele successfully",
            data: admissionData
        })
    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "error"
        })
    }
}


// const approveAdmission = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const admissionData = await admission.findByIdAndUpdate(
//             id,
//             { status: "approved" },
//             { new: true }
//         );

//         if (!admissionData) {
//             return res.status(404).json({
//                 status: false,
//                 message: "Admission not found"
//             });
//         }

//         return res.status(200).json({
//             status: true,
//             message: "Admission approved successfully",
//             data: admissionData
//         });
//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             message: error.message
//         });
//     }
// } 
// const updateStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const admissionData = await admission.findById(id);

//     if (!admissionData) {
//       return res.status(404).json({
//         status: false,
//         message: "Admission not found",
//       });
//     }

//     if (!["Pending", "Approved", "Rejected"].includes(status)) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid status",
//       });
//     }

//     admissionData.status = status;

//     await admissionData.save();

//     res.status(200).json({
//       status: true,
//       message: `Admission ${status} successfully`,
//       data: admissionData,
//     });

//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: "Error updating status",
//       error: error.message,
//     });
//   }
// };




const approveAdmission = async (req, res) => {
    try {
        const { id } = req.params;

        // =========================
        // FIND ADMISSION
        // =========================

        const admissionData = await admission.findById(id);

        if (!admissionData) {
            return res.status(404).json({
                status: false,
                message: "Admission not found",
            });
        }

        // =========================
        // ALREADY APPROVED
        // =========================

        if (admissionData.status === "Approved") {
            return res.status(400).json({
                status: false,
                message: "Admission already approved",
            });
        }

        // =========================
        // CHECK STUDENT
        // =========================

        let studentData = await student.findOne({
            email: admissionData.email,
        });

        let plainPassword = null;

        // ==================================================
        // STUDENT ALREADY EXISTS
        // ==================================================

        if (studentData) {

            console.log("Existing student found:", studentData._id);

            // =========================
            // GENERATE ENROLLMENT
            // ONLY IF NOT EXISTS
            // =========================

            if (!studentData.enrollmentNo) {

                let enrollmentExists = true;
                let enrollmentNo;

                while (enrollmentExists) {

                    const random6Digit =
                        Math.floor(100000 + Math.random() * 900000);

                    enrollmentNo = `JAAT${random6Digit}`;

                    enrollmentExists = await student.findOne({
                        enrollmentNo: enrollmentNo,
                    });
                }

                studentData.enrollmentNo = enrollmentNo;
            }

            // =========================
            // UPDATE STUDENT
            // =========================

            studentData.admissionId = admissionData._id;
            studentData.applicationNo = admissionData.applicationNo;
            studentData.StudentName = admissionData.fullName;
            studentData.Phonenumber = admissionData.mobile;
            studentData.address = admissionData.address;
            studentData.Course = admissionData.courseId;
            studentData.dob = admissionData.dob;
            studentData.status = "Active";

            await studentData.save();

        }

        // ==================================================
        // STUDENT DOES NOT EXIST
        // ==================================================

        else {

            // =========================
            // RANDOM PASSWORD
            // =========================

            const random4Digit =
                Math.floor(1000 + Math.random() * 9000);

            plainPassword = `JAAT${random4Digit}`;

            console.log(
                "Generated Password:",
                plainPassword
            );

            // =========================
            // HASH PASSWORD
            // =========================

            const hashedPassword =
                await bcrypt.hash(plainPassword, 10);

            // =========================
            // GENERATE ENROLLMENT
            // =========================

            let enrollmentNo;
            let enrollmentExists = true;

            while (enrollmentExists) {

                const random6Digit =
                    Math.floor(100000 + Math.random() * 900000);

                enrollmentNo = `JAAT${random6Digit}`;

                enrollmentExists = await student.findOne({
                    enrollmentNo: enrollmentNo,
                });
            }

            console.log(
                "Generated Enrollment No:",
                enrollmentNo
            );

            // =========================
            // CREATE STUDENT
            // =========================

            studentData = await student.create({

                admissionId: admissionData._id,

                applicationNo: admissionData.applicationNo,

                enrollmentNo: enrollmentNo,

                StudentName: admissionData.fullName,

                Phonenumber: admissionData.mobile,

                email: admissionData.email,

                address: admissionData.address,

                Course: admissionData.courseId,

                dob: admissionData.dob,

                password: hashedPassword,

                status: "Active",
            });
        }

        // =========================
        // UPDATE ADMISSION
        // =========================

        admissionData.status = "Approved";

        await admissionData.save();

        // =========================
        // RESPONSE
        // =========================

        return res.status(200).json({

            status: true,

            message:
                "Admission Approved & Student Created Successfully",

            data: studentData,

            loginCredentials: {
                email: studentData.email,
                password: plainPassword,
                enrollmentNo: studentData.enrollmentNo,
            },

        });

    } catch (error) {

        console.log("APPROVE ERROR:", error);

        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};


const rejectAdmission = async (req, res) => {
  try {
    const { reason } = req.body;

    const admissionData = await admission.findById(req.params.id);

    if (!admissionData) {
      return res.status(404).json({
        status: false,
        message: "Admission not found",
      });
    }

    admissionData.status = "Rejected";
    admissionData.rejectReason = reason || "";

    await admissionData.save();

    res.json({
      status: true,
      message: "admissionData Rejected Successfully",
      data: admissionData,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


module.exports= {
    addAdmission,
    findAdmission,
    findAllAdmission,
    // approveAdmission,
    // updateStatus,
    approveAdmission,
    rejectAdmission,
    deleteaAdmission
}

















