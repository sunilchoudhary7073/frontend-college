import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const linkClass = (active) =>
    `flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition ${
      active
        ? "bg-violet-50 text-violet-600"
        : "text-slate-700 hover:bg-slate-100"
    }`;

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
          className={linkClass(isActive("/admin/deshboard"))}
        >
          <i data-lucide="layout-dashboard"></i>
          Dashboard
        </Link>

        {/* Teachers */}
        <Link
          to="/admin/teacher"
          className={linkClass(isActive("/admin/teacher"))}
        >
          <i data-lucide="users"></i>
          Teachers
        </Link>

        {/* Students */}
        <Link
          to="/admin/student"
          className={linkClass(isActive("/admin/student"))}
        >
          <i data-lucide="graduation-cap"></i>
          Students
        </Link>

        {/* Course */}
        <Link
          to="/admin/course"
          className={linkClass(isActive("/admin/course"))}
        >
          <i data-lucide="book-open"></i>
          Course
        </Link>

        {/* Assign Courses */}
        <Link
          to="/admin/assine-course"
          className={linkClass(isActive("/admin/assine-course"))}
        >
          <i data-lucide="book-open"></i>
          Assign Courses
        </Link>

        {/* Subjects */}
        <Link
          to="/admin/subject"
          className={linkClass(isActive("/admin/subject"))}
        >
          <i data-lucide="book-open"></i>
          Subjects
        </Link>

        {/* Fees */}
        <Link
          to="/admin/fees"
          className={linkClass(isActive("/admin/fees"))}
        >
          <i data-lucide="wallet"></i>
          Fees
        </Link>

        {/* Batch */}
        <Link
          to="/admin/batch"
          className={linkClass(isActive("/admin/batch"))}
        >
          <i data-lucide="layers"></i>
          Batch
        </Link>

        {/* Admissions */}
        <Link
          to="/admin/addmissions"
          className={linkClass(isActive("/admin/addmissions"))}
        >
          <i data-lucide="clipboard-list"></i>
          Admissions
        </Link>

        {/* Notices */}
        <Link
          to="/admin/notice"
          className={linkClass(isActive("/admin/notice"))}
        >
          <i data-lucide="bell"></i>
          Notices
        </Link>

        {/* Events */}
        <Link
          to="/admin/event"
          className={linkClass(isActive("/admin/event"))}
        >
          <i data-lucide="calendar-days"></i>
          Events
        </Link>

        {/* Exam */}
        <Link
          to="/admin/exam"
          className={linkClass(isActive("/admin/exam"))}
        >
          <i data-lucide="clipboard-check"></i>
          Exam
        </Link>

        {/* Placement */}
        <Link
          to="/admin/placment"
          className={linkClass(isActive("/admin/placment"))}
        >
          <i data-lucide="briefcase"></i>
          Placement
        </Link>

        {/* Contact */}
        <Link
          to="/admin/contact"
          className={linkClass(isActive("/admin/contact"))}
        >
          <i data-lucide="contact"></i>
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