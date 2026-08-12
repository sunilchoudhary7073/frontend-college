import axios from "axios"
import { API_url } from "../../config/config";


export const AddNotice=async(data)=>{
    const res=await axios.post(`${API_url}/notice/addnotice`,data)
    return res.data
}

export const ViewAllNotice=async(data)=>{
    const res=await axios.get(`${API_url}/notice/viewallnotice`,data)
    return res.data
}

export const UpdateNotice=async(id,data)=>{
    const res=await axios.put(`${API_url}/notice/updatenotice/${id}`,data)
    return res.data
}

export const DeleteNotice=async(id,data)=>{
    const res=await axios.delete(`${API_url}/notice/deletenotice/${id}`,data)
    return res.data
}