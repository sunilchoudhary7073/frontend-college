import React from "react";
import { X, User } from "lucide-react";

export default function AdmissionDetails({
    open,
    onClose,
    addmission,
}) {
    if (!open) return null;

    // =====================================================
    // DATA - API RESPONSE KE ACCORDING
    // =====================================================

    const studentName =
        addmission?.fullName || "N/A";

    const fatherName =
        addmission?.fatherName || "N/A";

    const motherName =
        addmission?.motherName || "N/A";

    const dob =
        addmission?.dob || null;

    const gender =
        addmission?.gender || "N/A";

    const category =
        addmission?.category || "N/A";

    const nationality =
        addmission?.nationality || "N/A";

    const email =
        addmission?.email || "N/A";

    const mobile =
        addmission?.mobile || "N/A";

    const alternateMobile =
        addmission?.alternateMobile || "N/A";

    const address =
        addmission?.address || "N/A";

    const city =
        addmission?.city || "N/A";

    const state =
        addmission?.state || "N/A";

    const pincode =
        addmission?.pincode || "N/A";

    // IMPORTANT:
    // Course API me courseId ke andar hai
const courseName =
    typeof addmission?.courseId === "object"
        ? addmission?.courseId?.courseName
        : "N/A";

    const admissionType =
        addmission?.admissionType || "N/A";

    const academicSession =
        addmission?.academicSession || "N/A";

    const tenthBoard =
        addmission?.tenthBoard || "N/A";

    const tenthPercentage =
        addmission?.tenthPercentage || "N/A";

    const tenthYear =
        addmission?.tenthYear || "N/A";

    const twelfthBoard =
        addmission?.twelfthBoard || "N/A";

    const twelfthPercentage =
        addmission?.twelfthPercentage || "N/A";

    const twelfthYear =
        addmission?.twelfthYear || "N/A";

    const graduation =
        addmission?.graduation || "N/A";

    const graduationPercentage =
        addmission?.graduationPercentage || "N/A";

    const fatherOccupation =
        addmission?.fatherOccupation || "N/A";

    const motherOccupation =
        addmission?.motherOccupation || "N/A";

    const familyIncome =
        addmission?.familyIncome || "N/A";

    const bloodGroup =
        addmission?.bloodGroup || "N/A";

    const domicile =
        addmission?.domicile || "N/A";

    const disability =
        addmission?.disability || "N/A";

    const applicationNo =
        addmission?.applicationNo || "N/A";

    const status =
        addmission?.status || "Pending";

    const paymentMethod =
        addmission?.paymentMethod || "N/A";

    const transactionId =
        addmission?.transactionId || "N/A";

    // =====================================================
    // DATE FORMAT
    // =====================================================

    const formatDate = (value) => {
        if (!value) return "N/A";

        const date = new Date(value);

        if (isNaN(date.getTime())) {
            return value;
        }

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // =====================================================
    // FIELD
    // =====================================================

    const Field = ({ label, value }) => {
        return (
            <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    {label}
                </p>

                <p className="text-sm font-semibold text-gray-800 mt-1 break-words">
                    {value || "N/A"}
                </p>
            </div>
        );
    };

    // =====================================================
    // FILE URL
    // =====================================================

    const fileUrl = (fileName) => {
        if (!fileName) return "";

        return `http://localhost:4000/uploads/${fileName}`;
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={onClose}
        >

            <div
                className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200">

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Admission Details
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Complete student admission information
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
                    >
                        <X size={21} />
                    </button>

                </div>

                {/* =================================================
                    BODY
                ================================================= */}

                <div className="max-h-[82vh] overflow-y-auto px-8 py-6">

                    {/* =================================================
                        STUDENT BASIC
                    ================================================= */}

                    <div className="flex items-center gap-6 pb-7 border-b border-gray-200">

                        {/* PHOTO */}

                        <div className="flex-shrink-0">

                            {addmission?.photo ? (

                                <img
                                    src={fileUrl(addmission.photo)}
                                    alt="Student"
                                    className="w-32 h-40 object-cover rounded-lg border border-gray-200"
                                />

                            ) : (

                                <div className="w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <User
                                        size={48}
                                        className="text-gray-400"
                                    />
                                </div>

                            )}

                        </div>

                        {/* BASIC INFORMATION */}

                        <div className="flex-1">

                            <h1 className="text-3xl font-bold text-gray-900">
                                {studentName}
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                Student Admission
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-5 mt-6">

                                <Field
                                    label="Application Number"
                                    value={applicationNo}
                                />

                                <Field
                                    label="Course"
                                    value={courseName}
                                />

                                <Field
                                    label="Status"
                                    value={status}
                                />

                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        PERSONAL INFORMATION
                    ================================================= */}

                    <section className="py-7 border-b border-gray-200">

                        <h3 className="text-lg font-bold text-gray-900 mb-5">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">

                            <Field
                                label="Student Name"
                                value={studentName}
                            />

                            <Field
                                label="Father Name"
                                value={fatherName}
                            />

                            <Field
                                label="Mother Name"
                                value={motherName}
                            />

                            <Field
                                label="Gender"
                                value={gender}
                            />

                            <Field
                                label="Date of Birth"
                                value={formatDate(dob)}
                            />

                            <Field
                                label="Category"
                                value={category}
                            />

                            <Field
                                label="Nationality"
                                value={nationality}
                            />

                            <Field
                                label="Blood Group"
                                value={bloodGroup}
                            />

                            <Field
                                label="Disability"
                                value={disability}
                            />

                            <Field
                                label="Domicile"
                                value={domicile}
                            />

                        </div>

                    </section>

                    {/* =================================================
                        CONTACT INFORMATION
                    ================================================= */}

                    <section className="py-7 border-b border-gray-200">

                        <h3 className="text-lg font-bold text-gray-900 mb-5">
                            Contact Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">

                            <Field
                                label="Email"
                                value={email}
                            />

                            <Field
                                label="Mobile Number"
                                value={mobile}
                            />

                            <Field
                                label="Alternate Mobile"
                                value={alternateMobile}
                            />

                            <Field
                                label="City"
                                value={city}
                            />

                            <Field
                                label="State"
                                value={state}
                            />

                            <Field
                                label="Pincode"
                                value={pincode}
                            />

                            <Field
                                label="Address"
                                value={address}
                            />

                        </div>

                    </section>

                    {/* =================================================
                        ADMISSION INFORMATION
                    ================================================= */}

                    <section className="py-7 border-b border-gray-200">

                        <h3 className="text-lg font-bold text-gray-900 mb-5">
                            Admission Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">

                            <Field
                                label="Course"
                                value={courseName}
                            />

                            <Field
                                label="Admission Type"
                                value={admissionType}
                            />

                            <Field
                                label="Academic Session"
                                value={academicSession}
                            />

                            <Field
                                label="Application Number"
                                value={applicationNo}
                            />

                            <Field
                                label="Admission Status"
                                value={status}
                            />

                        </div>

                    </section>

                    {/* =================================================
                        ACADEMIC INFORMATION
                    ================================================= */}

                    <section className="py-7 border-b border-gray-200">

                        <h3 className="text-lg font-bold text-gray-900 mb-5">
                            Academic Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">

                            <Field
                                label="10th Board"
                                value={tenthBoard}
                            />

                            <Field
                                label="10th Percentage"
                                value={tenthPercentage}
                            />

                            <Field
                                label="10th Passing Year"
                                value={tenthYear}
                            />

                            <Field
                                label="12th Board"
                                value={twelfthBoard}
                            />

                            <Field
                                label="12th Percentage"
                                value={twelfthPercentage}
                            />

                            <Field
                                label="12th Passing Year"
                                value={twelfthYear}
                            />

                            <Field
                                label="Graduation"
                                value={graduation}
                            />

                            <Field
                                label="Graduation Percentage"
                                value={graduationPercentage}
                            />

                        </div>

                    </section>

                    {/* =================================================
                        FAMILY INFORMATION
                    ================================================= */}

                    <section className="py-7 border-b border-gray-200">

                        <h3 className="text-lg font-bold text-gray-900 mb-5">
                            Family Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">

                            <Field
                                label="Father Occupation"
                                value={fatherOccupation}
                            />

                            <Field
                                label="Mother Occupation"
                                value={motherOccupation}
                            />

                            <Field
                                label="Family Income"
                                value={familyIncome}
                            />

                        </div>

                    </section>

                    {/* =================================================
                        PAYMENT INFORMATION
                    ================================================= */}

                    <section className="py-7 border-b border-gray-200">

                        <h3 className="text-lg font-bold text-gray-900 mb-5">
                            Payment Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">

                            <Field
                                label="Payment Method"
                                value={paymentMethod}
                            />

                            <Field
                                label="Transaction ID"
                                value={transactionId}
                            />

                        </div>

                    </section>

                    {/* =================================================
                        SIGNATURE
                    ================================================= */}

                    {addmission?.signature && (

                        <section className="py-7 border-b border-gray-200">

                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Student Signature
                            </h3>

                            <img
                                src={fileUrl(addmission.signature)}
                                alt="Student Signature"
                                className="w-64 h-24 object-contain border border-gray-200 rounded-lg"
                            />

                        </section>

                    )}

                    {/* =================================================
                        DOCUMENTS
                    ================================================= */}

                    <section className="py-7">

                        <h3 className="text-lg font-bold text-gray-900 mb-5">
                            Documents
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">

                            <Field
                                label="Aadhaar Document"
                                value={
                                    addmission?.aadhaar
                                        ? "Uploaded"
                                        : "Not Uploaded"
                                }
                            />

                            <Field
                                label="10th Marksheet"
                                value={
                                    addmission?.tenthMarksheet
                                        ? "Uploaded"
                                        : "Not Uploaded"
                                }
                            />

                            <Field
                                label="12th Marksheet"
                                value={
                                    addmission?.twelfthMarksheet
                                        ? "Uploaded"
                                        : "Not Uploaded"
                                }
                            />

                            <Field
                                label="Graduation Marksheet"
                                value={
                                    addmission?.graduationMarksheet
                                        ? "Uploaded"
                                        : "Not Uploaded"
                                }
                            />

                        </div>

                    </section>

                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    <div className="flex justify-end pt-5 border-t border-gray-200">

                        <button
                            onClick={onClose}
                            className="px-7 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold text-sm transition"
                        >
                            Close
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}