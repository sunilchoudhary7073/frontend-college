import React from "react";
// import { Image_url } from "../../../Config/config"

export default function TeacherDeatials({ open, onClose, Teacher }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Teacher Information</h2>

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
          <p><strong>Teachers Name:</strong> {Teacher?.TeacherName}</p>
          <p><strong>Phone Number:</strong> {Teacher?.PhoneNumber}</p>
          <p><strong>Email:</strong> {Teacher?.Email}</p>
          <p><strong>Department:</strong> {Teacher?.Department}</p>
         
          <p>
  <strong>Qualification:</strong> {Teacher?.Qualification}
</p>

<p>
  <strong>Experience:</strong> {Teacher?.Experience}
  
</p>
<p><strong>Status:</strong> {Teacher?.status}</p>

<p>
  <strong>Active:</strong>{" "}
  {Teacher?.status === "Active" ? "Active" : "Inactive"}
</p>
          
        </div>

      </div>
    </div>
  );
}