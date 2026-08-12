const Inquire=require('../../model/admin/Inquire')


const Addinquire=async(req,res)=>{
    try {
        const InquireData=await Inquire.create(req.body)
        res.json({
            success:true,
            successcode:200,
            message:"Add inquire successfully",
            data:InquireData

        })

    } catch (error) {
        res.json({
            success:false,
            successcode:500,
            message:"error",
            error:error.message
        })
    }
}

const ViewAll=async(req,res)=>{
    try {
        const InquireData=await Inquire.find()
        res.json({
            success:true,
            successcode:200,
            message:"find inquire successfully",
            data:InquireData

        })

    } catch (error) {
        res.json({
            success:false,
            successcode:500,
            message:"error",
            error:error.message
        })
    }
}


const findOne=async(req,res)=>{
    try {
        const {id}=req.params
        const InquireData=await Inquire.findOne({_id:id})
        res.json({
            success:true,
            successcode:200,
            messsage:"find Inquire successfully",
            data:InquireData
            
        })
    } catch (error) {
        res.json({
            success:false,
            successcode:500,
            message:"error",
            error:error.messsage

        })
    }
}


const Delete=async(req,res)=>{
    try {
        const {id}=req.params
        const InquireData=await Inquire.deleteOne({_id:id})
        res.json({
            success:true,
            successcode:200,
            messsage:"delete Inquire successfully",
            data:InquireData
            
        })
    } catch (error) {
        res.json({
            success:false,
            successcode:500,
            message:"error",
            error:error.messsage

        })
    }
}
module.exports={
    Addinquire,
    ViewAll,
    findOne,
    Delete
}