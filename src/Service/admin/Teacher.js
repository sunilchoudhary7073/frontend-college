import axios from "axios"
import { API_url } from "../../config/config";



// teacher api
export const AddTeacher = async (data) => {

    const res = await axios.post(`${API_url}/Teacher/add`, data)
    return res
}


export const ViewAll = async(page,limit) => {
  const res= await  axios.get(`${API_url}/Teacher/viewAll?page=${page}&limit=${limit}`); 
  return res.data
};


export const ViewAallDesboard = async(page,limit) => {
  const res= await  axios.get(`${API_url}/Teacher/ViewAll-desboard`); 
  return res.data
};
export const ViewOne = async (id) => {
    const res = await axios.get(`${API_url}/Teacher/findOne/${id}`)
    return res
}
export const UpdateTeacherStatus=async(id)=>{
  const res = await axios.patch(`${API_url}/Teacher/status/${id}`);
  return res;
};

export const UpdateTeacher = async (id,data) => {
    const res = await axios.put(`${API_url}/Teacher/update/${id}`,data)
    return res.data.data
}


export const DeleteTeacher = async (id,data) => {
    const res = await axios.delete(`${API_url}/Teacher/delete/${id}`, data)
    return res
}