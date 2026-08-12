import axios from "axios";

import { API_url } from "../../config/config";

export const EnrollmentTrends=async(data)=>{
    const res= await axios. get(`${API_url}/Student/enrollment-trends`,data)
    return res.data
}