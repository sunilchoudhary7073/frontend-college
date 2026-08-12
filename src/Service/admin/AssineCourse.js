import axios from "axios";
import { API_url } from "../../config/config";

export const AddCourseAssine = async (data) => {
    const res = await axios.post(`${API_url}/Assinecourse/AddCourse`, data);
    return res.data;
};

export const ViewAllAssineCourse = async (page,limit) => {
    const res = await axios.get(`${API_url}/Assinecourse/viewAll?page=${page}&limit=${limit}`);
    return res.data.data;
};

export const FindOneAssinecourse = async (id, data) => {
    const res = await axios.put(`${API_url}/Assinecourse/viewOne/${id}`, data);
    return res.data;
};

export const updateAssinecourse = async (id, data) => {
    const res = await axios.put(`${API_url}/Assinecourse/Upate-course/${id}`, data);
    return res.data;
};

export const deleteAssinecourse = async (id) => {
    const res = await axios.delete(`${API_url}/Assinecourse/delete/${id}`);
    return res.data;
};