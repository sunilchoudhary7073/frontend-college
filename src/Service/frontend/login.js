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
export const VerifyForgotEmail = async (email) => {
  const res = await axios.post(
    `${API_url}/auth/verify-forgot-email`,
    { email }
  );

  return res.data;
};
  
export const ForgetePassword = async (email, NewPassword = null) => {
  try {
    const value = encodeURIComponent(email);

    // Email verify
    if (!NewPassword) {
      const res = await axios.post(
        `${API_url}/auth/forgate_password/${value}`
      );

      return res.data;
    }

    // Password reset
    const res = await axios.post(
      `${API_url}/auth/forgate_password/${value}`,
      {
        NewPassword,
      }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const Profile = async () => {
    const res = await axios.get(`${API_url}/auth/profile`, { headers: {Authorization: `Bearer ${localStorage.getItem("studentToken")}`
        }
    });

    return res.data;
};