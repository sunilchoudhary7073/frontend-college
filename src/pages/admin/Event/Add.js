
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {  useFormik } from 'formik';
import *as Yup from 'yup'

import { AddEvent as AddEventApi } from "../../../Service/admin/Event";
import { Tag } from 'lucide-react';

export default function AddEvent() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            eventTitle:"",
            description:"",
            event_date:"",
            start_time:"",
            end_time:"",
            location:"",
            tag:""

        },

        validationSchema:Yup.object({
            eventTitle:Yup.string().required("EventTitle is required"),
               description:Yup.string().required("Description is required"),
                  event_date:Yup.date().required("EventDate is required"),
                      start_time:Yup.string().required("StartTime is required"),
                         end_time:Yup.string().required("EndTime is required"),
                            location:Yup.string().required(" Location is required"),
                             tag:Yup.string().required(" function tag is required")

        }),

        onSubmit: async (values) => {
            try {
                const res = await AddEventApi(values);   // 👈 yaha bhi change

                if (res) {
                    Swal.fire({
                        title: "Success!",
                        text: "Event Added Successfully",
                        icon: "success",
                        confirmButtonText: "OK",
                    });

                    navigate("/admin/event");
                }
            } catch (error) {
                // ...
            }
        }
    });

    return (
        <div>
            <div id="view-add-event" className="space-y-6">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">

                        <button
                            type="button"
                            className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-300 hover:bg-slate-100 transition"
                            onClick={() => navigate("/admin/event")}
                        >
                            ←
                        </button>

                        <h2 className="text-3xl font-bold text-slate-800">
                            Add Event
                        </h2>

                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 w-full">

                    <form onSubmit={formik.handleSubmit}>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {/* Event Title */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Event Title
                                </label>

                                <input
                                    type="text"
                                    name="eventTitle"
                                    placeholder="Enter Event Title"
                                    value={formik.values.eventTitle}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />

                                {formik.touched.eventTitle && formik.errors.eventTitle && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.eventTitle}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    placeholder="Enter Description"
                                    rows={3}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                />

                                {formik.touched.description && formik.errors.description && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Event Date */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Event Date
                                </label>

                                <input
                                    type="date"
                                    name="event_date"
                                    value={formik.values.event_date}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                />

                                {formik.touched.event_date && formik.errors.event_date && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.event_date}
                                    </p>
                                )}
                            </div>

                            {/* Start Time */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Start Time
                                </label>

                                <input
                                    type="time"
                                    name="start_time"
                                    value={formik.values.start_time}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                />

                                {formik.touched.start_time && formik.errors.start_time && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.start_time}
                                    </p>
                                )}
                            </div>

                            {/* End Time */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    End Time
                                </label>

                                <input
                                    type="time"
                                    name="end_time"
                                    value={formik.values.end_time}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                />

                                {formik.touched.end_time && formik.errors.end_time && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.end_time}
                                    </p>
                                )}
                            </div>

                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Function Tag
                                </label>

                                <input
                                    type="text"
                                    name="tag"
                                    value={formik.values.tag}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                />
                                  

                                {formik.touched.tag && formik.errors.tag && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.tag}
                                    </p>
                                )}
                                
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Enter Event Location"
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />

                                {formik.touched.location && formik.errors.location && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.location}
                                    </p>
                                )}
                            </div>

                        </div>

                        <div className="border-t border-slate-200 my-8"></div>

                        <div className="flex justify-end gap-4">

                            <button
                                type="button"
                                onClick={() => navigate("/admin/event")}
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