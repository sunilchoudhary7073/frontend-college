const jwt=require('jsonwebtoken');
const {Tokenverify}=require('../utils/jwt');

const verifyToken=async(req,res,next)=>{
    try {
        
        const token=req.headers.authorization?.split(" ")[1]

            if (!token) {
                return res.status(401).json({
                    success:false,
                    message:"token not found"
                    
                    
                }); 
            }
            const decode=await Tokenverify(token)
            console.log(decode,'decode');

            req.user=decode;
            next();
            

        
    } catch (error) {
    return res.status(401).json({
        success:false,
        message:"Invalid Token"
    })
    }
}

module.exports=verifyToken
