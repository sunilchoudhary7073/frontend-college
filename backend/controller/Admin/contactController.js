const Contact = require("../../model/admin/contact");

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

const findContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contactData = await Contact.findOne({ _id: id });

        res.json({
            status: true,
            statusCode: 200,
            message: "Contact found successfully",
            data: contactData,
        });
    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "Error",
        });
    }
};

const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const contactData = await Contact.updateOne(
            { _id: id },
            updateData
        );

        res.json({
            status: true,
            statusCode: 200,
            message: "Contact updated successfully",
            data: contactData,
        });
    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "Error",
        });
    }
};

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contactData = await Contact.deleteOne({ _id: id });

        res.json({
            status: true,
            statusCode: 200,
            message: "Contact deleted successfully",
            data: contactData,
        });
    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "Error",
        });
    }
};

const viewAllContact = async (req, res) => {
    try {
        const contactData = await Contact.find();

        res.json({
            status: true,
            statusCode: 200,
            message: "Contacts found successfully",
            data: contactData,
        });
    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "Error",
        });
    }
};

module.exports = {
    addContact,
    findContact,
    updateContact,
    deleteContact,
    viewAllContact,
};