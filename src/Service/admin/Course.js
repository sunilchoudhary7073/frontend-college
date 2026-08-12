import axios from "axios"
import { API_url } from "../../config/config";




// course api
export const AddCourse = async (data) => {
  console.log("data",data)
    const res = await axios.post(`${API_url}/course/add`, data)
    return res.data
}


export const ViewAllCourse = async(page,limit) => {
  const res= await  axios.get(`${API_url}/course/viewAll?page=${page}&limit=${limit}`); 
  return res.data
};

export const ViewAall_Desboard = async(page,limit) => {
  const res= await  axios.get(`${API_url}/course/viewallDeshboard`); 
  return res.data
};


export const FindOneCourse = async(id,data) => {
  const res= await  axios.get(`${API_url}/course/findOne/${id}`,data); 
  return res.data
};

export const updateCourse = async(id,data) => {
  const res= await  axios.put(`${API_url}/course/update/${id}`,data); 
  return res
};

export const DeleteCourse = async(id,data) => {
  const res= await  axios.delete(`${API_url}/course/delete/${id}`,data); 
  return res.data.data
};
export const UpdateStatus = async(id,data) => {
  const res= await  axios.patch(`${API_url}/course/status/${id}`,data); 
  return res.data.data
};


