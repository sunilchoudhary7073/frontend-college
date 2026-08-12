const event=require("../../model/admin/event")


const viewallEvent=async(req,res)=>{
    try {
        const eventRes=await event.find({ status: "Active" })
        res.json({
            success:true,
            successcode:200,
            message:"event find successfully",
            data:eventRes
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
        const eventRes =await event.findOne({_id:id})
          res.json({
            success:true,
            successcode:200,
            message:"event find successfully",
            data:eventRes
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

module.exports={
viewallEvent,findOne
}
