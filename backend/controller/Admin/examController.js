const exam = require("../../model/admin/exam")


const addExam = async (req, res) => {

  try {
    const examData =await exam.create(req.body) 
    res.json({
      status: true,
      message: "exam added successfully",
      data:examData
    });

  } catch (error) {
    res.json({
      status: false,
      message: error
    });
  }
}


const findExam  = async (req, res) => {
    try {
        const { id } = req.params
        const examData = await exam.findOne({ _id: id })
        res.json({
            status: true,
            statusCode: 200,
            message: "found exam successfully",
            data: examData
        })

    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "error"
        })
    }
}

const updateExam = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body
        const examData = await exam.updateOne({ _id: id }, updateData)
        res.json({
            status: true,
            statusCode: 200,
            message: "exam updated successfully",
            data: examData
        })
    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "error"
        })

    }
}

const deleteExam = async (req, res) => {

    try {
        const { id } = req.params
        const examData = await exam.deleteOne({ _id: id })
        res.json({
            status: true,
            statuscode: 200,
            message: "exam deleted successfully",
            data: examData
        })
    } catch (error) {
        res.json({
            status: false,
            statuscode: 500,
            message: "error",
        })
    }
}

const viewAllExam = async (req, res) => {

    try {
        const examData = await exam.find()
        res.json({
            status:true,
            statusCode:200,
            message:"exams found successfully",
            data:examData
        })
    } catch (error) {
        res.json({
            status:false,
            statusCode:500,
            message:"error"
        })
    }
}


module.exports = {
    addExam,
    findExam,
    updateExam,
    deleteExam,
    viewAllExam
}
