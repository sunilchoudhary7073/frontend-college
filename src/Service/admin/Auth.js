import axios from "axios"
const API_url = "http://localhost:4000";


export const LoginApi = async (data) => {
    const res = await axios.post(`${API_url}/Admin/login`, data)
    return res
}
