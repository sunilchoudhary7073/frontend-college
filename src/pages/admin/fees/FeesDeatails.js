import React from "react";
// import { Image_url } from "../../../Config/config"

export default function FeesDetails({ open, onClose,fees }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Fees Information</h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold"
          >
            
          </button>
        </div>

        {/* <img
          src={`${Image_url}/${bus.bus_image}`}
          alt={bus.bus_name}
          className="w-full h-48 object-cover rounded"
        /> */}

        <div className="mt-4 space-y-2">
          <p><strong>Student Name:</strong> {fees.StudentName}</p>
          <p><strong> course Name:</strong> {fees.courseName}</p>
          <p><strong>total Fees:</strong> {fees.totalFees}</p>
          <p><strong>discount:</strong> {fees.discount}</p>
           
            <p><strong>paid Amount:</strong> {fees.paidAmount}</p>
            <p><strong>due Amount:</strong> {fees.dueAmount}</p>
          <p><strong>status:</strong> {fees.status}</p>
          <p>
            <strong>Status:</strong>{" "}
            {fees .status ? "Active" : "Inactive"}
          </p>
        </div>

      </div>
    </div>
  );
}