import { useState, useEffect } from 'react'
import { Await, Link, useNavigate ,useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import { useFormik } from "formik";
import * as Yup from "yup";
import { UpdateSubject, ViewOneSubject } from '../../../Service/admin/Subject'

import { ViewAllCourse } from '../../../Service/admin/Course'


export default function SubjectsEdit() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [subject, setSubject] = useState([])
    const [courses, setCourses] = useState([])
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
            subjectName: subject.subjectName || "",
            subjectCode: subject.subjectCode || "",
            courseId: subject.courseId || "",
            semester: subject.semester || "",
            credits: subject.credits || "",
            subjectType: subject.subjectType || "",






        },

        validationSchema: Yup.object({
            subjectName: Yup.string().required("subject Name is required"),
            subjectCode: Yup.string().required("subject Code is required"),
            courseId: Yup.string().required("courseId is required"),
            semester: Yup.string().required("semester is required"),
            credits: Yup.number().required("creditsr is required"),
            subjectType: Yup.string().required("subject Type is required"),
            //   description: Yup.string().required("Description is required"),
            //      fees: Yup.number().required("Description is required"),
            // status: Yup.string().required("Status is required"),
        }),


        onSubmit: async (values) => {

            console.log("SUBMIT FUNCTION RUNNING");
            console.log(values);
            try {
                const res = await UpdateSubject(id, values);
                console.log("API RESPONSE:", res);
                if (res) {
                    Swal.fire({
                        title: "Success!",
                        text: "Subject Update Successfully",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });

                    setTimeout(() => {
                        navigate("/admin/subject");
                    }, 1500);
                }

            } catch (error) {

                const message =
                    error?.response?.data?.message ||
                    "Something went wrong";

                Swal.fire({
                    title: "Error!",
                    text: message,
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        }
    });
   useEffect(() => {
        if (id) {
            handlefineOne(id);
        }
    }, [id])


    const handlefineOne = async (id) => {
        try {

            const res = await ViewOneSubject(id)
            console.log(res.data)
            setSubject(res)
        } catch (error) {
            console.log(error)
        }
    }

 
    const fetchData = async () => {
        try {


            const res = await ViewAllCourse();


            setCourses(res.data);
            console.log(res);



        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);





    return (
        <div>

            {/* Add Bus */}
            < div id="view-add-bus" className="space-y-6" >


                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">



                        <h2 className="text-3xl font-bold text-slate-800">
                            Edit Subject
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
                                    Subject Name
                                </label>
                                <input
                                    type="text"
                                    name="subjectName"
                                    value={formik.values.subjectName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"

                                />



                                {formik.touched.subjectName && formik.errors.subjectName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.subjectName}
                                    </p>
                                )}

                            </div>

                            {/* Bus Name */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    SubjectCode
                                </label>
                                <input
                                    type="text"
                                    name="subjectCode"
                                    value={formik.values.subjectCode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                />

                                {formik.touched.subjectCode && formik.errors.subjectCode && (
                                    <p className="text-red-500 text-sm">
                                        {formik.errors.subjectCode}
                                    </p>
                                )}
                            </div>

                            {/* Bus Type */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Course Id
                                </label>
                                <select

                                    name='courseId'
                                    value={formik.values.courseId}
                                    placeholder="Enter the department"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                >
                                    <option value="">Select Student</option>

                                    {(courses)
                                        .filter((item) => item.status === "Active")
                                        .map((item) => (
                                            <option key={item._id} value={item._id}>
                                                {item.courseName}
                                            </option>
                                        ))}


                                    {formik.touched.courseId && formik.errors.courseId && (
                                        <p className="text-red-500 text-sm">
                                            {formik.errors.courseId}
                                        </p>
                                    )}


                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Semester
                                </label>
                                <input
                                    type='text'
                                    name='semester'
                                    value={formik.values.semester}
                                    placeholder="Enter the semester"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300"
                                />
                                {formik.touched.semester && formik.errors.semester && (
                                    <p className="text-red-500 text-sm">
                                        {formik.errors.semester}
                                    </p>
                                )}

                                {/* </input> */}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Credits
                                </label>
                                <input
                                    type='text'
                                    name='credits'
                                    value={formik.values.credits}

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                />




                                {formik.touched.credits && formik.errors.credits && (
                                    <p className="text-red-500 text-sm">
                                        {formik.errors.credits}
                                    </p>
                                )}


                            </div>

                            {/* Total Seats */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subject Type
                                </label>

                                <select
                                    name="subjectType"
                                    value={formik.values.subjectType}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                                >
                                    <option value="">Select Subject Type</option>

                                    <option value="Core">Core</option>
                                    <option value="Elective">Elective</option>
                                    <option value="Practical">Practical</option>
                                </select>

                                {formik.touched.subjectType &&
                                    formik.errors.subjectType && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {formik.errors.subjectType}
                                        </p>
                                    )}
                            </div>

                            {/* <div>
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
               
              </div> */}

                            {/* <div>
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
                {formik.touched.fees && formik.errors.fees && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.fees}
                  </p>
                )}
           
              </div> */}

                            {/* Status */}


                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-200 my-8"></div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4">

                            <button
                                type="button"
                                onClick={() => navigate("/admin/subject")}
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
