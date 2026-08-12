import axios from "axios";
import { API_url } from "../../config/config";


export const AddSubject=async(data)=>{
    const res=await axios.post(`${API_url}/subject/addsubject`,data)
    return res.data.data
}

export const ViewAllSubject=async(data)=>{
    const res=await axios.get(`${API_url}/subject/ViewAll`,data)
    return res.data.data
}

export const ViewOneSubject=async(id,data)=>{
    const res=await axios.get(`${API_url}/subject/ViewOne/${id}`,data)
    return res.data.data
}
export const UpdateSubject=async(id,data)=>{
    const res=await axios.put(`${API_url}/subject/update-subject/${id}`,data)
    return res.data.data
}
export const DeleteSubject=async(id,data)=>{
    const res=await axios.delete(`${API_url}/subject/delete/${id}`,data)
    return res.data.data
}
