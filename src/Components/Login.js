
import React from "react";
import "./Login.css";
import "animate.css";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../Service/admin/Auth";

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        const body = {
          email: values.email.trim(),
          password: values.password,
        };

        const res = await LoginApi(body);

        console.log("LOGIN RESPONSE:", res);

        // Axios response OR direct response dono handle honge
        const loginData = res?.data || res;

        console.log("LOGIN DATA:", loginData);
        console.log("STATUS:", loginData?.status);
        console.log("TOKEN:", loginData?.token);

        if (loginData?.status && loginData?.token) {

          // Old undefined token remove karo
          localStorage.removeItem("adminToken");

          // Correct token save karo
          localStorage.setItem(
            "adminToken",
            loginData.token
          );

          console.log(
            "ADMIN TOKEN:",
            localStorage.getItem("adminToken")
          );

          await Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "Welcome back, Admin.",
            confirmButtonColor: "#7C3AED",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          navigate("/admin/deshboard", {
            replace: true,
          });

        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text:
              loginData?.message ||
              "Invalid email or password",
            confirmButtonColor: "#7C3AED",
          });
        }

      } catch (error) {
        console.log("LOGIN ERROR:", error);

        Swal.fire({
          icon: "error",
          title: "Server Error",
          text:
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong",
          confirmButtonColor: "#7C3AED",
        });
      }
    },
  });

  // ============================
  // FORGOT PASSWORD
  // ============================

  const handleForgotPassword = () => {
    Swal.fire({
      title: "Forgot Password?",
      text: "Enter your registered admin email.",
      input: "email",
      inputPlaceholder: "admin@example.com",
      showCancelButton: true,
      confirmButtonText: "Continue",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#7C3AED",

      inputValidator: (value) => {
        if (!value) {
          return "Please enter your email";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
          return "Please enter a valid email";
        }

        return null;
      },

    }).then((result) => {

      if (result.isConfirmed) {

        const email = result.value;

        console.log(
          "Forgot Password Email:",
          email
        );

        Swal.fire({
          icon: "info",
          title: "Password Reset",
          text:
            "Password reset functionality will be processed for your registered email.",
          confirmButtonColor: "#7C3AED",
        });
      }
    });
  };

  return (
    <div>
      <div className="login-wrapper">

        <div className="flex justify-center mb-6"></div>

        <div className="card">

          <h2>Admin Login</h2>

          <p>
            Access your console dashboard
          </p>

          <form onSubmit={formik.handleSubmit}>

            {/* ================= EMAIL ================= */}

            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="admin@example.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.email &&
                formik.errors.email && (
                  <p
                    className="text-red-500 text-sm"
                    style={{ color: "red" }}
                  >
                    {formik.errors.email}
                  </p>
                )}

            </div>

            {/* ================= PASSWORD ================= */}

            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.password &&
                formik.errors.password && (
                  <p
                    className="text-red-500 text-sm"
                    style={{ color: "red" }}
                  >
                    {formik.errors.password}
                  </p>
                )}

            </div>

            {/* ================= FORGOT PASSWORD ================= */}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "15px",
              }}
            >

              <button
                type="button"
                onClick={handleForgotPassword}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "#7C3AED",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Forgot Password?
              </button>

            </div>

            {/* ================= LOGIN ================= */}

            <button
              className="btn"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          <div className="footer-text">
            © 2026 Admin Login Console Portal
          </div>

        </div>
      </div>
    </div>
  );
}








// import React from "react";
// import "./Login.css";
// import "animate.css";
// import Swal from "sweetalert2";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { LoginApi } from "../Service/admin/Auth";

// export default function Login() {
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },

//     validationSchema: Yup.object({
//       email: Yup.string()
//         .trim()
//         .email("Invalid email")
//         .required("Email is required"),

//       password: Yup.string()
//         .min(6, "Minimum 6 characters")
//         .required("Password is required"),
//     }),

//     onSubmit: async (values) => {
//       try {
//         const body = {
//           email: values.email,
//           password: values.password,
//         };

//         const res = await LoginApi(body);

//         console.log("LOGIN RESPONSE:", res);

