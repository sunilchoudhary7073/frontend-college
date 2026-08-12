import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import {ViewOne } from "../../../Service/admin/Event";
import { Image_url } from '../../../config/config';


export default function EditEvent() {
    const [event, setEvent] = useState([])

    const navigate = useNavigate()
    const { id } = useParams();
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

            

        },

        validationSchema: Yup.object({
            studentName: Yup.string().required("Student Name is required"),
            fatherName: Yup.string().required("father Name is required"),
            motherName: Yup.string().required("mother Name is required"),
            gender: Yup.string().required("gender Name is required"),
            aadhaar: Yup.string().required("Aadhaar Number is required"),
            session: Yup.string().required("session is required"),
            admissionDate: Yup.string().required("admissionDate is required"),
            qualification: Yup.string().required("qualification is required"),
            board: Yup.string().required("board is required"),
            passingYear: Yup.number().required("passingYear is required"),
            percentage: Yup.string().required("parcentage is required"),
            mobile: Yup.string()
                .matches(/^[0-9]{10}$/, "mobile number must be exactly 10 digits")
                .required("Phone Number is required"),

            email: Yup.string()
                .email("Invalid Email")
                .required("Email is required"),

            address: Yup.string().required("Address is required"),

            courseName: Yup.string().required("CourseName is required"),

            DOB: Yup.date()
                .max(new Date(), "Future date is not allowed")
                .required("DOB is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Do you want to update this admission?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Update it!"
            });

            if (!result.isConfirmed) return;

            try {
                const formData = new FormData();

                Object.keys(values).forEach((key) => {
                    formData.append(key, values[key]);
                });

                const res = await UpdateAdmission(id, formData);

                if (res.data.status) {
                    await Swal.fire({
                        icon: "success",
                        title: "Updated!",
                        text: "Admission Updated Successfully"
                    });

                    resetForm();
                    navigate("/admin/addmissions");
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response?.data?.message || "Update Failed"
                });
            }
        }

    });



    const getaddmission = async (id) => {
        try {
            const res = await FindOneAddmission(id);

            console.log("API Response :", res.data);

            // agar response {status:true,data:{...}} hai
            setAddmission(res.data.data);

            // agar response direct object ho to ye use karo
            // setTeacher(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            getaddmission(id);
        }
    }, [id]);

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
                            Add Students
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
                                    name="studentName"
                                    placeholder="Enter Student Name"
                                    value={formik.values.studentName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />

                                {formik.touched.studentName && formik.errors.studentName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.studentName}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    father Name
                                </label>
                                <input
                                    type="text"
                                    name="fatherName"
                                    placeholder="EnterfatherName"
                                    value={formik.values.fatherName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}

                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {formik.touched.fatherName && formik.errors.fatherName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.fatherName}
                                    </p>
                                )}
                            </div>


                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    mother Name
                                </label>
                                <input
                                    type='text'
                                    name='motherName'
                                    placeholder="Enter the motherName "
                                    value={formik.values.motherName}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {formik.touched.motherName && formik.errors.motherName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.motherName}
                                    </p>
                                )}


                            </div>






                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    gender
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

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="DOB"
                                    value={formik.values.DOB}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                />

                                {formik.touched.DOB && formik.errors.DOB && (
                                    <p className="text-red-500 text-sm">
                                        {formik.errors.DOB}
                                    </p>
                                )}

                            </div>


                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    mobile
                                </label>
                                <input
                                    type="text"
                                    name='mobile'
                                    placeholder="Enter mobile number"
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {formik.touched.mobile && formik.errors.mobile && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.mobile}
                                    </p>
                                )}
                            </div>



                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    email
                                </label>
                                <input
                                    type="text"
                                    name='email'
                                    placeholder="Enter email Id"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.email}
                                    </p>
                                )}
                            </div>




                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Aaddhaar
                                </label>
                                <input
                                    type="text"
                                    name='aadhaar'
                                    placeholder="Enter aadhaar number"
                                    value={formik.values.aadhaar}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {formik.touched.aadhaar && formik.errors.aadhaar && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.aadhaar}
                                    </p>
                                )}
                            </div>




                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    address
                                </label>
                                <input
                                    type="text"
                                    name='address'
                                    placeholder="Enter address"
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
                                    course Name
                                </label>
                                <input
                                    type="text"
                                    name='courseName'
                                    placeholder="Enter course name"
                                    value={formik.values.courseName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {formik.touched.courseName && formik.errors.courseName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.courseName}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    qualification
                                </label>
                                <input
                                    type="text"
                                    name='qualification'
                                    placeholder="Enter qualification"
                                    value={formik.values.qualification}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {formik.touched.qualification && formik.errors.qualification && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.qualification}
                                    </p>
                                )}
                            </div>


                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    session
                                </label>
                                <select
                                    type="text"
                                    name='session'
                                    placeholder="Enter session"
                                    value={formik.values.session}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                >

                                    <option value="">Select Session</option>
                                    <option value="2023-24">2023-24</option>
                                    <option value="2024-25">2024-25</option>
                                    <option value="2025-26">2025-26</option>
                                    <option value="2026-27">2026-27</option>
                                    <option value="2027-28">2027-28</option>
                                </select>
                                {formik.touched.session && formik.errors.session && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.session}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    board
                                </label>
                                <input
                                    type="text"
                                    name='board'
                                    placeholder="Enter the board"
                                    value={formik.values.board}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {formik.touched.board && formik.errors.board && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.board}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    percentage
                                </label>
                                <input
                                    type="text"
                                    name='percentage'
                                    placeholder="Enter percentage"
                                    value={formik.values.percentage}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {formik.touched.percentage && formik.errors.percentage && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.percentage}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    admissionDate
                                </label>
                                <input
                                    type="date"
                                    name='admissionDate'
                                    placeholder="Enter admissionDate"
                                    value={formik.values.admissionDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {formik.touched.admissionDate && formik.errors.admissionDate && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.admissionDate}
                                    </p>
                                )}
                            </div>


                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Passing Year
                                </label>
                                <input
                                    type="text"
                                    name='passingYear'
                                    placeholder="Enter passingYear"
                                    value={formik.values.passingYear}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {formik.touched.passingYear && formik.errors.passingYear && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.passingYear}
                                    </p>
                                )}
                            </div>


                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    photo
                                </label>
                                <input
                                    type="file"
                                    name="photo"
                                    onChange={(e) =>
                                        formik.setFieldValue("photo", e.currentTarget.files[0])
                                    }
                                />

                                {formik.values.photo && (
                                    <img
                                        src={
                                            formik.values.photo instanceof File
                                                ? URL.createObjectURL(formik.values.photo)
                                                : `${Image_url}/${formik.values.photo}`
                                        }
                                        alt="Preview"
                                        className="w-24 h-24 rounded-lg mt-2"
                                    />
                                )}
                            </div>






                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Signature
                                </label>

                                <input

                                    type="file"
                                    name="signature"

                                    accept="image/*"
                                    onChange={(e) => {
                                        formik.setFieldValue("signature", e.currentTarget.files[0]);
                                    }}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                />

                                {formik.values.signature && (
                                    <img
                                        src={
                                            formik.values.signature instanceof File
                                                ? URL.createObjectURL(formik.values.signature)
                                                : `${Image_url}/${formik.values.signature}`
                                        }
                                        alt="Signature"
                                        className="w-40 h-16 mt-2 border rounded"
                                    />
                                )}
                            </div>


                            {/* Bus Name */}





                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-200 my-8"></div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4">

                            <button
                                type="button"
                                onClick={() => navigate("/admin/addmissions")}
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
