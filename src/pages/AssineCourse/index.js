import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import Loader from "../../Components/Loader";
import { ViewAllAssineCourse, deleteAssinecourse, updateAssinecourse,FindOneAssinecourse } from "../../Service/admin/AssineCourse";

import { FaEdit, FaTrash } from "react-icons/fa";

export default function AssignCourseList() {
    const [assinecourse, setAssinecourse] = useState([]);
    const [loader, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [limit] = useState(2);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getAssinecourse();
        handleFindOne()
    }, [page, limit]);


    const getAssinecourse = async () => {
        try {
            setLoading(true);

            const res = await ViewAllAssineCourse(page, limit);

                    console.log("FULL RESPONSE:", res);
      
        console.log("IS ARRAY:", Array.isArray(res?.data));

            console.log("Assign Course Data:", res);

            setAssinecourse(res || []);
            setTotalPages(res?.totalPages || 1);
        } catch (error) {
            console.log("Get Assign Course Error:", error);

            Swal.fire({
                title: "Error!",
                text: "Assign Course data load nahi ho raha.",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // DELETE
    // =========================
    const handleDelete = async (id) => {
        const res = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "Cancel",
        });

        if (!res.isConfirmed) {
            return;
        }

        try {
            await deleteAssinecourse(id);

            Swal.fire({
                title: "Deleted!",
                text: "Assign Course deleted successfully.",
                icon: "success",
            });

            getAssinecourse(res.data);
        } catch (error) {
            console.log("Delete Error:", error);

            Swal.fire({
                title: "Error!",
                text: "Delete Failed",
                icon: "error",
            });
        }
    };

    const handleFindOne=async(id)=>{
        try {
            const res=await FindOneAssinecourse(id)
            console.log(res)
            if(res.status){
                 getAssinecourse(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to update this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            await updateAssinecourse(id);

            Swal.fire({
                title: "Updated!",
                text: "Assign Course updated successfully.",
                icon: "success",
            });

            getAssinecourse();
        } catch (error) {
            console.log("Update Error:", error);

            Swal.fire({
                title: "Error!",
                text: "Update Failed",
                icon: "error",
            });
        }
    };


    if (loader) {
        return <Loader />;
    }

    return (
        <div>
            <div className="space-y-6">

                {/* ================= HEADER ================= */}
                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Assign Course List
                    </h2>

                    <Link
                        to="/admin/assine-course/add"
                        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
                    >
                        <span>+ Add</span>
                    </Link>

                </div>

                {/* ================= TABLE ================= */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr className="text-sm text-slate-500 font-semibold">


                                    <th className="px-6 py-4">
                                        Student
                                    </th>

                                    <th className="px-6 py-4">
                                        Courses
                                    </th>



                                    <th className="px-6 py-4">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200">

                                {assinecourse.length > 0 ? (

                                    assinecourse.map((item, index) => (

                                        <tr
                                            key={item?._id || index}
                                            className="hover:bg-slate-50 transition"
                                        >

                                         

                                            {/* STUDENT */}
                                            <td className="px-6 py-4 font-semibold text-slate-800">
                                                {item?.studentId?.StudentName || "-"}
                                            </td>

                                            {/* COURSES */}
                                            <td className="px-6 py-4">
                                                {item?.courseId?.length > 0
                                                    ? item.courseId
                                                        .map((course) => course?.courseName)
                                                        .filter(Boolean)
                                                        .join(", ")
                                                    : "-"}
                                            </td>

                                            {/* STATUS */}
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${item?.status === "Active"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {item?.status || "Inactive"}
                                                </span>
                                            </td>

                                            {/* ACTIONS */}
                                            <td className="px-6 py-4">

                                                <div className="flex items-center justify-center gap-4">

                                                    <Link
                                                        to={`/admin/assine-course/edit/${item?._id}`}
                                                        state={{ item }}
                                                        className="text-blue-600 hover:text-blue-800 text-lg"
                                                    >
                                                        <FaEdit />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(item?._id)}
                                                        className="text-red-600 hover:text-red-800 text-lg"
                                                    >
                                                        <FaTrash />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-6 text-gray-500"
                                        >
                                            No Assign Course Found
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                        {/* ================= PAGINATION ================= */}

                        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 sm:px-6">

                            <button
                                type="button"
                                onClick={() =>
                                    setPage((prev) => Math.max(prev - 1, 1))
                                }
                                disabled={page === 1}
                                className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${page === 1
                                    ? "cursor-not-allowed opacity-50"
                                    : "hover:bg-slate-100"
                                    }`}
                            >
                                Previous
                            </button>

                            <div className="flex items-center gap-1">

                                {[...Array(totalPages)].map((_, index) => {

                                    const pageNumber = index + 1;

                                    return (
                                        <button
                                            type="button"
                                            key={pageNumber}
                                            onClick={() => setPage(pageNumber)}
                                            className={`px-4 py-2 rounded-md text-sm font-semibold ${page === pageNumber
                                                ? "bg-indigo-500 text-white"
                                                : "text-gray-700 hover:bg-slate-100"
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );

                                })}

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                disabled={page === totalPages}
                                className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${page === totalPages
                                    ? "cursor-not-allowed opacity-50"
                                    : "hover:bg-slate-100"
                                    }`}
                            >
                                Next
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}