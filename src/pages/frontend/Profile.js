
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Profile as getProfile } from "../../Service/frontend/login";

import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  User,
  ShieldCheck,
  LogOut,
  Building2,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  // =========================
  // GET STUDENT DATA
  // =========================
useEffect(() => {
  const getStudentData = async () => {
    try {
      const res = await getProfile();

      if (res.success) {
        setStudent(res.data);

        // optional: latest data localStorage me save
        localStorage.setItem(
          "studentData",
          JSON.stringify(res.data)
        );
      }
    } catch (error) {
      console.log(
        "Profile API Error:",
        error.response?.data || error.message
      );

      setStudent(null);
    }
  };

  getStudentData();

  window.addEventListener("loginStatusChanged", getStudentData);

  return () => {
    window.removeEventListener(
      "loginStatusChanged",
      getStudentData
    );
  };
}, []);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("token");
    localStorage.removeItem("studentData");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("loginStatusChanged"));

    navigate("/login");
  };

  // =========================
  // NO DATA
  // =========================
  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <User className="w-12 h-12 mx-auto text-gray-400 mb-4" />

          <h2 className="text-xl font-bold text-gray-800">
            Profile Not Found
          </h2>

          <p className="text-gray-500 mt-2 mb-5">
            Please login to view your profile.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // ACTUAL STUDENT DATA
  // =========================
  const studentName = student.StudentName || "Student";

  const email = student.email || "Not Available";

  const phone = student.Phonenumber || "Not Available";

  const address = student.address || "Not Available";

  const enrollmentNo = student.enrollmentNo || "Not Available";

  const status = student.status || "Active";

  const dob = student.dob
    ? new Date(student.dob).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Not Available";

  // Course can be populated object OR ID
 const courses = Array.isArray(student.Course)
  ? student.Course
  : [];

