import axios from "axios";
import { API_url } from "../../config/config";

export const addInquiry = async (data) => {
  const res = await axios.post(
    `${API_url}/inquire/AddInquire`,
    data
  );

  return res.data;
};

export const ViewAllInquiry = async () => {
  const res = await axios.get(
    `${API_url}/inquire/ViewAllInquire`
  );

  return res.data;
};

export const deleteInquiry = async (id) => {
  const res = await axios.delete(
    `${API_url}/inquire/delete-Inquire/${id}`
  );

  return res.data;
};