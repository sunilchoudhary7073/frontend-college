import axios from "axios"
import { API_url } from "../../config/config";


 export const Register=async(data)=>{
      console.log("Sending:", data);
    const res=await axios.post(`${API_url}/auth/register`,data)
    return res

 }
 export const Login=async(data)=>{
    const res=await axios.post(`${API_url}/auth/login`,data)
    return res.data

 }

  export const UpdatePassword=async(id,data)=>{
    const res=await axios.post(`${API_url}/auth/update_password/${id}`,data)
    return res.data

 }

export const Profile = async () => {
    const res = await axios.get(`${API_url}/auth/profile`, { headers: {Authorization: `Bearer ${localStorage.getItem("studentToken")}`
        }
    });

    return res.data;
};