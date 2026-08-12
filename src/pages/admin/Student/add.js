
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AddStudent } from '../../../Service/admin/collage';
import { Formik, useFormik } from 'formik';
import *as Yup from 'yup'

import { ViewAllCourse } from '../../../Service/admin/Course'




export default function Add() {
  const [courses, setCourses] = useState([])

  const navigate = useNavigate()
  // const [AddStudentOpen, setAddStudentOpen] = useState(false)
  // const [StudentName, setStudentName] = useState('')
  // 	const [Phone, setPhone] = useState('')
  // 	const [Email, setEmail] = useState('')
  // 	const [Address, setAddress] = useState('')
  //   	const [CourseId, setCourseId] = useState('')
  //     	const [dob, setdob] = useState('')
  // 	const [Status, setStatus] = useState('InActvie')


  const formik = useFormik({
    initialValues: {

      StudentName: "",
      Phonenumber: "",
      email: "",
      address: "",
      Course: "",
      dob: ""
    },

    validationSchema: Yup.object({
      StudentName: Yup.string().required("Student Name is required"),

      Phonenumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits")
        .required("Phone Number is required"),

      email: Yup.string()
        .email("Invalid Email")
        .required("Email is required"),

      address: Yup.string().required("Address is required"),

      Course: Yup.string().required("Course is required"),

      dob: Yup.date()
        .max(new Date(), "Future date is not allowed")
        .required("DOB is required"),
    }),




    onSubmit: async (values) => {
      try {

        const res = await AddStudent(values)
        console.log("Submit Clicked");
        console.log(values);




        if (res) {

          Swal.fire({
            title: "Success!",
            text: "Student Added Successfully",
            icon: "success",
            confirmButtonText: "OK"
          });

          navigate("/admin/Student");
        }

      } catch (error) {

        const message = error?.response?.data?.message || "Something went wrong";

        Swal.fire({
          title: "Error!",
          text: message,
          icon: "error",
          confirmButtonText: "OK"
        });

      }
    }

  });

   useEffect(() => {
      fetchData();
    }, []);

  const fetchData = async () => {
    try {


      const res = await ViewAllCourse();


      setCourses(res.data);
      console.log(res);



    } catch (error) {
      console.log(error);
    }
  }

  return (


    <div>

      {/* Add Bus */}
      <div id="view-add-bus" className="space-y-6">


        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

           

            <h2 className="text-3xl font-bold text-slate-800">
              Add Student
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
                <select
                  type="text"
                  name='Course'
                  placeholder="Enter Course"
                  value={formik.values.Course}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                >

                  <option value="">Select Course</option>
                  {courses.filter((item) => item.status === "Active")
                    .map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.courseName}
                      </option>
                    ))}



                </select>
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
