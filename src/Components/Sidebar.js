import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isDeshboardActive =
    location.pathname === "/admin/deshboard";

  const isTeacherActive =
    location.pathname === "/admin/teacher" ||
    location.pathname.startsWith("/admin/teacher/");

  const isStudentActive =
    location.pathname === "/admin/student" ||
    location.pathname.startsWith("/admin/student/");

  const isCourseActive =
    location.pathname === "/admin/course" ||
    location.pathname.startsWith("/admin/course/");

  const isFeesActive =
    location.pathname === "/admin/fees" ||
    location.pathname.startsWith("/admin/fees/");

  const isBatchActive =
    location.pathname === "/admin/batch" ||
    location.pathname.startsWith("/admin/batch/");

  const isAdmissionActive =
    location.pathname === "/admin/addmissions" ||
    location.pathname.startsWith("/admin/addmissions/");

  const isNoticeActive =
    location.pathname === "/admin/notice" ||
    location.pathname.startsWith("/admin/notice/");

  const isEventActive =
    location.pathname === "/admin/event" ||
    location.pathname.startsWith("/admin/event/");

const isAssignCourseActive =
  location.pathname === "/admin/assine-courses" ||
  location.pathname.startsWith("/admin/assine-course/");

  const isSubjectActive =
  location.pathname === "/admin/subject" ||
  location.pathname.startsWith("/admin/subject/");
  return (
    <aside className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sticky top-24">
      <h3 className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-6">
        College Settings
      </h3>

      <div className="border-b border-slate-200 mb-4"></div>

      <div className="space-y-2">

        {/* Dashboard */}
        <Link
          to="/admin/deshboard"
          className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
            isDeshboardActive
              ? "bg-violet-50 text-violet-600"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <i data-lucide="layout-deshboard"></i>
          Deshboard
        </Link>

        {/* Teachers */}
        <Link
          to="/admin/teacher"
          className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
            isTeacherActive
              ? "bg-violet-50 text-violet-600"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <i data-lucide="users"></i>
          Teachers
        </Link>

        {/* Students */}
        <Link
          to="/admin/student"
          className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
            isStudentActive
              ? "bg-violet-50 text-violet-600"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <i data-lucide="graduation-cap"></i>
          Students
        </Link>

        {/* Course */}
        <Link
          to="/admin/course"
          className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
            isCourseActive
              ? "bg-violet-50 text-violet-600"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <i data-lucide="book-open"></i>
          Course
        </Link>


          <Link
          to="/admin/assine-course"
          className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
           isAssignCourseActive
              ? "bg-violet-50 text-violet-600"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <i data-lucide="book-open"></i>
          Assine Courses
        </Link>


        <Link
          to="/admin/subject"
          className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
            isSubjectActive
              ? "bg-violet-50 text-violet-600"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <i data-lucide="book-open"></i>
          Subjects
        </Link>


        {/* Fees */}
        <Link
          to="/admin/fees"
          className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
            isFeesActive
              ? "bg-violet-50 text-violet-600"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <i data-lucide="wallet"></i>
          Fees
        </Link>

        {/* Batch */}
        <Link
          to="/admin/batch"
          className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
            isBatchActive
              ? "bg-violet-50 text-violet-600"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <i data-lucide="layers"></i>
          Batch
        </Link>

        {/* Admission */}
        <Link
          to="/admin/addmissions"
          className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
            isAdmissionActive
              ? "bg-violet-50 text-violet-600"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <i data-lucide="clipboard-list"></i>
          Admissions
        </Link>

        {/* Notice */}
        <Link
          to="/admin/notice"
          className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
            isNoticeActive
              ? "bg-violet-50 text-violet-600"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <i data-lucide="bell"></i>
          Notices
        </Link>

        {/* Event */}
        <Link
          to="/admin/event"
          className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
            isEventActive
              ? "bg-violet-50 text-violet-600"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <i data-lucide="calendar-days"></i>
          Events
        </Link>


         <Link
          to="/admin/exam"
          className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
            isEventActive
              ? "bg-violet-50 text-violet-600"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <i data-lucide="calendar-days"></i>
          Exam
        </Link>


         <Link
          to="/admin/placment"
          className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
            isEventActive
              ? "bg-violet-50 text-violet-600"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <i data-lucide="calendar-days"></i>
          Placment
        </Link>

        <Link
          to="/admin/contact"
          className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
            isEventActive
              ? "bg-violet-50 text-violet-600"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <i data-lucide="calendar-days"></i>
          Contact
        </Link>

      </div>
    </aside>
  );
}





