const Contact = require("../../model/admin/contact");

// GET ALL




const addContact = async (req, res) => {
    try {
        const contactData = await Contact.create(req.body);

        res.json({
            status: true,
            message: "Contact added successfully",
            data: contactData,
        });
    } catch (error) {
        res.json({
            status: false,
            message: error,
        });
    }
};
const getAllContact = async (req, res) => {
    try {
        const contactData = await Contact.find();

        res.json({
            success: true,
            data: contactData,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// GET BY ID
const getContactById = async (req, res) => {
    try {
        const { id } = req.params;

        const contactData = await Contact.findById(id);

        if (!contactData) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        res.json({
            success: true,
            data: contactData,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    getAllContact,
    getContactById,
    addContact,
};