import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from '../../../Components/Loader';

import { ViewAllbatch, DeleteBatch, UpdateStatus, UpdateBatch } from '../../../Service/admin/collage'
export default function BatchList() {

    const [Batchs, setBatch] = useState([])
    const [loading, setLoading]=useState(true)

    const fetchData = async () => {
        try {
            const res = await ViewAllbatch();

            await new Promise(resolve => setTimeout(resolve, 1000));
            setBatch(res);
            console.log(res);
            setLoading(true)
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete it!"
        });

        if (result.isConfirmed) {
            try {
                await DeleteBatch(id);

                Swal.fire({
                    title: "Deleted!",
                    text: "Batch Deleted Successfully",
                    icon: "success"
                });


                fetchData();

            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Delete Failed",
                    icon: "error"
                });
            }
        }
    };



    const handleStatus = async (id) => {
        try {
            await UpdateStatus(id);

            Swal.fire({
                icon: "success",
                title: "Status Updated",
                timer: 1200,
                showConfirmButton: false,
            });

            fetchData();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Status Update Failed",
            });
        }
    };

const handleEdit=()=>{

}


    return (
        <div>
            <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Batch List
                    </h2>

                    <Link
                        to="/admin/batch/add"
                        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
                    >
                        <i data-lucide="plus" className="w-5 h-5"></i>
                        <span>+Add Batch </span>
                    </Link>

                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

                    {loading ? (
                        <Loader />
                    ) : (

                        <div className="overflow-x-hidden">

                            <table className="min-w-full text-left" >

                                <thead className="bg-slate-50 border-b border-slate-200">

                                    <tr className="text-sm text-slate-500 font-semibold">

                                        <th className="px-5 py-4">Batch Name</th>

                                        <th className="px-5 py-4">Course Name</th>

                                        <th className="px-5 py-4">Class Teacher</th>
                                        <th className="px-5 py-4">Start Date</th>
                                        <th className="px-5 py-4">End Date</th>

                                        <th className="px-5 py-4">Status</th>

                                        <th className="px-5 py-4 text-right">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-slate-200">

                                    {/* Bus data will come here */}
                                    {Batchs?.map((batch) => (
                                        <tr key={batch._id} className="border-b hover:bg-gray-50">
                                            <td className="px-5 py-4">{batch.batchName}</td>
                                            <td className="px-5 py-4">{batch.courseName}</td>
                                            <td className="px-5 py-4">{batch.classTeacher}</td>
                                            <td className="px-5 py-4">{batch.startDate}</td>
                                            <td className="px-5 py-4">{batch.endDate}</td>

                                            <td className="px-5 py-4">
                                                <label className="relative inline-flex items-center cursor-pointer">

                                                    <input
                                                        type="checkbox"
                                                        checked={batch.status === "Active"}
                                                        onChange={() => handleStatus(batch._id, batch.status)}
                                                        className="sr-only peer"
                                                    />

                                                    <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"></div>

                                                    <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>

                                                </label>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex justify-center gap-3">
                                                    <button
                                                    onClick={() => handleEdit(batch._id)}
                                                    className="text-blue-600 hover:text-blue-800 text-xl"
                                                >
                                                    ✏️
                                                </button>

                                                    <button
                                                        onClick={() => handleDelete(batch._id)}
                                                        className="text-red-600 hover:text-red-800 text-xl"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </div>

        </div>
    )
}

