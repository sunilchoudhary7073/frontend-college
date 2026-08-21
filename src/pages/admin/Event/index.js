import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";

import { DeleteEvent, ViewAllEvent } from '../../../Service/admin/Event'

export default function EventList() {

    const [events, setEvent] = useState([])
      const [page, setPage] = useState(1)
      const [limit, setLimit] = useState(2)
      const [totalPages, setTotalPages] = useState(1)



    useEffect(() => {

        fatchData(page,limit)
    }, [])
    const fatchData = async () => {
        try {
            const res = await ViewAllEvent();
            console.log(res.data);

            setEvent(res); // ya res.data, response ke hisab se
             setTotalPages(res.totalPages)
        } catch (error) {
            console.log(error);
        }
    };




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

        if (!result.isConfirmed) return;

        const res = await DeleteEvent(id);

        if (res.status) {
            Swal.fire({
                title: "Deleted!",
                text: res.message,
                icon: "success",
            });

            await fatchData();
        } else {
            Swal.fire({
                title: "Error!",
                text: res.message,
                icon: "error",
            });
        }
    };



    return (
        <div>
            <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Event List
                    </h2>

                    <Link
                        to="/admin/event/add"
                        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
                    >
                        <i data-lucide="plus" className="w-5 h-5"></i>
                        <span>Add Event</span>
                    </Link>

                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead className="bg-slate-50 border-b border-slate-200">

                                <tr className="text-sm text-slate-500 font-semibold">

                                    <th className="px-5 py-4">Event Title</th>

                              

                                    <th className="px-5 py-4">Event Date</th>


                                    <th className="px-5 py-4">Start Time</th>

                                    <th className="px-5 py-4">End Time</th>

                                    <th className="px-5 py-4">Location</th>
                                    <th className="px-5 py-4">Status</th>

                                    <th className="px-5 py-4 text-right">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-slate-200">

                                {/* Bus data will come here */}
                                {events?.map((event) => (
                                    <tr key={event._id} className="border-b hover:bg-gray-50">
                                        <td className="px-5 py-4">{event.eventTitle}</td>
                                   
                                        <td className="px-5 py-4">{event.event_date}</td>
                                        <td className="px-5 py-4">{event.start_time}</td>
                                        <td className="px-5 py-4">{event.end_time}</td>
                                        <td className="px-5 py-4">{event.location}</td>


                                        <td className="px-5 py-4">
                                            {event.status ? "Active" : "Inactive"}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex justify-center gap-3">

                                                <Link
                                                    to={`/admin/event/edit/${event._id}`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <FaEdit size={18} />
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(event._id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <FaTrash size={18} />
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>

                         <div className="flex items-center justify-end border-t border-white/10 px-4 py-3 sm:px-6">

                  <div className="flex flex-1 justify-between sm:hidden">
                    <button className="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10">
                      Previous
                    </button>

                    <button className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10">
                      Next
                    </button>
                  </div>


                  <nav
                    aria-label="Pagination"
                    className="isolate inline-flex -space-x-px rounded-md"
                  >
                    {/* Previous */}
                    <button
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                      className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${page === 1
                        ? "cursor-not-allowed opacity-50"
                        : "hover:bg-white/5 cursor-pointer"
                        }`}
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setPage(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${page === pageNumber
                            ? "bg-indigo-500 text-white"
                            : "text-gray-200 hover:bg-white/5"
                            }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    {/* Next */}
                    <button
                      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={page === totalPages}
                      className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${page === totalPages
                        ? "cursor-not-allowed opacity-50"
                        : "hover:bg-white/5 cursor-pointer"
                        }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>

                    </div>

                </div>

            </div>

        </div>
    )
}
