import axios from "axios";
import { API_url } from "../../config/config";


export const AddPlacments=async(data)=>{
    const res= await axios.post(`${API_url}/placement/AddPlacment`,data)
    return  res.data.data
};

export const ViewAllPlacement=async(data)=>{
    const res= await axios.get(`${API_url}/placement/find`,data)
    return  res.data.data
};
    export const DeletePlacement=async(id,data)=>{
    const res= await axios.delete(`${API_url}/placement/delete/${id}`,data)
    return  res.data.data
    };
 
    export const ViewOne=async(id)=>{
        const res=await axios.get(`${API_url}/placement/ViewOne/${id}`)
        return res.data.data
    }

    export const UpdatePlacementStatus=async(id)=>{
        const res=axios.patch(`${API_url}/placement/status/${id}`)
        return res.data
    }