import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";

import Loader from "../../../Components/Loader";
import { ViewAll, DeleteContact, UpdateContact, } from '../../../Service/admin/Contact'

import { FaEdit, FaTrash } from "react-icons/fa";
// import TeacherDeatials from './TeacherDeatials';

export default function ContactList() {

  const [Contact, setContact] = useState([])
  const [loader, setLoading] = useState(true)
//   const [teacherDeatials, setTeacherDeatails] = useState(null)
    const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(2)
  const [totalPages, setTotalPages] = useState(1)


  useEffect(() => {
    getContact()
  }, [page, limit])


  const getContact = async () => {
    try {
      const res = await ViewAll(page, limit);

      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log("Teacher Data:", res);

      setContact(res.data);
      setTotalPages(res.totalPages)


    } catch (error) {
      console.log(error);
    }

    finally {
      setLoading(false);
    }
  };


  if (loader) {
    return <Loader />;
  }



//   const handleStatus = async (id) => {
//     try {
//       await UpdateTeacherStatus(id);

//       Swal.fire({
//         icon: "success",
//         title: "Status Updated",
//         timer: 1200,
//         showConfirmButton: false,
//       });

//       getTeachers();
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Status Update Failed",
//       });
//     }
//   };


  const handeleDelete = async (id) => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!"
    })


    if (result.isConfirmed) {

      try {

        await DeleteContact(id);


        Swal.fire({
          title: "Deleted!",
          text: "Teacher Deleted Successfully",
          icon: "success"
        });


        getContact(); // refresh list


      } catch (error) {

        Swal.fire({
          title: "Error!",
          text: "Delete Failed",
          icon: "error"
        });

      }

    }

  }
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
        await UpdateContact(id);

        Swal.fire({
          title: "Deleted!",
          text: "Student update Successfully",
          icon: "success"
        });

        getContact(); // Refresh table
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "update Failed",
          icon: "error"
        });
      }
    }
  };

//   const handleViewContact = async (id) => {
//   try {
//     const res = await ViewOne(id);

//     console.log("Teacher Details:", res.data);

//     Response ke hisab se
//     setTeacherDeatails(res.data.data || res.data);

//     setOpen(true);
//   } catch (error) {
//     console.log(error);
//   }
// };

  return (
    <div>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-slate-800">
            Contact List
          </h2>

          {/* <Link
            to="/admin/Teacher/Add"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
          >
            <i data-lucide="plus" className="w-5 h-5"></i>
            <span>+Add</span>
          </Link> */}

        </div>

        {/* Table */}
        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">

           {loader ? (
              <Loader />
            ) : ( 


              <div>
                <table className="w-full text-left">



                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="text-sm text-slate-500 font-semibold">
                      <th className="px-6 py-4">full Name</th>
             
                      <th className="px-6 py-4">Email Address</th>
                      <th className="px-6 py-4">subject</th>
                      <th className="px-6 py-4">Massage</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {Contact?.length > 0 ? (
                      Contact.map((item) => (
                        <tr key={item._id} className="hover:bg-slate-50 transition">

                          <td className="px-6 py-4 font-semibold text-slate-800">
                
                              {item.fullName}
                            
                          </td>


              

                          <td className="px-6 py-4">{item.email}</td>

                          <td className="px-6 py-4">{item.subject}</td>

                                     <td className="px-6 py-4">{item.message}</td>

             

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-4">
                              {/* <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={Teachers.status === "Active"}
                                  onChange={() => handleStatus(Teachers._id)}
                                  className="sr-only peer"
                                />

                                <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"></div>

                                <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                              </label> */}

                              {/* <Link
                                to={`/admin/Teacher/edit/${Teachers._id}`}
                                state={{ Teacher: Teachers }}
                                className="text-blue-600 hover:text-blue-800 text-lg"
                              >
                                <FaEdit />
                              </Link> */}

                              <button
                                onClick={() => handeleDelete(item._id)}
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
                        <td colSpan="6" className="text-center py-6">
                          No Contact Found
                        </td>
                      </tr>
                    )}
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

      {/* <TeacherDeatials
        open={open}
        onClose={() => setOpen(false)}
        Teacher={teacherDeatials}
      /> */}


    </div>
  )
}