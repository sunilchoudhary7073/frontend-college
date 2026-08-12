const Admin = require('../../model/admin/Admin')
const { Haspassword, comparePassword } = require('../../utils/byrypt')
const { generateToken } = require('../../utils/jwt')

const register = async (req, res) => {
    try {

        const { email, password } = req.body
        const docheck = await Admin.findOne({ email: email })
        if (!docheck) {
            const Strpassword = await Haspassword(password)
            const usersRes = await Admin.create({ ...req.body, password: Strpassword ,role:"admin"})
            res.json({
                status: true,
                statuscode: 200,
                message: "user register successfully",
d
            })
        } else {
            res.json({
                status: false,
                statuscode: 404,
                message: "user allreay exist",
            })
        }
    } catch (error) {

    }
}

const login = async (req, res) => {
    try {
        console.log("Headers:", req.headers);

          console.log("Body:", req.body);
        const { email, password } = req.body;


        const docheck = await Admin.findOne({ email });

        if (!docheck) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        const StrPassword = await comparePassword(
            password,
            docheck.password
        );

        if (!StrPassword) {
            return res.status(401).json({
                status: false,
                message: "Password invalid"
            });
        }

        const payload = {
            id: docheck._id,
            contact_number: docheck.contact_number,
            email: docheck.email
        };

        const token = await generateToken(payload);

        return res.status(200).json({
            status: true,
            message: "User login successfully",
            token
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const updatepassword = async (req, res) => {
    try {
        const userRes = await Admin.findById(req.params.id);

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

    const userRes = await Admin.findOne({$or:[{ email:value }, { contact_number:value}]
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



module.exports = {
    login, register,updatepassword,forgetePassword
}