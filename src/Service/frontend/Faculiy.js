import axios from "axios";
import { API_url } from "../../config/config";


export const FacultyView=async()=>{
    const res= await axios.get(`${API_url}/faculty/ViewAll`)
    return res.data
}


export const FacultyViewOne=async(id,data)=>{
    const res= await axios.get(`${API_url}/faculty/details/${id}`)
    return res.data.data
}