const courseName =
  courses.length > 0
    ? courses.map((course) => course.courseName).join(", ")
    : "Course not available";

  // =========================
  // PROFILE IMAGE
  // =========================
  let profileImage = "";

  if (Array.isArray(student.image) && student.image.length > 0) {
    profileImage = student.image[0];
  } else if (typeof student.image === "string") {
    profileImage = student.image;
  }

  const avatar =
    profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      studentName
    )}&background=2563eb&color=ffffff&bold=true&size=200`;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =========================
          UNIVERSITY HEADER
      ========================= */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-20 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-xl">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>

              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  JAAT University
                </h1>

                <p className="text-xs text-blue-100">
                  Student Portal
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">
                Logout
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* =========================
          MAIN
      ========================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* PAGE TITLE */}
        <div className="mb-6">
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
            Student Profile
          </h2>
        </div>

        {/* =========================
            PROFILE CARD
        ========================= */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden mb-6">

          {/* COVER */}
          <div className="h-32 bg-gradient-to-r from-blue-700 to-indigo-700"></div>

          {/* PROFILE */}
          <div className="px-6 md:px-10 pb-7">

            <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-16 relative">

              {/* IMAGE */}
              <img
                src={avatar}
                alt={studentName}
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
              />

              {/* NAME */}
              <div className="flex-1 pb-1">

                <div className="flex flex-wrap items-center gap-3">

                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {studentName}
                  </h1>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {status}
                  </span>

                </div>

                <p className="text-gray-500 mt-1 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  JAAT University Student
                </p>

              </div>

            </div>
          </div>
        </div>

        {/* =========================
            BASIC INFORMATION
        ========================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

          {/* STATUS */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">

              <div className="p-3 bg-green-100 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Status
                </p>

                <p className="font-semibold text-gray-900">
                  {status}
                </p>
              </div>

            </div>
          </div>

          {/* COURSE */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">

              <div className="p-3 bg-blue-100 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Course
                </p>

                <p className="font-semibold text-gray-900">
                  {courseName}
                </p>
              </div>

            </div>
          </div>

          {/* UNIVERSITY */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">

              <div className="p-3 bg-purple-100 rounded-xl">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  University
                </p>

                <p className="font-semibold text-gray-900">
                  JAAT University
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* =========================
            STUDENT INFORMATION
        ========================= */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <div className="px-6 py-5 border-b border-gray-200">

            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Personal Information
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Registered student information
            </p>

          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

           <div>
              <p className="text-xs text-gray-500 mb-1">
            Enrollment Number
              </p>

              <div className="flex items-center gap-3 font-medium text-gray-900">
                <User className="w-4 h-4 text-blue-600" />
                {enrollmentNo}
              </div>
            </div>

            {/* NAME */}
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Full Name
              </p>

              <div className="flex items-center gap-3 font-medium text-gray-900">
                <User className="w-4 h-4 text-blue-600" />
                {studentName}
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Email Address
              </p>

              <div className="flex items-center gap-3 font-medium text-gray-900 break-all">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                {email}
              </div>
            </div>

            {/* PHONE */}
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Phone Number
              </p>

              <div className="flex items-center gap-3 font-medium text-gray-900">
                <Phone className="w-4 h-4 text-blue-600" />
                {phone}
              </div>
            </div>

            {/* DOB */}
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Date of Birth
              </p>

              <div className="flex items-center gap-3 font-medium text-gray-900">
                <Calendar className="w-4 h-4 text-blue-600" />
                {dob}
              </div>
            </div>

            {/* ADDRESS */}
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500 mb-1">
                Address
              </p>

              <div className="flex items-start gap-3 font-medium text-gray-900">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                {address}
              </div>
            </div>

            {/* STUDENT ID */}
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500 mb-1">
                Student ID
              </p>

              <div className="font-mono font-medium text-gray-900">
                {student._id || "Not Available"}
              </div>
            </div>

          </div>
        </div>

        {/* =========================
            UNIVERSITY INFO
        ========================= */}
        <div className="mt-6 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl p-6 text-white">

          <div className="flex items-center gap-4">

            <div className="bg-white/15 p-3 rounded-xl">
              <GraduationCap className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold">
                JAAT University
              </h3>

              <p className="text-blue-100 text-sm">
                Student Portal
              </p>
            </div>

          </div>
{/* =========================
    MY COURSES
========================= */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">

  <div className="px-6 py-5 border-b border-gray-200">
    <h3 className="font-bold text-gray-900 flex items-center gap-2">
      <BookOpen className="w-5 h-5 text-blue-600" />
      My Courses
    </h3>

    <p className="text-sm text-gray-500 mt-1">
      Courses assigned to you
    </p>
  </div>

  <div className="p-6">

    {courses.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {courses.map((course) => (
          <div
            key={course._id}
            className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
          >

            <div className="flex items-start gap-4">

              <div className="p-3 bg-blue-100 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>

              <div className="flex-1">

                <h4 className="text-lg font-bold text-gray-900">
                  {course.courseName}
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  Code: {course.courseCode}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Department: {course.department}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-4">

                  <div>
                    <p className="text-xs text-gray-400">
                      Duration
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {course.duration || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Semester
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {course.totalSemester || "N/A"}
                    </p>
                  </div>

                </div>

                <span
                  className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    course.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {course.status}
                </span>

              </div>

            </div>

          </div>
        ))}

      </div>
    ) : (
      <p className="text-gray-500">
        No courses assigned
      </p>
    )}

  </div>
</div>
          {/* <div className="mt-5 pt-5 border-t border-white/20">

            <p className="text-sm text-blue-100">
              Registered Course
            </p>

            <p className="font-semibold mt-1">
              {courseName}
            </p>

          </div> */}

        </div>

        {/* FOOTER */}
        <div className="text-center text-sm text-gray-400 mt-8">
          © 2026 JAAT University · Student Portal
        </div>

      </main>
    </div>
  );
}

