import axios from "axios"
import { API_url } from "../../config/config";




// course api
export const AddEvent = async (data) => {
  console.log("data",data)
    const res = await axios.post(`${API_url}/event/addEvent`, data)
    return res.data
}


export const ViewAllEvent = async(page,limit) => {
  const res= await  axios.get(`${API_url}/event/viewallevent?page=${page}&limit=${limit}`); 
  return res.data.data
};

export const FindOneEvent = async(id,data) => {
  const res= await  axios.get(`${API_url}/event/findOne/${id}`,data); 
  return res.data
};

export const updateEvent = async(id,data) => {
  const res= await  axios.put(`${API_url}/event/update/${id}`,data); 
  return res
};

export const DeleteEvent = async(id,data) => {
  const res= await  axios.delete(`${API_url}/event/deleteEvent/${id}`,data); 
  return res.data
};
export const UpdateStatus = async(id,data) => {
  const res= await  axios.patch(`${API_url}/event/status/${id}`,data); 
  return res.data.data
};