import axios from "axios";
import { API_url } from "../../config/config";



export const ViewAll = async(page,limit) => {
  const res= await  axios.get(`${API_url}/contact/viewall?page=${page}&limit=${limit}`); 
  return res.data
};

export const UpdateContact = async(page,limit) => {
  const res= await  axios.get(`${API_url}/contact/viewall?page=${page}&limit=${limit}`); 
  return res.data
};

export const DeleteContact = async (id) => {
  const res = await axios.delete(`${API_url}/contact/delete/${id}`);
  return res.data;
};