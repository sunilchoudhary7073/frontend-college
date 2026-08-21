import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Formik, useFormik } from 'formik';
import *as Yup from 'yup'
import { AddCourseAssine,FindOneAssinecourse } from '../../Service/admin/AssineCourse';
import { ViewAllStudent } from '../../Service/admin/collage'

import { ViewAllCourse } from '../../Service/admin/Course'
// import { text } from 'express';




export default function CourseAssineAdd() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([])
    const [courses, setCourses] = useState([])


    const formik = useFormik({
        initialValues: {
            studentId: "",
            courseId: [],
            assignDate: ''


        },

        validationSchema: Yup.object({
            studentId: Yup.string().required("Teacher Name is required"),

            courseId: Yup.array()
                .of(Yup.string())
                .min(1, "Please select at least one course")
                .required("Course is required"),

            assignDate: Yup.string().required("Assign date is required"),




        }),


        onSubmit: async (values) => {
            try {
                const res = await AddCourseAssine(values);

                if (res) {
                    Swal.fire({
                        title: "Success!",
                        text: "Course Added Successfully",
                        icon: "success",
                    });

                    navigate("/admin/Assine-course");
                }
            } catch (error) {
                const message =
                    error?.response?.data?.message || "Something went wrong";

                Swal.fire({
                    title: "Error!",
                    text: message,
                    icon: "error",
                });
            }
        },
    });




    useEffect(() => {
        getStudents()
        fetchData()


    }, [])


    const getStudents = async () => {
        try {

            const res = await ViewAllStudent();


            setStudents(res.data || res);


        } catch (error) {
            console.log(error)
        }
    }


   const fetchData = async () => {
    try {
        const res = await ViewAllCourse();

        console.log("Course API Response:", res);

        const courseData = Array.isArray(res)
            ? res
            : Array.isArray(res?.data)
                ? res.data
                : Array.isArray(res?.data?.data)
                    ? res.data.data
                    : [];

        console.log("Courses:", courseData);

        setCourses(courseData);

    } catch (error) {
        console.log("Course API Error:", error);
        setCourses([]);
    }
};



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
                            Add  course
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
                                    Student Id
                                </label>
                                <select
                                    type="text"
                                    name="studentId"
                                    placeholder="Enter student id"
                                    value={formik.values.studentId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                >

                                    <option value="">Select Student</option>

                                    {(students || [])
                                        .filter((item) => item.status === "Active")
                                        .map((item) => (
                                            <option key={item._id} value={item._id}>
                                                {item.StudentName}
                                            </option>
                                        ))}



                                    {formik.touched.studentId && formik.errors.studentId && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.studentId}</p>
                                    )}

                                </select>
                            </div> 




                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Courses
                                </label>

                                <div className="border border-slate-300 rounded-xl p-4 max-h-48 overflow-y-auto">

                                    {(courses || []).map((item) => (
                                        <label
                                            key={item._id}
                                            className="flex items-center gap-3 py-2 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                value={item._id}
                                                checked={formik.values.courseId.includes(item._id)}
                                                onChange={(e) => {
                                                    const { value, checked } = e.target;

                                                    if (checked) {
                                                        formik.setFieldValue("courseId", [
                                                            ...formik.values.courseId,
                                                            value,
                                                        ]);
                                                    } else {
                                                        formik.setFieldValue(
                                                            "courseId",
                                                            formik.values.courseId.filter(
                                                                (id) => id !== value
                                                            )
                                                        );
                                                    }
                                                }}
                                                className="w-4 h-4"
                                            />

                                            <span className="text-sm text-slate-700">
                                                {item.courseName}
                                            </span>
                                        </label>
                                    ))}


                                </div>

                                {formik.touched.courseId && formik.errors.courseId && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.courseId}
                                    </p>
                                )}

                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Assign Date
                                </label>

                                <input
                                    type="date"
                                    name="assignDate"
                                    value={formik.values.assignDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />

                                {formik.touched.assignDate && formik.errors.assignDate && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.assignDate}
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
                                onClick={() => navigate("/admin/assine-course")}
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