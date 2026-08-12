// import React, { useState,useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Login as loginApi } from "../../Service/frontend/login";

// import {
//   GraduationCap,
//   Mail,
//   Lock,
//   User,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   CheckCircle,
//   AlertCircle,
//   Sparkles,
// } from "lucide-react";

// export default function Login() {
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//  const [isLoggedIn, setIsLoggedIn] = useState(
//   Boolean(localStorage.getItem("studentToken"))
// );
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setSuccessMessage("");
//     setErrorMessage("");

//     try {
//       setIsLoading(true);

//       const res = await loginApi(formData);

//       console.log("Login Response:", res);

//       if (res.status) {
//         setSuccessMessage("Login successful!");

//         // ============================
//         // SAVE STUDENT TOKEN
//         // ============================
//         if (res.token) {
//           localStorage.setItem("studentToken", res.token);

//           // Header ke liye same token
//           localStorage.setItem("token", res.token);
//         }

//         // ============================
//         // SAVE STUDENT DATA
//         // ============================
//         if (res.data) {
//           localStorage.setItem(
//             "studentData",
//             JSON.stringify(res.data)
//           );
//         }

//         // ============================
//         // HEADER LOGIN -> PROFILE
//         // ============================
//         window.dispatchEvent(
//           new Event("loginStatusChanged")
//         );

//         setTimeout(() => {
//           navigate("/");
//         }, 1000);
//       } else {
//         setErrorMessage(res.message || "Login failed");
//       }
//     } catch (error) {
//       console.log("Login Error:", error);

//       setErrorMessage(
//         error.response?.data?.message || "Login failed"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   useEffect(() => {
//   const checkLogin = () => {
//     setIsLoggedIn(
//       Boolean(localStorage.getItem("studentToken"))
//     );
//   };

//   window.addEventListener("loginStatusChanged", checkLogin);

//   return () => {
//     window.removeEventListener(
//       "loginStatusChanged",
//       checkLogin
//     );
//   };
// }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">

//       {/* LEFT SIDE */}
//       <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 flex-col justify-between relative overflow-hidden">

//         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

//         <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"></div>

//         {/* LOGO */}
//         <div className="relative z-10">
//           <Link
//             to="/"
//             className="flex items-center gap-2 text-white"
//           >
//             <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
//               <GraduationCap className="w-8 h-8 text-white" />
//             </div>

//             <div>
//               <h1 className="text-2xl font-bold text-white">
//                 JAAT University
//               </h1>

//               <p className="text-xs text-blue-200">
//                 UGC-Entitled | Est. 1953
//               </p>
//             </div>
//           </Link>
//         </div>

//         {/* CONTENT */}
//         <div className="relative z-10">
//           <div className="mb-8">

//             <Sparkles className="w-12 h-12 text-yellow-300 mb-4" />

//             <h2 className="text-3xl font-bold text-white mb-4">
//               Welcome Back!
//               <br />

//               <span className="text-yellow-300">
//                 Great to See You Again
//               </span>
//             </h2>

//             <p className="text-blue-100 text-lg max-w-md">
//               Access your courses, track your progress,
//               and connect with your peers.
//             </p>
//           </div>

//           <div className="grid grid-cols-3 gap-4">

//             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
//               <p className="text-2xl font-bold text-white">
//                 50K+
//               </p>

//               <p className="text-xs text-blue-200">
//                 Students
//               </p>
//             </div>

//             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
//               <p className="text-2xl font-bold text-white">
//                 120+
//               </p>

//               <p className="text-xs text-blue-200">
//                 Countries
//               </p>
//             </div>

//             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
//               <p className="text-2xl font-bold text-white">
//                 95%
//               </p>

//               <p className="text-xs text-blue-200">
//                 Placement
//               </p>
//             </div>

//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="relative z-10 text-blue-200 text-sm">
//           <p>
//             © 2026 JAAT University. All rights reserved.
//           </p>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">

//         <div className="w-full max-w-md">

//           {/* MOBILE LOGO */}
//           <div className="lg:hidden flex items-center gap-2 mb-8">

//             <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-xl">
//               <GraduationCap className="w-8 h-8 text-white" />
//             </div>

//             <div>
//               <h1 className="text-xl font-bold text-gray-900">
//                 JAAT University
//               </h1>