// import React from "react";
// import { Link, } from "react-router-dom";
// export default function Sidebar() {
//   const location = useLocation()

//   const isDashboardActive = location.pathname === "/admin/dashboard"

//   const isBusActive =
//     location.pathname === "/admin/bus" ||
//     location.pathname.startsWith("/admin/bus/")

//   const isSeatsActive =
//     location.pathname === "/admin/seat" ||
//     location.pathname.startsWith("/admin/seat/")


//   const isRouteActive =
//     location.pathname === "/admin/bus-route" ||
//     location.pathname.startsWith("/admin/bus-route/")

//   const isScheduleActive =
//     location.pathname === "/admin/schedule" ||
//     location.pathname.startsWith("/admin/schedule/")

//   const isStaffActive =
//     location.pathname === "/admin/staff" ||
//     location.pathname.startsWith("/admin/staff/");


//   const isBustypeActive =
//     location.pathname === "/admin/bustype" ||
//     location.pathname.startsWith("/admin/bustype/");

//   const isReportActive =
//     location.pathname === "/admin/report" ||
//     location.pathname.startsWith("/admin/report/");


//   return (
//     <aside className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sticky top-24">

//       <h3 className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-6">
//         Collage Settings
//       </h3>

//       <div className="border-b border-slate-200 mb-4"></div>

//       <div className="space-y-2">

//         <Link
//           to="/admin/dashboard"
//           className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${isDashboardActive
//             ? "bg-violet-50 text-violet-600"
//             : "text-slate-700 hover:bg-slate-100"
//             }`}
//         >
//           <i data-lucide="bar-chart-2"></i>
//           Dashboard
//         </Link>

//         <Link
//           to="/admin/teacher"
//           className={({ isActive }) =>
//             `flex items-center gap-3 px-5 py-4 rounded-xl bg-violet-50 text-violet-600 font-semibold transition hover:bg-violet-100 ${isActive
//               ? "bg-violet-50 text-violet-600"
//               : "text-slate-700 hover:bg-slate-100"
//             }`
//           }
//         >
//           <i data-lucide="Teacher"></i>
//           Teachers
//         </Link>
//         <Link
//           to="/admin/student"
//           className="flex items-center gap-3 px-5 py-4 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition"
//         >
//           <i data-lucide="map"></i>
//           Students
//         </Link>

//         <a
//           href="/admin/course"
//           className="flex items-center gap-3 px-5 py-4 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition"
//         >
//           <i data-lucide="clock"></i>
//           Course
//         </a>

//         <Link
//           to="/admin/fees"
//           className="flex items-center gap-3 px-5 py-4 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition"
//         >
//           <i data-lucide="user-check"></i>
//           Fees
//         </Link>

//         <Link
//           to="/admin/batch"
//           className="flex items-center gap-3 px-5 py-4 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition"
//         >
//           <i data-lucide="users"></i>
//           Batch
//         </Link>


//         <Link
//           to="/admin/addmissions"
//           className="flex items-center gap-3 px-5 py-4 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition"
//         >
//           <i data-lucide="users"></i>
//           Addmissions
//         </Link>


//         <Link
//           to="/admin/notice"
//           className="flex items-center gap-3 px-5 py-4 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition"
//         >
//           <i data-lucide="users"></i>
//           Notices
//         </Link>


//         <Link
//           to="/admin/event"
//           className="flex items-center gap-3 px-5 py-4 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition"
//         >
//           <i data-lucide="users"></i>
//           Events
//         </Link>


//       </div>

//     </aside>
//   );
// }