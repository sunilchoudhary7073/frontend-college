import axios from "axios"
import { API_url } from "../../config/config";


// student api
export const AddStudent = async (data) => {
  const res = await axios.post(`${API_url}/Student/add`, data)
  return res
}


export const ViewAllStudent = async (page, limit) => {
  const res = await axios.get(`${API_url}/Student/viewAll?page=${page}&limit=${limit}`);

  return res.data.data
};

export const ViewAllStudentDeshboard = async () => {
  const res = await axios.get(`${API_url}/Student/findstudent-deshboard`);

  return res.data.data
};

export const FindOne = async (id, data) => {
  const res = await axios.get(`${API_url}/Student/findstudent/${id}`, data)
  return res
}

export const Update = async (id, data) => {
  const res = await axios.put(`${API_url}/Student/updatestudent/${id}`, data)
  return res
}

export const UpdateStudentStatus = async (id) => {
  const res = await axios.patch(`${API_url}/Student/status/${id}`)
  return res
}


export const Delete = async (id, data) => {
  const res = await axios.delete(`${API_url}/Student/deletestudent/${id}`, data)
  return res
}
export const SearchStudent = async (page, limit, body) => {
  const res = await axios.post(
    `${API_url}/Student/SearchStudent?page=${page}&limit=${limit}`,
    body
  );

  return res.data;
};
export const AssignCourse = async (data) => {
  const res = await axios.patch( `${API_url}/student/assign-course`, data);
  return res.data;
};






// fees api

export const Addfees = async (data) => {
  console.log("data", data)
  const res = await axios.post(`${API_url}/Fees/add`, data)
  return res
}


export const ViewAllfees = async (page, limit) => {
  const res = await axios.get(`${API_url}/Fees/viewAll?page=${page}&limit=${limit}`);
  return res.data
};

export const FindFees = async (id) => {
  const res = await axios.get(`${API_url}/Fees/find/${id}`);
  return res.data.data;
};


export const UpdateFees = async (id) => {
  const res = await axios.put(`${API_url}/Fees/updatefees/${id}`);
  return res;
};

export const DeleteFees = async (id) => {
  const res = await axios.delete(`${API_url}/Fees/delete/${id}`);
  return res;
};

export const Searchfees = async (page, limit, body) => {
    const res = await axios.post(
        `${API_url}/Fees/seacrh-fees?page=${page}&limit=${limit}`,
        {
            studentName: body
        }
    );

    return res.data;
};


// Bacth api



export const Addbatch = async (data) => {
  console.log("data", data)
  const res = await axios.post(`${API_url}/batch/add`, data)
  return res
}


export const ViewAllbatch = async () => {
  const res = await axios.get(`${API_url}/batch/viewAll`);
  return res.data.data
};

export const UpdateStatus = async (id) => {
  const res = await axios.patch(`${API_url}/batch/status/${id}`);
  return res.data;
};

export const UpdateBatch = async (id) => {
  const res = await axios.put(`${API_url}/batch/update/${id}`);
  return res.data;
};

export const DeleteBatch = async (id) => {
  const res = await axios.Delete(`${API_url}/batch/delete/${id}`);
  return res.data;
};


// Addmission api

export const Addaddmission = async (data) => {
  const res = await axios.post(`${API_url}/admission/addadmission`, data)
  return res
}

export const ViewAlladdmission = async (page,limit) => {
  const res = await axios.get(`${API_url}/admission/ViewAll?page=${page}&limit=${limit}`)
  return res.data
}

export const FindOneAddmission = async (id) => {
  const res = await axios.get(`${API_url}/admission/findOne/${id}`);
  return res
}

export const approveAdmission = async (id) => {
  const res = await axios.put(`${API_url}/admission/approve/${id}`);
  return res.data;
};

export const rejectAdmission = async (id, data) => {
  const res = await axios.put(
    `${API_url}/admission/reject/${id}`,
    data
  );
  return res.data;
};

export const UpdateAdmission = async (id) => {
  const res = await axios.put(`${API_url}/admission/updateadmission/${id}`);
  return res.data;
};

export const DeleteAddmission = async (id) => {
  const res = await axios.delete(`${API_url}/admission/delete/${id}`);
  return res
};
export const Searchaddmission = async (page, limit, fullName) => {
  const res = await axios.post(
    `${API_url}/admission/search-addmission?page=${page}&limit=${limit}`,
    {
      fullName: fullName,
    }
  );

  return res.data;
};
