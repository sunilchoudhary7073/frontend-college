
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AddNotice } from '../../../Service/admin/Notice';
import { useFormik } from 'formik';
import *as Yup from 'yup'


export default function Addnotice() {

    const navigate = useNavigate()



    const formik = useFormik({
        initialValues: {
            title: "",
           description: "",
            role: "",
            publishDate: "",
            expiryDate: "",
            category:""
           
        },

        validationSchema: Yup.object({
            title: Yup.string()
                .required("Notice Title is required"),

            description: Yup.string()
                .required("Department is required"),

             category: Yup.string()
                .required("Issued By is required"),

            publishDate: Yup.date()
                .required("Publish Date is required"),

            expiryDate: Yup.date()
                .required("Expiry Date is required"),
                
                  
    

     
            role: Yup.number().required("Please select audience"),
        }),
        onSubmit: async (values) => {
            try {

                const res = await AddNotice(values)




                if (res) {

                    Swal.fire({
                        title: "Success!",
                        text: "Notice Added Successfully",
                        icon: "success",
                        confirmButtonText: "OK"
                    });

                    navigate("/admin/notice");
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
                            Add Notice
                        </h2>

                    </div>

                </div>

                {/* Form Card */}
                {/* Form Card */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 w-full">

                    <form onSubmit={formik.handleSubmit}>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Audience
                                </label>

                                <select
                                    name="role"
                                    value={formik.values.role}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                >
                                    <option value="">Select Audience</option>
                                    <option value={1}Teacher>Teacher</option>
                                    <option value={2}>Student</option>
                                    <option value={3}>All</option>
                                </select>

                                {formik.touched.role && formik.errors.role && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.role}
                                    </p>
                                )}
                            </div>






                            {/* Notice Title */}


                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Notice Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter Notice Title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />

                                {formik.touched.title && formik.errors.title && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Department */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                 description
                                </label>

                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Enter description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />

                                {formik.touched.description && formik.errors.description && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Issued By */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                               category
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Enter category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />

                                {formik.touched.category && formik.errors.category && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.category}
                                    </p>
                                )}
                            </div>

                            {/* Publish Date */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Publish Date
                                </label>

                                <input
                                    type="date"
                                    name="publishDate"
                                    value={formik.values.publishDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                />

                                {formik.touched.publishDate && formik.errors.publishDate && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.publishDate}
                                    </p>
                                )}
                            </div>

                            {/* Expiry Date */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Expiry Date
                                </label>

                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={formik.values.expiryDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                />

                                {formik.touched.expiryDate && formik.errors.expiryDate && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.expiryDate}
                                    </p>
                                )}
                            </div>

                            {/* For Whom */}
                          

                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-200 my-8"></div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4">

                            <button
                                type="button"
                                onClick={() => navigate("/admin/Notice")}
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
