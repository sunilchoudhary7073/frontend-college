import axios from "axios";
import { API_url } from "../../config/config";

export const ContactAdd=async(data)=>{
    const res=await axios.post(`${API_url}/contact/addcontact`,data)
    return res.data
}

