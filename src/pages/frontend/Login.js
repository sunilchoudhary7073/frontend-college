import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Login as loginApi } from "../../Service/frontend/login";

import {
  GraduationCap,
  Hash,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    enrollmentNo: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setErrorMessage("");
  };

  // =========================
  // VALIDATION
  // =========================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.enrollmentNo.trim()) {
      newErrors.enrollmentNo = "Enrollment Number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // LOGIN
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await loginApi({
        enrollmentNo: formData.enrollmentNo.trim(),
        password: formData.password,
      });

      console.log("FULL LOGIN RESPONSE:", res);

      if (!res?.success && !res?.status) {
        setErrorMessage(res?.message || "Login failed");
        return;
      }

      // =========================
      // TOKEN
      // =========================
      const token =
        res?.token ||
        res?.data?.token ||
        res?.data?.data?.token;

      console.log("LOGIN TOKEN:", token);

      if (!token) {
        setErrorMessage("Login successful but token not received");
        return;
      }

      // =========================
      // SAVE TOKEN
      // =========================
      localStorage.setItem("studentToken", token);
      localStorage.setItem("token", token);

      // =========================
      // STUDENT DATA
      // =========================
      const student =
        res?.student ||
        res?.user ||
        res?.data?.student ||
        res?.data?.user ||
        res?.data?.data ||
        res?.data ||
        null;

      if (student) {
        localStorage.setItem(
          "studentData",
          JSON.stringify(student)
        );
      }

      console.log(
        "STUDENT TOKEN:",
        localStorage.getItem("studentToken")
      );

      console.log(
        "STUDENT DATA:",
        localStorage.getItem("studentData")
      );

      // =========================
      // LOGIN EVENT
      // =========================
      window.dispatchEvent(
        new Event("loginStatusChanged")
      );

      setSuccessMessage("Login successful!");

      // =========================
      // REDIRECT
      // =========================
      setTimeout(() => {
        navigate("/");
      }, 500);

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      setErrorMessage(
        error?.response?.data?.message ||
        error?.message ||
        "Login failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 flex-col justify-between relative overflow-hidden">

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"></div>

        {/* LOGO */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-white"
          >
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                JAAT University
              </h1>

              <p className="text-xs text-blue-200">
                UGC-Entitled | Est. 1953
              </p>
            </div>
          </Link>
        </div>

        {/* CONTENT */}
        <div className="relative z-10">

          <div className="mb-8">

            <Sparkles className="w-12 h-12 text-yellow-300 mb-4" />

            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome Back!
              <br />

              <span className="text-yellow-300">
                Great to See You Again
              </span>
            </h2>

            <p className="text-blue-100 text-lg max-w-md">
              Access your courses, track your progress,
              and connect with your peers.
            </p>

          </div>

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">
                50K+
              </p>

              <p className="text-xs text-blue-200">
                Students
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">
                120+
              </p>

              <p className="text-xs text-blue-200">
                Countries
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">
                95%
              </p>

              <p className="text-xs text-blue-200">
                Placement
              </p>
            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="relative z-10 text-blue-200 text-sm">
          <p>
            © 2026 JAAT University. All rights reserved.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">

        <div className="w-full max-w-md">

          {/* MOBILE LOGO */}
          <div className="lg:hidden flex items-center gap-2 mb-8">

            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                JAAT University
              </h1>

              <p className="text-xs text-gray-500">
                UGC-Entitled | Est. 1953
              </p>
            </div>

          </div>

          {/* LOGIN CARD */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

            <div className="mb-6">

              <h2 className="text-2xl font-bold text-gray-900">
                Student Login
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Sign in using your Enrollment Number
              </p>

            </div>

            {/* SUCCESS */}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-700 text-sm">

                <CheckCircle className="w-5 h-5" />

                {successMessage}

              </div>
            )}

            {/* ERROR */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">

                <AlertCircle className="w-5 h-5" />

                {errorMessage}

              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* ENROLLMENT NUMBER */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">

                  <Hash className="w-4 h-4 inline mr-1" />

                  Enrollment Number

                </label>

                <input
                  type="text"
                  name="enrollmentNo"
                  value={formData.enrollmentNo}
                  onChange={handleChange}
                  autoComplete="username"
                  className={`w-full px-4 py-3 border ${
                    errors.enrollmentNo
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-xl focus:ring-2 focus:ring-blue-500 outline-none`}
                  placeholder="Enter Enrollment Number"
                />

                {errors.enrollmentNo && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">

                    <AlertCircle className="w-3 h-3" />

                    {errors.enrollmentNo}

                  </p>
                )}

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">

                  <Lock className="w-4 h-4 inline mr-1" />

                  Password

                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    className={`w-full px-4 py-3 border ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-xl focus:ring-2 focus:ring-blue-500 outline-none pr-12`}
                    placeholder="••••••••"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-3.5 text-gray-400"
                  >

                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}

                  </button>

                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">

                    <AlertCircle className="w-3 h-3" />

                    {errors.password}

                  </p>
                )}

              </div>

              {/* FORGOT PASSWORD */}
              <div className="text-right">

                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >

                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}

              </button>

            </form>

            {/* SIGN UP */}
            <div className="text-center mt-6">

              <p className="text-sm text-gray-600">

                Don't have an account?

                <Link
                  to="/register"
                  className="ml-1 text-blue-600 font-medium hover:underline"
                >
                  Sign Up
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}





// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Login as loginApi } from "../../Service/frontend/login";

// import {
//   GraduationCap,
//   Mail,
//   Lock,
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

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.enrollmentNo) {
//   newErrors.enrollmentNo = "Enrollment Number is required";
// } else if (formData.enrollmentNo.length < 10) {
//   newErrors.enrollmentNo = "Invalid Enrollment Number";
// }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 10) {
//       newErrors.password = "Password must be at least 5 characters";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsLoading(true);
//     setSuccessMessage("");
//     setErrorMessage("");

//     try {
//       const res = await loginApi(formData);

//       console.log("FULL LOGIN RESPONSE:", res);

//       /*
//         Possible response:

//         {
//           success: true,
//           token: "JWT_TOKEN",
//           data: {
//             StudentName: "...",
//             email: "..."
//           }
//         }
//       */

//       if (!res?.success && !res?.status) {
//         setErrorMessage(res?.message || "Login failed");
//         return;
//       }

//       // =========================
//       // GET TOKEN
//       // =========================
//       const token =
//         res?.token ||
//         res?.data?.token ||
//         res?.data?.data?.token;

//       console.log("LOGIN TOKEN:", token);

//       if (!token) {
//         setErrorMessage("Login successful but token not received");
//         return;
//       }

//       // =========================
//       // SAVE TOKEN
//       // =========================
//       localStorage.setItem("studentToken", token);

//       // Optional same token key
//       localStorage.setItem("token", token);

//       // =========================
//       // GET STUDENT DATA
//       // =========================
//       const student =
//         res?.student ||
//         res?.user ||
//         res?.data?.student ||
//         res?.data?.user ||
//         res?.data?.data ||
//         res?.data ||
//         null;

//       if (student) {
//         localStorage.setItem(
//           "studentData",
//           JSON.stringify(student)
//         );
//       }

//       console.log(
//         "STUDENT TOKEN SAVED:",
//         localStorage.getItem("studentToken")
//       );

//       console.log(
//         "STUDENT DATA:",
//         localStorage.getItem("studentData")
//       );

//       // =========================
//       // LOGIN EVENT
//       // =========================
//       window.dispatchEvent(
//         new Event("loginStatusChanged")
//       );

//       setSuccessMessage("Login successful!");

//       // =========================
//       // GO HOME
//       // =========================
//       setTimeout(() => {
//         navigate("/");
//       }, 500);

//     } catch (error) {
//       console.log("LOGIN ERROR:", error);

//       setErrorMessage(
//         error?.response?.data?.message ||
//         error?.message ||
//         "Login failed"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">

//       {/* LEFT SIDE */}
//       <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 flex-col justify-between relative overflow-hidden">

//         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

//         <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"></div>

//         <div>
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
//                   } rounded-xl focus:ring-2 focus:ring-blue-500 outline-none`}
//                   placeholder="student@example.com"
//                 />

//                 {errors.enrollmentNo && (
//                   <p className="text-red-500 text-xs mt-1 flex items-center gap-1">

//                     <AlertCircle className="w-3 h-3" />

//                     {errors.enrollmentNo}

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
//                     type={
//                       showPassword
//                         ? "text"
//                         : "password"
//                     }
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 border ${
//                       errors.password
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     } rounded-xl focus:ring-2 focus:ring-blue-500 outline-none pr-12`}
//                     placeholder="••••••••"
//                   />

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowPassword(!showPassword)
//                     }
//                     className="absolute right-3 top-3.5 text-gray-400"
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

//               {/* LOGIN */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
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

