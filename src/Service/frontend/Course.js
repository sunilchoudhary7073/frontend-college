import axios from "axios";
import { API_url } from "../../config/config";

export const ViewAllCourse=async(data)=>{
    const res= await axios.get(`${API_url}/Course/ViewAll`,data)
    return res.data.data
}

export const ViewProgramOne=async(id,data)=>{
   
    const res=await axios.get(`${API_url}/Course/detailsOne/${id}`,data)
    return res.data.data
}