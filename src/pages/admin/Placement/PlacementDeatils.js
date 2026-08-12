import React from "react";
// import { Image_url } from "../../../Config/config"

export default function StudentDeatials({ open, onClose, placement}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Placement Information</h2>

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
          <p><strong>Student Name:</strong> {placement?.studentName}</p>
          <p><strong> Company Name:</strong> {placement?.companyName}</p>
          <p><strong>Year:</strong> {placement?.year}</p>
          <p><strong>Course Name:</strong> {placement?.Course}</p>
          <p><strong>status:</strong> {placement?.status}</p>
          <p>
            <strong>Status:</strong>{" "}
            {placement?.status ? "Active" : "Inactive"}
          </p>
        </div>

      </div>
    </div>
  );
}