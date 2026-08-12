import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateCourse, FindOneCourse } from '../../../Service/admin/Course'


export default function CourseEdit() {
    const [courses, setCourses] = useState([])

    const navigate = useNavigate()
    const { id } = useParams()
    console.log("Course ID:", id);
    // const [AddCourseOpen, setAddCourseOpen] = useState(false)
    // const [courseName, setcourseName] = useState("")
    // const [courseCode, setcourseCode] = useState("")
    // const [department, setdepartment] = useState("")
    // const [duration, setduration] = useState("")
    // const [totalSemester, settotalSemester] = useState("")
    // const [courseType, setcourseType] = useState("")
    // const [description, setdescription] = useState("")
    // const [Status, setStatus] = useState("")

    const formik = useFormik({



        enableReinitialize: true,
        initialValues: {
            courseName: courses.courseName || "",
            courseCode: courses.courseCode || "",
            department: courses.department || "",
            duration: courses.duration || "",
            totalSemester: courses.totalSemester || "",
            courseType: courses.courseType || "",
            description: courses.description || "",
            fees:courses.fees||"",







        },




        validationSchema: Yup.object({
            courseName: Yup.string().required("Course Name is required"),
            courseCode: Yup.string().required("Course Code is required"),
            department: Yup.string().required("Department is required"),
            duration: Yup.string().required("Duration is required"),
            totalSemester: Yup.number().required("Total Semester is required"),
            courseType: Yup.string().required("Course Type is required"),
            description: Yup.string().required("Description is required"),
                        fees: Yup.number().required("fees is required"),
            // status: Yup.string().required("Status is required"),
        }),



        onSubmit: async (values) => {

              console.log("Submit Values:", values);
            alert("Submit Clicked");
            console.log(values);

            try {
                const res = await updateCourse(id, values);



                if (res.data.status) {

                    Swal.fire({
                        title: "Success!",
                        text: "cousre Update Successfully",
                        icon: "success",
                        confirmButtonText: "OK"
                    });

                    navigate("/admin/Course");
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


       console.log("Courses State:", courses);
console.log("Formik Values:", formik.values);

    const fetchData = async () => {
        try {
            const res = await FindOneCourse(id);
            console.log("API Response:", res);
            console.log("Course Data:", res.data);



            setCourses(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [id]);






    return (
        <div>

            {/* Add Bus */}
            < div id="view-add-bus" className="space-y-6" >


                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-300 hover:bg-slate-100 transition">
                            <i data-lucide="arrow-left" className="w-5 h-5"></i>
                        </button>

                        <h2 className="text-3xl font-bold text-slate-800">
                            Edit Course
                        </h2>

                    </div>

                </div>

                {/* Form Card */}
                {/* Form Card */}
                < div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 w-full" >



                    <form onSubmit={formik.handleSubmit}

                    >

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {/* Bus Number */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    course Name
                                </label>
                                <input
                                    type="text"
                                    name="courseName"
                                    value={formik.values.courseName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"

                                />



                                {formik.touched.courseName && formik.errors.courseName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.courseName}
                                    </p>
                                )}

                            </div>

                            {/* Bus Name */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    course Code
                                </label>
                                <input
                                    type="text"
                                    name="courseCode"
                                    value={formik.values.courseCode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                />

                                {formik.touched.courseCode && formik.errors.courseCode && (
                                    <p className="text-red-500 text-sm">
                                        {formik.errors.courseCode}
                                    </p>
                                )}
                            </div>

                            {/* Bus Type */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    department
                                </label>
                                <input
                                    type='text'
                                    name='department'
                                    value={formik.values.department}
                                    placeholder="Enter the department"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                />
                                {formik.touched.department && formik.errors.department && (
                                    <p className="text-red-500 text-sm">
                                        {formik.errors.department}
                                    </p>
                                )}


                                {/* </input> */}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    duration
                                </label>
                                <input
                                    type='text'
                                    name='duration'
                                    value={formik.values.duration}
                                    placeholder="Enter the duration"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                />
                                {formik.touched.duration && formik.errors.duration && (
                                    <p className="text-red-500 text-sm">
                                        {formik.errors.duration}
                                    </p>
                                )}

                                {/* </input> */}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    total Semester
                                </label>
                                <select
                                    type='text'
                                    name='totalSemester'

                                    value={formik.values.totalSemester}
                                    placeholder="Enter the total semester"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                >
                                    <option value="">Select </option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="4">6</option>
                                    <option value="4">8</option>


                                </select>
                                {formik.touched.totalSemester && formik.errors.totalSemester && (
                                    <p className="text-red-500 text-sm">
                                        {formik.errors.totalSemester}
                                    </p>
                                )}


                            </div>

                            {/* Total Seats */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    course Type
                                </label>
                                <input
                                    type="text"
                                    name='courseType'
                                    placeholder="Enter the course type"
                                    value={formik.values.courseType}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {formik.touched.courseType && formik.errors.courseType && (
                                    <p className="text-red-500 text-sm">
                                        {formik.errors.courseType}
                                    </p>
                                )}
                                {/* </input> */}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    description
                                </label>
                                <input
                                    type="text"
                                    name='description'
                                    placeholder="Enter the description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <p className="text-red-500 text-sm">
                                        {formik.errors.description}
                                    </p>
                                )}
                                {/* </input> */}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Fees
                                </label>
                                <input
                                    type="text"
                                    name='fees'
                                    placeholder="Enter the fees"
                                    value={formik.values.fees}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {formik.touched.fees&& formik.errors.fees && (
                                    <p className="text-red-500 text-sm">
                                        {formik.errors.fees}
                                    </p>
                                )}
                                {/* </input> */}
                            </div>

                            {/* Status */}


                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-200 my-8"></div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4">

                            <button
                                type="button"
                                onClick={() => navigate("/admin/Course")}
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

                </div >

            </div >



        </div >
    )
}
