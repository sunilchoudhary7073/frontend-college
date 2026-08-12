import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, useFormik } from "formik";
import *as Yup from 'yup'
import { Addbatch } from "../../../Service/admin/collage";

import { ViewAll } from '../../../Service/admin/Teacher'

export default function Add() {

  const [Teacher, setTeacher] = useState([])
  const navigate = useNavigate();




  const formik = useFormik({
    initialValues: {

      batchName: "",
      courseName: "",
      session: "",
      semester: "",
      section: "",
      strength: "",
      classTeacher: "",
      startDate: "",
      endDate: "",
   
    },

    validationSchema: Yup.object({
      batchName: Yup.string().required("batchName is required"),
      courseName: Yup.string().required("courseId is required"),
      session: Yup.string().required("session is required"),
      semester: Yup.string().required("semester is required"),
      section: Yup.string().required("section is required"),
      strength: Yup.string().required("strength is required"),
      classTeacher: Yup.string().required("classTeacher is required"),
      startDate: Yup.date().required(" startDate is required"),
      endDate: Yup.date().required("endDateis required"),
   
    }),

    onSubmit: async (values) => {
      try {
        const res = await Addbatch(values);
        alert("Submit Clicked");
        console.log(values);



        if (res) {
          Swal.fire({
            title: "Success!",
            text: "Fees Added Successfully",
            icon: "success",
          });

          navigate("/admin/batch");
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error?.response?.data?.message || "Something went wrong",
          icon: "error",
        })
      }
    }
  });


  useEffect(() => {
      getTeachers()
    }, [])
  
  
    const getTeachers = async () => {
      try {
        const res = await ViewAll();
  
         
  
        console.log("Teacher Data:", res);
  
        setTeacher(res.data || res);
  
      } catch (error) {
        console.log(error);
      }
  
      
    };

  return (

    < div id="view-add-bus" className="space-y-6" >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-300 hover:bg-slate-100 transition">
            <i data-lucide="arrow-left" className="w-5 h-5"></i>
          </button>

          <h2 className="text-3xl font-bold text-slate-800">
            add batch
          </h2>

        </div>

      </div>



      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            <div>
              <label>Batch Name</label>
              <input
                type="text"
                name="batchName"
                value={formik.values.batchName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-12 px-4 border rounded-xl"
              />
              {formik.touched.batchName && formik.errors.batchName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.batchName}
                </p>
              )}

            </div>

            <div>
              <label>course Name</label>
              <input
                type="text"
                name="courseName"
                value={formik.values.courseName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-12 px-4 border rounded-xl"
              />
              {formik.touched.courseName && formik.errors.courseName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.courseName}
                </p>
              )}

            </div>

            <div>
              <label>session</label>
              <input
                type="text"
                name="session"
                value={formik.values.session}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-12 px-4 border rounded-xl"
              />
              {formik.touched.session && formik.errors.session && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.session}
                </p>
              )}

            </div>

            <div>
              <label>semester</label>
              <input
                type="number"
                name="semester"
                value={formik.values.semester}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-12 px-4 border rounded-xl"
              />
              {formik.touched.semester && formik.errors.semester && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.semester}
                </p>
              )}

            </div>

            <div>
              <label> section</label>
              <input
                type="text"
                name="section"
                value={formik.values.section}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-12 px-4 border rounded-xl"
              />
              {formik.touched.section && formik.errors.section && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.section}
                </p>
              )}


            </div>

            <div>
              <label>strength</label>
              <input
                type="text"
                name="strength"
                value={formik.values.strength}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-12 px-4 border rounded-xl"
              />
              {formik.touched.strength && formik.errors.strength && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.strength}
                </p>
              )}

            </div>

            <div>
              <label> Class Teacher</label>
              <select
                type="text"
                name="classTeacher"
                value={formik.values.classTeacher}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-12 px-4 border rounded-xl"
              >
              <option value="">Select Course</option>

              {Teacher.filter((item) => item.status === "Active")
              .map((item) => (
                <option key={item._id} value={item._id}>
                  {item.TeacherName}
                </option>
              ))}
              </select>

            </div>




            <div>
              <label> startDate</label>
              <input
                type="date"
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-12 px-4 border rounded-xl"
              />
              {formik.touched.startDate && formik.errors.startDate && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.startDate}
                </p>
              )}

            </div>




            <div>
              <label> endDate</label>
              <input
                type="date"
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-12 px-4 border rounded-xl"
              />
              {formik.touched.endDate && formik.errors.endDate && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.endDate}
                </p>
              )}

            </div>

           

          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/batch")}
              className="px-6 py-3 border rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-violet-600 text-white rounded-xl"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}