const user = require("../../model/admin/user")

const addUser = async (req, res) => {
    try {

        const { email } = req.body
        const existingUser = await user.findOne({ email: email })
        if (existingUser) {
            return res.json({
                status: false,
                statuscode: 401,
                message: "email allready exist"
            })
        }
        const photo = req?.file?.filename
        const userData = await user.create({ ...req.body, image: photo })
        res.status(201).json({
            status: true,
            message: "user added successfully",
            data: userData
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "error"
        })

    }
}

const viewUser = async (req, res) => {
    try {
        const { id } = req.params
        const userData = await user.findOne({ _id: id })
        res.json({
            status: true,
            statusCode: 200,
            message: "found user successfully",
            data: userData
        })

    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "error"
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (updateData.email) {
            const existingUser = await user.findOne({
                email: updateData.email,
                _id: { $ne: id }
            });

            if (existingUser) {
                return res.json({
                    status: false,
                    statusCode: 400,
                    message: "Email already exists"
                });
            }
        }

        const userData = await user.updateOne(
            { _id: id },
            { $set: updateData }
        );

        res.json({
            status: true,
            statusCode: 200,
            message: "User updated successfully",
            data: userData
        });

    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: error.message
        });
    }
};




const deleteUser = async (req, res) => {

    try {
        const { id } = req.params
        const userData = await user.deleteOne({ _id: id })
        res.json({
            status: true,
            statuscode: 200,
            message: "user deleted successfully",
            data: userData
        })
    } catch (error) {
        res.json({
            status: false,
            statuscode: 500,
            message: "error",
        })
    }
}

const viewAllUser = async (req, res) => {
    try {
        const userData = await user.find()
        res.json({
            status: true,
            statusCode: 200,
            message: "users found successfully",
            data: userData
        })
    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "error"
        })
    }
}


module.exports = {
    addUser,
    viewUser,
    updateUser,
    deleteUser,
    viewAllUser
}
