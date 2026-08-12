import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Formik, useFormik } from 'formik';
import *as Yup from 'yup'
import { AddPlacments  } from '../../../Service/admin/Placement';



export default function AddPlacment() {
  const navigate = useNavigate();

const formik = useFormik({
  initialValues: {
    studentName: "",
    companyName: "",
    year: "",
  },

  validationSchema: Yup.object({
    studentName: Yup.string().required("Student Name is required"),
    companyName: Yup.string().required("Company Name is required"),
    year: Yup.string().required("Year is required"),
  }),

  onSubmit: async (values) => {
    try {
      console.log(values);

      const res = await AddPlacments(values);

      Swal.fire({
        title: "Success!",
        text: "Placement Added Successfully",
        icon: "success",
      });

      navigate("/admin/Placment");
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || error.message,
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

           

            <h2 className="text-3xl font-bold text-slate-800">
              Add Placment 
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
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  placeholder="Enter Teacher Name"
                  value={formik.values.studentName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />
                {formik.touched.studentName && formik.errors.studentName && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.studentName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                 Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter company name"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  max={10}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />
                {formik.touched.companyName&& formik.errors.companyName&& (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.companyName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
               Year
                </label>
                <input
                  type="year"
                  name="year"
                  placeholder="Enter year"
                  value={formik.values.year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />
                {formik.touched.year && formik.errors.year && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.year}</p>
                )}
              </div>



              {/* <div>
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

              </div> */}

              {/* Department */}
              {/* <div>
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
              </div> */}

              {/* Qualification */}
              {/* <div>
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
              </div> */}



              {/* <div>
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
              </div> */}




            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 my-8"></div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">

              <button
                type="button"
                onClick={() => navigate("/admin/Placment")}
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