const Subject=require('../../model/admin/Subject')
const { create } = require('../../model/admin/user')

const AddSubject=async(req,res)=>{
    try {
        const subjectData=await Subject.create(req.body)
        res.json({
            success:true,
            successcode:200,
            message:"Sbunect add successfully",
            data:subjectData

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

const ViewSbuject=async(req,res)=>{
    try {
        const subjectData=await Subject.find().sort({createdAt:-1}).populate("courseId","courseName")
         res.json({
            success:true,
            successcode:200,
            message:"Sbunect find successfully",
            data:subjectData

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

const findone=async(req,res)=>{
    try {
        const{id}=req.params
        const subjectData=await Subject.findOne({_id:id})
          res.json({
            success:true,
            successcode:200,
            message:"subject  find successfully",
            data:subjectData

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




const update=async(req,res)=>{
    try {
        const{id}=req.params
              const updateData = req.body
        const subjectData=await Subject.updateOne({_id:id},updateData)
          res.json({
            success:true,
            successcode:200,
            message:"Sbunect update successfully",
            data:subjectData

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



const Delete=async(req,res)=>{
try {
    const {id}=req.params
    const subjectData=await Subject.deleteOne({id:id})
      res.json({
            success:true,
            successcode:200,
            message:"Sbunect delete successfully",
            data:subjectData

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
    AddSubject,
    ViewSbuject,
    findone,
    update,
    Delete
}