//         if (res?.status) {

//           // IMPORTANT:
//           // AdminProtectedRoute bhi adminToken check kar raha hai
//           localStorage.setItem("adminToken", res?.token);

//           console.log(
//             "ADMIN TOKEN:",
//             localStorage.getItem("adminToken")
//           );

//           await Swal.fire({
//             icon: "success",
//             title: "Login Successful!",
//             text: "Welcome back, Admin.",
//             confirmButtonColor: "#7C3AED",
//             timer: 2000,
//             timerProgressBar: true,
//             showConfirmButton: false,
//           });

//           navigate("/admin/deshboard", {
//             replace: true,
//           });

//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Login Failed",
//             text: res?.message || "Invalid email or password",
//             confirmButtonColor: "#7C3AED",
//           });
//         }

//       } catch (error) {
//         console.log("LOGIN ERROR:", error);

//         Swal.fire({
//           icon: "error",
//           title: "Server Error",
//           text:
//             error?.response?.data?.message ||
//             error?.message ||
//             "Something went wrong",
//           confirmButtonColor: "#7C3AED",
//         });
//       }
//     },
//   });

//   // ============================
//   // FORGOT PASSWORD
//   // ============================

//   const handleForgotPassword = () => {
//     Swal.fire({
//       title: "Forgot Password?",
//       text: "Enter your registered admin email.",
//       input: "email",
//       inputPlaceholder: "admin@example.com",
//       showCancelButton: true,
//       confirmButtonText: "Continue",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#7C3AED",

//       inputValidator: (value) => {
//         if (!value) {
//           return "Please enter your email";
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if (!emailRegex.test(value)) {
//           return "Please enter a valid email";
//         }

//         return null;
//       },

//     }).then((result) => {

//       if (result.isConfirmed) {

//         const email = result.value;

//         console.log("Forgot Password Email:", email);

//         Swal.fire({
//           icon: "info",
//           title: "Password Reset",
//           text: "Password reset functionality will be processed for your registered email.",
//           confirmButtonColor: "#7C3AED",
//         });

//       }

//     });
//   };

//   return (
//     <div>

//       <div className="login-wrapper">

//         <div className="flex justify-center mb-6"></div>

//         <div className="card">

//           <h2>Admin Login</h2>

//           <p>
//             Access your console dashboard
//           </p>

//           <form onSubmit={formik.handleSubmit}>

//             {/* ================= EMAIL ================= */}

//             <div className="input-group">

//               <label>Email</label>

//               <input
//                 type="email"
//                 placeholder="admin@example.com"
//                 name="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />

//               {formik.touched.email &&
//                 formik.errors.email && (
//                   <p
//                     className="text-red-500 text-sm"
//                     style={{ color: "red" }}
//                   >
//                     {formik.errors.email}
//                   </p>
//                 )}

//             </div>

//             {/* ================= PASSWORD ================= */}

//             <div className="input-group">

//               <label>Password</label>

//               <input
//                 type="password"
//                 placeholder="Enter password"
//                 name="password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />

//               {formik.touched.password &&
//                 formik.errors.password && (
//                   <p
//                     className="text-red-500 text-sm"
//                     style={{ color: "red" }}
//                   >
//                     {formik.errors.password}
//                   </p>
//                 )}

//             </div>

//             {/* ================= FORGOT PASSWORD ================= */}

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 marginBottom: "15px",
//               }}
//             >

//               <button
//                 type="button"
//                 onClick={handleForgotPassword}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   padding: 0,
//                   color: "#7C3AED",
//                   cursor: "pointer",
//                   fontSize: "14px",
//                   fontWeight: "600",
//                 }}
//               >
//                 Forgot Password?
//               </button>

//             </div>

//             {/* ================= LOGIN ================= */}

//             <button
//               className="btn"
//               type="submit"
//               disabled={formik.isSubmitting}
//             >
//               {formik.isSubmitting
//                 ? "Logging in..."
//                 : "Login"}
//             </button>

//           </form>

//           <div className="footer-text">
//             © 2026 Admin Login Console Portal
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }