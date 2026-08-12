import React from "react";
// import { Image_url } from "../../../Config/config"

export default function StudentDeatials({ open, onClose, student}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Student Information</h2>

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
          <p><strong>Student Name:</strong> {student .StudentName}</p>
          <p><strong> Phone Number:</strong> {student .Phonenumber}</p>
          <p><strong>Email ID:</strong> {student .email}</p>
          <p><strong>Course Name:</strong> {student .Course}</p>
          <p><strong>status:</strong> {student .status}</p>
          <p>
            <strong>Status:</strong>{" "}
            {student .status ? "Active" : "Inactive"}
          </p>
        </div>

      </div>
    </div>
  );
}