//               <p className="text-xs text-gray-500">
//                 UGC-Entitled | Est. 1953
//               </p>
//             </div>

//           </div>

//           {/* LOGIN CARD */}
//           <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

//             <div className="mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Welcome Back!
//               </h2>

//               <p className="text-gray-500 text-sm mt-1">
//                 Sign in to access your courses and dashboard
//               </p>
//             </div>

//             {/* SUCCESS */}
//             {successMessage && (
//               <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-700 text-sm">
//                 <CheckCircle className="w-5 h-5" />
//                 {successMessage}
//               </div>
//             )}

//             {/* ERROR */}
//             {errorMessage && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
//                 <AlertCircle className="w-5 h-5" />
//                 {errorMessage}
//               </div>
//             )}

//             <form
//               onSubmit={handleSubmit}
//               className="space-y-4"
//             >

//               {/* EMAIL */}
//               <div>

//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   <Mail className="w-4 h-4 inline mr-1" />
//                   Email Address
//                 </label>

//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-3 border ${
//                     errors.email
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
//                   placeholder="student@manipal.edu"
//                 />

//                 {errors.email && (
//                   <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                     <AlertCircle className="w-3 h-3" />
//                     {errors.email}
//                   </p>
//                 )}

//               </div>

//               {/* PASSWORD */}
//               <div>

//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   <Lock className="w-4 h-4 inline mr-1" />
//                   Password
//                 </label>

//                 <div className="relative">

