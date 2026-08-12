import axios from "axios";
import { API_url } from "../../config/config";

export const ViewallInquire=async()=>{
    const res=await axios.get(`${API_url}/inquire/FindAll-Inquire`)
    return res.data.data
}

export const FindOneInquire=async(id,data)=>{
    const res=await axios.get(`${API_url}/inquire/ViewOne/${id}`,data)
    return res.data.data
}

export const deleteInquire=async(id,data)=>{
    const res=await axios.get(`${API_url}/inquire/delete-Inquire/${id}`,data)
    return res.data.data
}