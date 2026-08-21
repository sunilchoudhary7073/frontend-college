import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

import moment from "moment";
import { ViewAllCourse } from '../../../Service/admin/Course'
import { ViewAllStudent, } from '../../../Service/admin/collage'

import { UpdateFees, FindFees } from "../../../Service/admin/collage";

export default function Edit() {
    const [fees, setFees] = useState(null);
    const [courses, setCourses] = useState([])

    const [students, setStudents] = useState([])

    const navigate = useNavigate();
    const { id } = useParams();
    console.log("fees ID:", id);

    const fetchFees = async () => {
        try {
            const data = await FindFees(id);

            console.log("Fees Data:", data);

            setFees(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFees();
    }, []);



    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {

            studentName:fees?.studentName?._id || "",
            courseId: fees?.courseId?._id || "",
            totalFees: fees?.totalFees || "",
            discount: fees?.discount || 0,
            paidAmount: fees?.paidAmount || "",
            dueAmount: fees?.dueAmount || "",
            paymentDate: fees?.paymentDate
                ? fees.paymentDate.split("T")[0]
                : "",
        },

        validationSchema: Yup.object({
            studentName: Yup.string().required("Student Name Required"),
            courseId: Yup.string().required("Course Name Required"),
            totalFees: Yup.number().required("Total Fees Required"),
        }),

        onSubmit: async (values) => {
            try {
                const payableFees =
                    Number(values.totalFees) - Number(values.discount);

                const data = {
                    ...values,
                    totalFees: Number(values.totalFees),
                    discount: Number(values.discount),
                    paidAmount: Number(values.paidAmount),
                    dueAmount:
                        payableFees - Number(values.paidAmount),
                };

                const res = await UpdateFees(id, data);

                if (res.data.status) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Fees Updated Successfully",
                    });

                    navigate("/admin/fees");
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text:
                        error?.response?.data?.message ||
                        "Something went wrong",
                });
            }
        },
    });

    useEffect(() => {

        getStudents()
    }, [])




    const getStudents = async () => {
        try {
            const res = await ViewAllStudent();

            console.log("STUDENT RESPONSE:", res);

            setStudents(res?.data || res || []);

        } catch (error) {
            console.log("GET STUDENTS ERROR:", error);
            setStudents([]);
        }
    };


    useEffect(() => {
        const fatchData = async () => {
            const res = await ViewAllCourse();
            setCourses(res.data);

        }
        fatchData()
    }, [])




    // Discount minus calculation

    const payableFees =
        Number(formik.values.totalFees || 0) -
        Number(formik.values.discount || 0);



    return (

        <div className="bg-white rounded-3xl border shadow-sm p-8">

            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div>
                        <label>Student Name</label>

                        <select

                            name="studentName"
                            value={formik.values.studentName||""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full h-12 px-4 border rounded-xl"
                        >
                            <option value="">Select Student</option>

                            {students.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.StudentName}
                                </option>
                            ))}
                        </select>

                        {formik.touched.studentName && formik.errors.studentName && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.studentName}
                            </p>
                        )}


                    </div>
                    <div>
                        <label className="block mb-2 font-medium">
                            Course Name
                        </label>

                        <select
                            name="courseId"
                            value={formik.values.courseId||""}
                            onChange={formik.handleChange}
                            className="w-full h-12 px-4 border rounded-xl"
                        >
                            <option value="">Select Course</option>

                            {courses
                                .filter((item) => item.status === "Active")
                                .map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.courseName}
                                    </option>
                                ))}
                        </select>

                        {formik.touched.courseName && formik.errors.courseName && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.courseName}
                            </p>
                        )}
                    </div>
                    <div>
                        <label>Total Fees</label>
                        <input
                            type="number"
                            name="totalFees"
                            value={formik.values.totalFees}
                            onChange={formik.handleChange}
                            className="w-full h-12 px-4 border rounded-xl"
                        />

                    </div>
                    <div>
                        <label>Discount</label>

                        <input
                            type="number"
                            name="discount"
                            value={formik.values.discount}
                            onChange={formik.handleChange}
                            className="w-full h-12 px-4 border rounded-xl"
                            placeholder="Enter Discount"
                        />

                    </div>
                    <div>
                        <label>Payable Fees</label>

                        <input
                            type="number"
                            value={payableFees}
                            readOnly
                            className="w-full h-12 px-4 border rounded-xl bg-gray-100"
                        />

                    </div>
                    <div>
                        <label>Paid Amount</label>

                        <input
                            type="number"
                            name="paidAmount"
                            value={formik.values.paidAmount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full h-12 px-4 border rounded-xl"
                        />

                    </div>

                    <div>
                        <label>Due Amount</label>

                        <input
                            type="number"
                            name="dueAmount"
                            value={
                                payableFees - Number(formik.values.paidAmount || 0)
                            }
                            readOnly
                            className="w-full h-12 px-4 border rounded-xl bg-gray-100"
                        />

                    </div>





                    <div>
                        <label>Payment Date</label>

                        <input
                            type="date"
                            name="paymentDate"
                            value={
                                formik.values.paymentDate
                                    ? moment(formik.values.paymentDate).format("DD/MM/YYYY")
                                    : ""
                            }
                            onChange={formik.handleChange}
                            className="w-full h-12 px-4 border rounded-xl"
                        />

                        <p className="text-sm text-gray-500 mt-2">
                            {formik.values.paymentDate
                                ? moment(formik.values.paymentDate).format("DD/MM/YYYY")
                                : ""}
                        </p>
                    </div>


                </div>



                <div className="mt-8 flex justify-end gap-4">


                    <button
                        type="button"
                        onClick={() => navigate("/admin/fees")}
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

    )
}








