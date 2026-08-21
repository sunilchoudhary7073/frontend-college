import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from '../../../Components/Loader';

import FeesDetails from '../fees/FeesDeatails'

import { ViewAllfees, DeleteFees, UpdateFees,Searchfees } from "../../../Service/admin/collage";

export default function FeesList() {

  const [open, setOpen] = useState(false);
  const [selectedFees, setSelectedFees] = useState(null);
  const [loading, setLoading] = useState(true)

  const [fees, setfees] = useState([]);


  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)
  const [totalPages, setTotalPages] = useState(1)


    const [studentName, setStudentName] = useState("");
  
    const [isSearching, setIsSearching] = useState(false);



useEffect(() => {
    fetchData();
}, [page, limit]);

  const fetchData = async () => {
    try {
      const res = await ViewAllfees(page, limit);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setfees(res.data || res);
      setTotalPages(res.totalPages)
      console.log(res);
      setLoading(true)
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
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

    if (result.isConfirmed) {
      try {
        await DeleteFees(id);

        Swal.fire({
          title: "Deleted!",
          text: "Fees Deleted Successfully",
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

  



const handleSearch = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);

        const body = {
            studentName: studentName.trim()
        };

        const res = await Searchfees(1, limit, body);

        console.log("SEARCH RESPONSE:", res);

        setfees(res.data || []);
        setTotalPages(res.totalPages || 1);

    } catch (error) {
        console.log("SEARCH ERROR:", error);
        setfees([]);
        setTotalPages(1);
    } finally {
        setLoading(false);
    }
};





  return (
    <div>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-slate-800">
            Fees List
          </h2>

          <Link
            to="/admin/fees/add"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
          >
            <i data-lucide="plus" className="w-5 h-5"></i>
            <span>Add fees</span>
          </Link>

        </div>


        <div>
          <form
            onSubmit={handleSearch}
            className="flex items-end gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6"
          >
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Student  Name
              </label>

              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter Teacher Name..."
                className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
              />
            </div>



            <button
              type="submit"
              className="h-12 px-8 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
            >
              Search
            </button>

            <button
              type="button"
              onClick={() => {
                setStudentName("");
                setIsSearching(false);
                setPage(1);
              }}
              className="h-12 px-6 rounded-xl bg-gray-500 text-white"
            >
              Clear
            </button>
          </form>



        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

          {loading ? (
            <Loader />
          ) : (

            <div className="overflow-x-hidden">

              <table className="min-w-full text-left">

                <thead >

                  <tr>

                    <th className="px-5 py-4">Name</th>

                    <th className="px-5 py-4">Course</th>

                    <th className="px-5 py-4">Total Fees</th>
                    <th className="px-5 py-4">Discount</th>

                    <th className="px-5 py-4">Paid Amount</th>


                    <th className="px-5 py-4">Due Amount</th>





                    <th className="px-5 py-4">Payment Date</th>



                    <th className="px-5 py-4 text-right">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-200">

                  {/* Bus data will come here */}
                  {fees?.map((fees) => (
                    <tr key={fees._id} className="border-b hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <Link
                          to="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen(true);
                            setSelectedFees(fees);
                          }}


                        >
                          {fees.studentName?.StudentName}
                        </Link>
                      </td>




                      <td className="px-5 py-4">{fees.courseId?.courseName}</td>
                      <td className="px-5 py-4">₹{fees.totalFees}</td>
                      <td className="px-5 py-4">₹{fees.discount}</td>
                      <td className="px-5 py-4">₹{fees.paidAmount}</td>
                      <td className="px-5 py-4">₹{fees.dueAmount}</td>



                      <td className="px-5 py-4">
                        {new Date(fees.paymentDate).toLocaleDateString("en-GB")}
                      </td>


                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-4">

                          <Link
                            to={`/admin/fees/edit/${fees._id}`}
                            className="text-blue-600 hover:text-blue-800 text-lg"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>

                          <button
                            onClick={() => handleDelete(fees._id)}
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




          )}

        </div>

      </div>

      <FeesDetails
        open={open}
        onClose={() => setOpen(false)}
        fees={selectedFees}
      />

    </div>
  )
}

