import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Swal from "sweetalert2";

import { FaEdit, FaTrash, } from "react-icons/fa";

import { ViewAllCourse, updateCourse, DeleteCourse, UpdateStatus } from '../../../Service/admin/Course'
import Loader from '../../../Components/Loader'
export default function Course() {

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)


  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await ViewAllCourse(page, limit);

      await new Promise(resolve => setTimeout(resolve, 1000));
      setCourses(res.data);
      console.log(res);

      setTotalPages(res.totalPages)

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [page, limit]);



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


  const handleUpdate = async (id) => {


    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, update it!"
    });

    if (result.isConfirmed) {
      try {
        await updateCourse(id);

        Swal.fire({
          title: "UpdateCourse!",
          text: "Student update Successfully",
          icon: "success"
        });

        fetchData(); // Refresh table
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "update Failed",
          icon: "error"
        });
      }
    }
  };


  const handeleDelete = async (id) => {
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
        await DeleteCourse(id);

        Swal.fire({
          title: "Deleted!",
          text: "Student Deleted Successfully",
          icon: "success"
        });

        fetchData(); // Refresh table
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Delete Failed",
          icon: "error"
        });
      }
    }
  };


  return (
    <div>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-slate-800">
            Course List
          </h2>

          <Link
            to="/admin/course/add"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
          >
            <i data-lucide="plus" className="w-5 h-5"></i>
            <span>Add Course</span>
          </Link>

        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">


          {loading ? (
            <Loader />
          ) : (

            <div className="overflow-x-auto">



              <table className="w-full text-left">

                <thead className="bg-slate-50 border-b border-slate-200">

                  <tr className="text-sm text-slate-500 font-semibold">

                    <th className="px-8 py-4">Course Name</th>

                    <th className="px-8 py-4">Course Code</th>

                    <th className="px-8 py-4">Department</th>

                    <th className="px-8 py-4">Duration</th>

                    <th className="px-8 py-4">Total Semester</th>
                    <th className="px-8 py-4">Status</th>

                    {/* <th className="px-8 py-4">courseType</th>

                  <th className="px-8 py-4">Description</th>  */}



                    <th className="px-8 py-4 text-right">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-200">

                  {/* Bus data will come here */}
                  {courses?.map((course) => (




                    <tr key={course._id} className="border-b hover:bg-gray-50">
                      <td className="px-5 py-4">{course.courseName}</td>
                      <td className="px-5 py-4">{course.courseCode}</td>
                      <td className="px-5 py-4">{course.department}</td>
                      <td className="px-5 py-4">{course.duration}</td>
                      <td className="px-5 py-4">{course.totalSemester}</td>

                      <td className="px-6 py-4">{course.status}</td>


                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-4">

                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={course.status === "Active"}
                              onChange={() => handleStatus(course._id)}
                              className="sr-only peer"
                            />

                            <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"></div>

                            <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                          </label>

                          <Link
                            to={`/admin/course/edit/${course._id}`}
                            state={{ course: course }}
                            className="text-blue-600 hover:text-blue-800 text-lg"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>


                          

                          <button

                            onClick={() => handeleDelete(course._id)}
                            className="text-red-600 hover:text-red-800 text-lg"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>

                        </div>
                      </td>
                    </tr>




                  ))}

                </tbody>

              </table>
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">

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


          )}

        </div>

      </div>

    </div>
  )
}
