import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";

import { FaEdit, FaTrash ,FaUserPlus} from "react-icons/fa";

import StudentDeatials from './StudentDeatials';
import Loader from "../../../Components/Loader";
import { ViewAllStudent, Delete, Update, UpdateStudentStatus } from '../../../Service/admin/collage'




export default function StudentList() {





  const [students, setStudents] = useState([])
  const [open, setOpen] = useState(false);
const [loading,setLoading]=useState(true)
const [studentDetails, setStudentDetails] = useState(null);;
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(7)
  const [totalPages, setTotalPages] = useState(1)


  useEffect(() => {
    getStudents()


  }, [page, limit])


  const getStudents = async () => {
    try {
      setLoading(true);
      const res = await ViewAllStudent(page, limit);

      await new Promise(resolve => setTimeout(resolve, 1000));
      setStudents(res.data || res);
      setTotalPages(res.totalPages)

    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }




  const handleStatus = async (id) => {
    try {
      await UpdateStudentStatus(id);

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        timer: 1200,
        showConfirmButton: false,
      });

      getStudents();
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
        await Update(id);

        Swal.fire({
          title: "Deleted!",
          text: "Student update Successfully",
          icon: "success"
        });

        getStudents(); // Refresh table
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
        await Delete(id);

        Swal.fire({
          title: "Deleted!",
          text: "Student Deleted Successfully",
          icon: "success"
        });

        getStudents(); // Refresh table
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
            Student List
          </h2>

          <Link
            to="/admin/Student/add"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
          >
            <i data-lucide="plus" className="w-5 h-5"></i>
            <span>Add New Student</span>
          </Link>

        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">




          {loading ? (
            <Loader />
          ) : (

            <div className="overflow-x-hidden">
              <table className="min-w-full text-left">
                <thead>


                  <tr>
                    <th className="px-5 py-3 text-left">Name</th>
  
                    <th className="px-5 py-3 text-left">Email</th>
                    <th className="px-5 py-3 text-left">Course</th>
                    <th className="px-5 py-3 text-left">DOB</th>
                    <th className="px-5 py-3 text-left">Status</th>
                    <th className="px-5 py-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {students?.map((student) => (
                    <tr key={student._id} className="border-b hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <Link
                          to="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen(true);
                            setStudentDetails(student); // student pass karein
                          }}
                        >
                          {student.StudentName}
                        </Link>
                      </td>


                    
                      <td className="px-5 py-4">{student.email}</td>
                      <td className="px-5 py-4">{student.Course?.courseName}</td>

                      <td className="px-5 py-4">
                        {new Date(student.dob).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{student.status}</td>

                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-4">

                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={student.status === "Active"}
                              onChange={() => handleStatus(student._id)}
                              className="sr-only peer"
                            />

                            <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"></div>

                            <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                          </label>

                         

                          <Link
                            to={`/admin/Student/edit/${student._id}`}
                            state={{ student: student }}
                            className="text-blue-600 hover:text-blue-800 text-lg"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>

                          <button

                            onClick={() => handeleDelete(student._id)}
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


                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">



                  <div>
                    <nav
                      aria-label="Pagination"
                      className="isolate inline-flex -space-x-px rounded-md"
                    >



                      <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className={`relative inline-flex items-center rounded-l-md px-2 py-2${page === 1
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-white/5 cursor-pointer"
                          }`}
                      >
                        <span className="sr-only">Previous</span>

                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                          />
                        </svg>
                      </button>


                      <button className="relative z-10 inline-flex items-center bg-indigo-500 px-4 py-2 text-sm font-semibold text-white">
                        1
                      </button>

                      <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5">
                        2
                      </button>




                      <button
                        onClick={() => setPage(page + 1)}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 cursor-pointer"
                      >
                        <span className="sr-only">Next</span>

                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>


            </div>

          )}

        </div>

      </div>


  <StudentDeatials
  open={open}
  onClose={() => setOpen(false)}
  student={studentDetails}
/>

    </div>
  )
}












// const getStudents = async () => {
//     try {
//       const res = await ViewAllStudent();
//       console.log("Response:", res);


//       console.log("res.data", res.data);

//       setStudents(res.data || res);


//     } catch (error) {
//       console.log(error);
//     }
//   };