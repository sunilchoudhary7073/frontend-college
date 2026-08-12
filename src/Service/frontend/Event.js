import axios from "axios";
import { API_url } from "../../config/config";

export const ViewAllEvent = async () => {
  const res = await axios.get(`${API_url}/Event/ViewAllEvent`);
  return res.data;
};


export const ViewOneEvent = async (id,data) => {
  const res = await axios.get(`${API_url}/Event/viewOne/${id}`,data);
  return res.data;
};