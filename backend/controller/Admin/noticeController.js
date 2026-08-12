const notice = require("../../model/admin/notice")


const addNotice = async (req, res) => {
    
    try {
    const noticeData =await notice.create(req.body) 
    res.json({
      status: true,
      message: "notice added successfully",
      data:noticeData
    });

  } catch (error) {
    res.json({
      status: false,
      message: error
    });
  }
}

const findNotice  = async (req, res) => {
    try {
        const { id } = req.params
        const noticeData = await notice.findOne({ _id: id })
        res.json({
            status: true,
            statusCode: 200,
            message: "found notice successfully",
            data: noticeData
        })

    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "error"
        })
    }
}

const updateNotice = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body
        const noticeData = await notice.updateOne({ _id: id }, updateData)
        res.json({
            status: true,
            statusCode: 200,
            message: "notice updated successfully",
            data: noticeData
        })
    } catch (error) {
        res.json({
            status: false,
            statusCode: 500,
            message: "error"
        })

    }
}

const deleteNotice= async (req, res) => {

    try {
        const { id } = req.params
        const noticeData = await notice.deleteOne({ _id: id })
        res.json({
            status: true,
            statuscode: 200,
            message: "notice deleted successfully",
            data: noticeData
        })
    } catch (error) {
        res.json({
            status: false,
            statuscode: 500,
            message: "error",
        })
    }
}

const viewAllNotice = async (req, res) => {

    try {
        const noticeData = await notice.find().sort({createdAt: -1 })
        res.json({
            status:true,
            statusCode:200,
            message:" found all notice successfully",
            data:noticeData
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
    addNotice,
    findNotice,
    updateNotice,
    deleteNotice,
    viewAllNotice
}