//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 border ${
//                       errors.password
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12`}
//                     placeholder="••••••••"
//                   />

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowPassword(!showPassword)
//                     }
//                     className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>

//                 </div>

//                 {errors.password && (
//                   <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                     <AlertCircle className="w-3 h-3" />
//                     {errors.password}
//                   </p>
//                 )}

//               </div>

//               {/* FORGOT PASSWORD */}
//               <div className="text-right">

//                 <Link
//                   to="/forgot-password"
//                   className="text-sm text-blue-600 hover:underline"
//                 >
//                   Forgot password?
//                 </Link>

//               </div>

//               {/* LOGIN BUTTON */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//               >

//                 {isLoading ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 ) : (
//                   <>
//                     Sign In
//                     <ArrowRight className="w-5 h-5" />
//                   </>
//                 )}

//               </button>

//             </form>

//             {/* SIGN UP */}
//             <div className="text-center mt-6">

//               <p className="text-sm text-gray-600">
//                 Don't have an account?

//                 <Link
//                   to="/register"
//                   className="ml-1 text-blue-600 font-medium hover:underline"
//                 >
//                   Sign Up
//                 </Link>
//               </p>

//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  GraduationCap,
  Search,
  Menu,
  X,
  User,
  FileText,
  Heart,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Mail,
  Book,
  Laptop,
  Users as UsersIcon,
  LogOut,
} from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 
  const [activeDropdown, setActiveDropdown] = useState(null);


  const [isLoggedIn, setIsLoggedIn] = useState(
  Boolean(
    localStorage.getItem("studentToken") ||
    localStorage.getItem("token")
  )
);


  const [studentData, setStudentData] = useState(() => {
    const data = localStorage.getItem("studentData");

    try {
      return data ? JSON.parse(data) : null;
    } catch (error) {
      return null;
    }
  });


  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("studentToken");

      setIsLoggedIn(Boolean(token));

      const data = localStorage.getItem("studentData");

      try {
        setStudentData(data ? JSON.parse(data) : null);
      } catch (error) {
        setStudentData(null);
      }
    };

    window.addEventListener("loginStatusChanged", checkLogin);

    return () => {
      window.removeEventListener("loginStatusChanged", checkLogin);
    };
  }, []);

  // =========================
  // NAVIGATION ITEMS
  // =========================
  const navItems = [
    {
      label: "Programs",
      icon: Book,
      dropdown: true,
      path: "/programs",
    },
    {
      label: "About Us",
      icon: UsersIcon,
      path: "/about",
    },
    {
      label: "Admissions",
      icon: FileText,
      path: "/addmissions",
    },
    {
      label: "Student Life",
      icon: Heart,
      path: "/student-life",
    },
    {
      label: "Placements",
      icon: Briefcase,
      path: "/placements",
    },
    {
      label: "Contact",
      icon: Mail,
      path: "/contact",
    },
  ];

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("token");
    localStorage.removeItem("studentData");

    // IMPORTANT:
    // Old "user" data bhi remove kar raha hai
    // taaki ROHIT YADAV jaisa purana data na aaye
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setStudentData(null);

    window.dispatchEvent(new Event("loginStatusChanged"));

    navigate("/login");
  };

  // =========================
  // STUDENT NAME
  // =========================
  const studentName =
    studentData?.StudentName ||
    studentData?.name ||
    "Profile";

  return (
    <div>
      {/* =========================
          HEADER
      ========================= */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* =========================
                LOGO
            ========================= */}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-xl">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  JAAT <span className="text-blue-600">University</span>
                </h1>

                <p className="text-xs text-gray-500 font-medium">
                  UGC-Entitled | Est. 1953
                </p>
              </div>
            </Link>

            {/* =========================
                DESKTOP NAVIGATION
            ========================= */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, idx) => (
                <div
                  key={idx}
                  className="relative group"
                  onMouseEnter={() => {
                    if (item.dropdown) {
                      setActiveDropdown(idx);
                    }
                  }}
                  onMouseLeave={() => {
                    setActiveDropdown(null);
                  }}
                >
                  <Link
                    to={item.path || "#"}
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium text-sm py-2 transition"
                  >
                    {item.icon && (
                      <item.icon className="w-4 h-4" />
                    )}

                    {item.label}

                    {item.dropdown && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Link>

                  {/* =========================
                      PROGRAM DROPDOWN
                  ========================= */}
                  {item.dropdown && activeDropdown === idx && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">

                      <Link
                        to="/programs/mba"
                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-blue-50 transition"
                      >
                        <Briefcase className="w-4 h-4 text-blue-600" />

                        <span className="text-sm">
                          MBA Programs
                        </span>
                      </Link>

                      <Link
                        to="/programs/mca"
                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-blue-50 transition"
                      >
                        <Laptop className="w-4 h-4 text-purple-600" />

                        <span className="text-sm">
                          MCA Programs
                        </span>
                      </Link>

                      <Link
                        to="/programs/msc"
                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-blue-50 transition"
                      >
                        <Book className="w-4 h-4 text-green-600" />

                        <span className="text-sm">
                          Science Programs
                        </span>
                      </Link>

                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* =========================
                RIGHT SECTION
            ========================= */}
            <div className="flex items-center gap-4">

              {/* Search */}
              <button className="hidden md:flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition">
                <Search className="w-4 h-4" />
              </button>

              {/* =========================
                  LOGIN / PROFILE
              ========================= */}
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="hidden lg:flex items-center justify-center
                  w-10 h-10 rounded-full
                   bg-gradient-to-r from-blue-600 to-blue-700
                   text-white cursor-pointer
                   hover:shadow-lg hover:scale-105
                   transition-all"
                  title="Profile"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* Apply Now */}
              <Link
                to="/inquiryPage"
                className="hidden md:flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition-all"
              >
                Apply Now
              </Link>

              {/* Mobile Menu */}
              <button
                onClick={() =>
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                }
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

            </div>
          </div>
        </div>

        {/* =========================
            MOBILE MENU
        ========================= */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4">

            <nav className="space-y-2">

              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path || "#"}
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                >
                  {item.icon && (
                    <item.icon className="w-5 h-5" />
                  )}

                  {item.label}

                  {item.dropdown && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200 space-y-2">

                {/* Mobile Login */}
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium"
                    >
                      <User className="w-4 h-4" />
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                      className="flex items-center justify-center gap-2 w-full bg-green-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-green-700 transition"
                    >
                      <User className="w-4 h-4" />
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Mobile Profile */}
                    <Link
                      to="/profile"
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                      className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium"
                    >
                      <User className="w-4 h-4" />

                      {studentName}
                    </Link>

                    {/* Logout */}
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center justify-center gap-2 w-full bg-red-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-red-700 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                )}

                {/* Apply Now */}
                <Link
                  to="/addmissionpage"
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                  className="flex items-center justify-center gap-2 w-full border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-600 hover:text-white transition"
                >
                  Apply Now
                </Link>

              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}


