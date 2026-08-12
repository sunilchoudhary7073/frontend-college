
import React, { useState, useEffect } from 'react'

import Swal from "sweetalert2";
import { Update,FindOne } from '../../../Service/admin/collage';

import { Formik, useFormik } from 'formik';
import *as Yup from 'yup'
import { useNavigate, useParams } from "react-router-dom";


export default function Edit() {
  const [student, setStudent] = useState(null);

  const navigate = useNavigate()
  const { id } = useParams()
  console.log("Student ID:", id);
  
  // const [AddStudentOpen, setAddStudentOpen] = useState(false)
  // const [StudentName, setStudentName] = useState('')
  // 	const [Phone, setPhone] = useState('')
  // 	const [Email, setEmail] = useState('')
  // 	const [Address, setAddress] = useState('')
  //   	const [CourseId, setCourseId] = useState('')
  //     	const [dob, setdob] = useState('')
  // 	const [Status, setStatus] = useState('InActvie')


  const formik = useFormik({
  enableReinitialize: true,

  initialValues: {
    StudentName: student?.StudentName || "",
    Phonenumber: student?.Phone || student?.Phonenumber || "",
    email: student?.email || "",
    address: student?.address || "",
    Course: student?.Course || student?.CourseId || "",
    dob: student?.dob ? student.dob.split("T")[0] : "",
  },

  onSubmit: async (values) => {
    try {

      const res = await Update(id, values);

      if (res.data.status) {

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Student Updated Successfully"
        });

        navigate("/admin/Student");
      }

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong"
      });

    }
  }
});
const getStudent = async () => {
  try {
    const res = await FindOne(id);
       console.log("API Response:", res);
    console.log("Student Data:", res.data);

    console.log(res.data.data); // check data

    setStudent(res.data.data);

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (id) {
    getStudent();
  }
}, []);

  return (


    <div>

      {/* Add Bus */}
      <div id="view-add-bus" className="space-y-6">


        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-300 hover:bg-slate-100 transition">
              <i data-lucide="arrow-left" className="w-5 h-5"></i>
            </button>

            <h2 className="text-3xl font-bold text-slate-800">
              Edit Students
            </h2>

          </div>

        </div>

        {/* Form Card */}
        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 w-full">

          <form onSubmit={formik.handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {/* Bus Number */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Student Name
                </label>

                <input
                  type="text"
                  name="StudentName"
                  placeholder="Enter Student Name"
                  value={formik.values.StudentName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />

                {formik.touched.StudentName && formik.errors.StudentName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.StudentName}
                  </p>
                )}
              </div>

              {/* Bus Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  name="Phonenumber"
                  placeholder="Enter Phone Number"
                  value={formik.values.Phonenumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  maxLength={10}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />
                {formik.touched.Phonenumber && formik.errors.Phonenumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.Phonenumber}
                  </p>
                )}
              </div>

              {/* Bus Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type='text'
                  name='email'
                  placeholder="Enter the Email Id "
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}


              </div>

              {/* Total Seats */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Address
                </label>
                <input

                  type="text"
                  name='address'
                  placeholder="Enter Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.address}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Course
                </label>
                <input
                  type="text"
                  name='Course'
                  placeholder="Enter Course"
                  value={formik.values.Course}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />
                {formik.touched.Course && formik.errors.Course && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.Course}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300"
                />

                {formik.touched.dob && formik.errors.dob && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.dob}
                  </p>
                )}

              </div>



            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 my-8"></div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">

              <button
                type="button"
                onClick={() => navigate("/admin/Student")}
                className="px-8 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition"
              >
                Back
              </button>

              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-md transition"
              >
                Submit
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  )
}
