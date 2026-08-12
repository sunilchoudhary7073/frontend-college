import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Formik, useFormik } from 'formik';
import *as Yup from 'yup'
import { AddTeacher } from '../../../Service/admin/Teacher';
// import { text } from 'express';


export default function Add() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      TeacherName: "",
      PhoneNumber: "",
      Email: "",
      Department: "",
      Qualification: "",
      Experience: "",
      gender: "",
      Image: null

    },

    validationSchema: Yup.object({
      TeacherName: Yup.string().required("Teacher Name is required"),

      PhoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits")
        .required("Phone Number is required"),

      Email: Yup.string()
        .email("Invalid Email")
        .required("Email is required"),

      Department: Yup.string().required("Department is required"),

      Qualification: Yup.string().required("Qualification is required"),

      Experience: Yup.string().required("Experience is required"),

      gender: Yup.string().required("Gender is required"),

      image: Yup.mixed().required("Image is required"),
    }),

    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("TeacherName", values.TeacherName);
        formData.append("PhoneNumber", values.PhoneNumber);
        formData.append("Email", values.Email);
        formData.append("Department", values.Department);
        formData.append("Qualification", values.Qualification);
        formData.append("Experience", values.Experience);
        formData.append("gender", values.gender);

        if (values.image) {
          formData.append("image", values.image);
        }

        console.log("FORM DATA:");

        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }

        const res = await AddTeacher(formData);

        console.log("API RESPONSE:", res);

        if (res?.status) {
          Swal.fire({
            title: "Success!",
            text: "Teacher Added Successfully",
            icon: "success",
          });

          navigate("/admin/Teacher");
        } else {
          Swal.fire({
            title: "Error!",
            text: res?.message || "Teacher add failed",
            icon: "error",
          });
        }

      } catch (error) {
        console.log("ADD TEACHER ERROR:", error);

        const message =
          error?.response?.data?.message ||
          "Something went wrong";

        Swal.fire({
          title: "Error!",
          text: message,
          icon: "error",
        });
      }
    },
  });


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
              Add Teacher
            </h2>

          </div>

        </div>

        {/* Form Card */}
        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 w-full">

          <form onSubmit={formik.handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {/* Bus Number */}
              {/* Teacher Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Teacher Name
                </label>
                <input
                  type="text"
                  name="TeacherName"
                  placeholder="Enter Teacher Name"
                  value={formik.values.TeacherName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />
                {formik.touched.TeacherName && formik.errors.TeacherName && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.TeacherName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="PhoneNumber"
                  placeholder="Enter Phone Number"
                  value={formik.values.PhoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  max={10}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />
                {formik.touched.PhoneNumber && formik.errors.PhoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.PhoneNumber}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  placeholder="Enter Email"
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />
                {formik.touched.Email && formik.errors.Email && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.Email}</p>
                )}
              </div>



              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Gender
                </label>
                <select

                  type="text"
                  name='gender'
                  placeholder="Enter gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Custom">Custom</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.gender}
                  </p>
                )}

              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="Department"
                  placeholder="Enter Department"
                  value={formik.values.Department}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />
                {formik.touched.Department && formik.errors.Department && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.Department}</p>
                )}
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Qualification
                </label>
                <input
                  type="text"
                  name="Qualification"
                  placeholder="Enter Qualification"
                  value={formik.values.Qualification}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />
                {formik.touched.Qualification && formik.errors.Qualification && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.Qualification}</p>
                )}
              </div>



              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Experience
                </label>
                <input
                  type="text"
                  name="Experience"
                  placeholder="Enter Experience"
                  value={formik.values.Experience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />
                {formik.touched.Experience && formik.errors.Experience && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.Experience}</p>
                )}
              </div>


              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Image
                </label>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    formik.setFieldValue("image", e.currentTarget.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 py-2 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />

                {formik.touched.image && formik.errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.image}
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
                onClick={() => navigate("/admin/Teacher")}
                className="px-8 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition"
              >
                Cancel
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