import axios from "axios";
import { API_url } from "../../config/config";




export const ViewAllPalcment=async(data)=>{
    const res=await axios.get(`${API_url}/placement/ViewAllPlacement`,data)
    return res.data
}

