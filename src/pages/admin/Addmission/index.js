
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

import { ViewAlladdmission, DeleteAddmission, FindOneAddmission, approveAdmission, rejectAdmission } from "../../../Service/admin/collage";

import { Image_url } from "../../../config/config";
import AdmissionDetails from "./AdmissionDetails";

export default function AddmissionList() {
  const [open, setOpen] = useState(false);
  const [selectedaddmission, setSelectedAddmission] = useState(null);
  const [addmission, setAddmission] = useState([]);

  useEffect(() => {
    getaddmission();

  }, []);

  // =========================
  // GET ALL ADMISSION
  // =========================
  const getaddmission = async () => {
    try {
      const res = await ViewAlladdmission();

      console.log("Admission Response:", res);

      // Agar service direct array return kar rahi hai
      if (Array.isArray(res)) {
        setAddmission(res);
      }

      // Agar service {data: []} return kar rahi hai
      else if (Array.isArray(res?.data)) {
        setAddmission(res.data);
      }

      // Agar service {data: {data: []}} return kar rahi hai
      else if (Array.isArray(res?.data?.data)) {
        setAddmission(res.data.data);
      }

      else {
        setAddmission([]);
      }
    } catch (error) {
      console.log("Admission Error:", error);
      setAddmission([]);
    }
  };

  // =========================
  // DELETE ADMISSION
  // =========================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await DeleteAddmission(id);

      console.log("Delete Response:", res);

      if (res?.data?.status || res?.status) {
        Swal.fire({
          title: "Deleted!",
          text: "Admission Deleted Successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        getaddmission();
      } else {
        Swal.fire({
          title: "Error!",
          text: res?.data?.message || "Delete Failed",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Delete Failed",
        icon: "error",
      });
    }
  };

  // =========================
  // GET SINGLE ADMISSION
  // =========================
  const handlegetaddmission = async (id) => {
    try {
      const res = await FindOneAddmission(id);

      console.log("Single Admission:", res);

      /*
        Agar response:
        {
          data: {
            data: {...}
          }
        }
      */

      const admissionData =
        res?.data?.data ||
        res?.data ||
        res;

      setSelectedAddmission(admissionData);
      setOpen(true);

    } catch (error) {
      console.log("Find Admission Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Admission details not found",
      });
    }
  };

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Approve Admission?",
      text: "Are you sure you want to approve this admission?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await approveAdmission(id);

      console.log("Approve Response:", res);

      if (res?.status === true) {

        // IMPORTANT: UI ko immediately update karo
        setAddmission((prev) =>
          prev.map((item) =>
            item._id === id
              ? { ...item, status: "Approved" }
              : item
          )
        );

        Swal.fire({
          title: "Approved!",
          text: "Admission Approved Successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

      } else {
        Swal.fire(
          "Error",
          res?.message || "Approval Failed",
          "error"
        );
      }

    } catch (error) {
      console.log("Approve Error:", error);

      Swal.fire(
        "Error",
        error.response?.data?.message || "Approval Failed",
        "error"
      );
    }
  };

  const handleReject = async (id) => {

    const { value: reason } = await Swal.fire({
      title: "Reject Admission",
      input: "text",
      inputLabel: "Reject Reason",
      inputPlaceholder: "Enter reason",
      showCancelButton: true,
      confirmButtonText: "Reject",
      confirmButtonColor: "#dc2626",
    });

    if (reason === undefined) return;

    try {

      const res = await rejectAdmission(id, {
        reason: reason,
      });

      console.log("Reject Response:", res);

      if (res?.status === true) {

        setAddmission((prev) =>
          prev.map((item) =>
            item._id === id
              ? {
                ...item,
                status: "Rejected",
                rejectReason: reason,
              }
              : item
          )
        );

        Swal.fire({
          title: "Rejected!",
          text: "Admission Rejected Successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

      } else {
        Swal.fire(
          "Error",
          res?.message || "Reject Failed",
          "error"
        );
      }

    } catch (error) {

      console.log("Reject Error:", error);

      Swal.fire(
        "Error",
        error.response?.data?.message || "Reject Failed",
        "error"
      );
    }
  };

  return (
    <div>
      <div className="space-y-6">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            New Admission List
          </h2>
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

          <div className="overflow-x-auto">

            <table className="min-w-full text-left">

              <thead>
                <tr className="bg-slate-50">

                  <th className="px-5 py-3">
                    Photo
                  </th>

                  <th className="px-5 py-3">
                    Student Name
                  </th>


                  <th className="px-5 py-3">
                    Mobile
                  </th>

                  <th className="px-5 py-3">
                    Course
                  </th>

                  <th className="px-5 py-3">
                    Admission Date
                  </th>

                  <th className="px-5 py-3">
                    Status
                  </th>

                  <th className="px-5 py-3 text-center">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {addmission.length > 0 ? (

                  addmission.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50"
                    >

                      {/* PHOTO */}
                      <td className="px-5 py-4">

                        {item.photo ? (

                          <a
                            href={`${Image_url}/${item.photo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >

                            <img
                              src={`${Image_url}/${item.photo}`}
                              alt={item.studentName}
                              className="w-14 h-14 rounded-lg object-cover cursor-pointer hover:scale-110 transition-transform duration-200"
                            />

                          </a>

                        ) : (

                          <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                            N/A
                          </div>

                        )}

                      </td>

                      {/* STUDENT NAME */}
                      <td className="px-5 py-4 font-medium">

                        <button
                          type="button"
                          onClick={() =>
                            handlegetaddmission(item._id)
                          }
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                       {item.fullName || "-"}
  </button>
</td>



{/* MOBILE */}
<td className="px-5 py-4">
  {item.mobile || "-"}
</td>

{/* COURSE */}
<td className="px-5 py-4">
 {item.courseId?.courseName}
</td>

{/* APPLICATION NUMBER */}
{/* <td className="px-5 py-4">
  {item.applicationNo || "-"}
</td> */}

{/* ADMISSION DATE */}
<td className="px-5 py-4">
  {item.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-GB")
    : "-"}

                      </td>

                      {/* STATUS */}
                      {/* ACTION */}
                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${item.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : item.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {item.status || "Pending"}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="px-5 py-4">
                        <div className="flex justify-center items-center gap-1">

                          {/* PENDING */}
                          {(!item.status ||
                            item.status === "Pending") && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleApprove(item._id)}
                                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap"
                                >
                                  Approve
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleReject(item._id)}
                                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                          {/* EDIT */}
                          <Link
                            to={`/admin/addmissions/edit/${item._id}`}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <FaEdit size={18} />
                          </Link>

                          {/* DELETE */}
                          <button
                            type="button"
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <FaTrash size={18} />
                          </button>

                        </div>
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-10 text-gray-500"
                    >
                      No Admission Found
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* ================= DETAILS MODAL ================= */}

      <AdmissionDetails
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedAddmission(null);
        }}
        addmission={selectedaddmission}
      />

    </div>
  );
}

