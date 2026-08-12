import axios from "axios";
import { API_url } from "../../config/config";

export const addAddmissionform = async (data) => {
  const res = await axios.post(
    `${API_url}/admission/Addadmission`,
    data
  );

  return res.data;
};