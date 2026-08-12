const bcrypt=require("bcrypt")
const Soal_round=10

const Haspassword=async(password)=>{
    const haspassword=await bcrypt.hash(password,Soal_round);
    return haspassword;

}

const comparePassword=async(password,haspassword)=>{
    const comparePass=await bcrypt.compare(password,haspassword)
    return comparePass;
}


module.exports={
    Haspassword,
    comparePassword
}
