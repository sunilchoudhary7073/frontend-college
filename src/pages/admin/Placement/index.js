import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";

import Loader from '../../../Components/Loader';
import {ViewAllPlacement, DeletePlacement,UpdatePlacementStatus,ViewOne } from '../../../Service/admin/Placement'

import { FaEdit, FaTrash } from "react-icons/fa";
import PlacementDeatails from './PlacementDeatils';

export default function PlacementList() {

  const [Placement, setPlacement] = useState([])
  const [loader, setLoading] = useState(true)
  const [PlacementDeatials, setPlacementDeatails] = useState(null)
    const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(2)
  const [totalPages, setTotalPages] = useState(1)


  useEffect(() => {
    getPlacement()
  }, [page, limit])


  const getPlacement = async () => {
    try {
      const res = await ViewAllPlacement(page, limit);

      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log("Placement Data:", res);

      setPlacement(res);
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



  const handleStatus = async (id) => {
    try {
      await UpdatePlacementStatus(id);
       console.log("Status ID:", id);

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        timer: 1200,
        showConfirmButton: false,
      });

      getPlacement();

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Status Update Failed",
      });
    }
  };


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

        await DeletePlacement(id);


        Swal.fire({
          title: "Deleted!",
          text: "Placement Deleted Successfully",
          icon: "success"
        });


        getPlacement(); // refresh list


      } catch (error) {

        Swal.fire({
          title: "Error!",
          text: "Delete Failed",
          icon: "error"
        });

      }

    }

  }
//   const handleUpdate = async (id) => {


//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, update it!"
//     });

//     if (result.isConfirmed) {
//       try {
//         await UpdatePlacement(id);

//         Swal.fire({
//           title: "Deleted!",
//           text: "Student update Successfully",
//           icon: "success"
//         });

//         getPlacement(); // Refresh table
//       } catch (error) {
//         Swal.fire({
//           title: "Error!",
//           text: "update Failed",
//           icon: "error"
//         });
//       }
//     }
//   };

  const handleViewPlacement = async (id) => {
  try {
    const res = await ViewOne(id);

    console.log("Placement Details:", res.data);

    // Response ke hisab se
    setPlacementDeatails(res.data.data || res.data);

    setOpen(true);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-slate-800">
            Placement List
          </h2>

          <Link
            to="/admin/Placment/Add"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
          >
            <i data-lucide="plus" className="w-5 h-5"></i>
            <span>+Add</span>
          </Link>

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
                      <th className="px-6 py-4">Student Name</th>
                      <th className="px-6 py-4">Company Name</th>
                      <th className="px-6 py-4">Year</th>

                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {Placement?.length > 0 ? (
                      Placement.map((item) => (
                        <tr key={item._id} className="hover:bg-slate-50 transition">

                          <td className="px-6 py-4 font-semibold text-slate-800">
                            <Link
                              to="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setOpen(true);
                               handleViewPlacement(item._id);
                              }}
                            >
                              {item.studentName}
                            </Link>
                          </td>


                          <td className="px-6 py-4">{item.companyName}</td>

                          <td className="px-6 py-4">{item.year}</td>


                          <td className="px-6 py-4">{item.status}</td>

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-4">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={item.status === "Active"}
                                  onChange={() => handleStatus(item._id)}
                                  className="sr-only peer"
                                />

                                <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"></div>

                                <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                              </label>

                              <Link
                                to={`/admin/Placment/edit/${item._id}`}
                                state={{Placement:item  }}
                                className="text-blue-600 hover:text-blue-800 text-lg"
                              >
                                <FaEdit />
                              </Link>

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
                          No Placement Found
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

      <PlacementDeatails
        open={open}
        onClose={() => setOpen(false)}
        Teacher={PlacementDeatials}
      />


    </div>
  )
}