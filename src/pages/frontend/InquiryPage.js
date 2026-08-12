import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

import Header from "./Header";
import Footer from "./Footer";

import { addInquiry } from "../../Service/frontend/Inquire";
import { ViewAllCourse } from "../../Service/frontend/Course";

const InquiryPage = () => {
  const formRef = useRef(null);

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // =====================================================
  // GET COURSES
  // =====================================================

  useEffect(() => {
    handleViewAllProgram();
  }, []);

  const handleViewAllProgram = async () => {
    try {
      const res = await ViewAllCourse();

      console.log("COURSES:", res);

      // API agar direct array return karti hai
      if (Array.isArray(res)) {
        setPrograms(res);
      }
      // API agar { data: [] } return karti hai
      else if (Array.isArray(res?.data)) {
        setPrograms(res.data);
      } else {
        setPrograms([]);
      }
    } catch (error) {
      console.log("COURSE ERROR:", error);
      setPrograms([]);
    }
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validationSchema = Yup.object({
    studentName: Yup.string()
      .trim()
      .required("Name is required"),

    email: Yup.string()
      .trim()
      .email("Invalid Email")
      .required("Email is required"),

    mobile: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "Mobile must be 10 digits"
      )
      .required("Mobile required"),

    courseName: Yup.string()
      .required("Please select course"),

    message: Yup.string()
      .trim()
      .required("Message required"),
  });

  // =====================================================
  // SUBMIT
  // =====================================================

const handleSubmit = async (values, { resetForm }) => {
  try {
    setLoading(true);

    console.log("Form Values:", values);

    const res = await addInquiry(values);

    console.log("Inquiry Response:", res);

    if (
      res?.success === true ||
      res?.status === true ||
      res?.succes === true
    ) {
      await Swal.fire({
        icon: "success",
        title: "Inquiry Submitted Successfully! 🎉",
      text: "Thank you for your inquiry. Our university team will contact you within 48 hours.",
        confirmButtonText: "OK",
        confirmButtonColor: "#2563eb",
      });

      resetForm();
    } else {
      Swal.fire({
        icon: "error",
        title: "Submission Failed!",
        text: res?.message || "Inquiry submit nahi ho saki.",
        confirmButtonText: "OK",
      });
    }

  } catch (error) {
    console.log("Inquiry Error:", error);

    Swal.fire({
      icon: "error",
      title: "Error!",
      text:
        error?.response?.data?.message ||
        error?.message ||
        "Server Error",
      confirmButtonText: "OK",
    });

  } finally {
    setLoading(false);
  }
};

  // =====================================================
  // SCROLL
  // =====================================================

  const scrollForm = () => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <Header />

      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="bg-white shadow-md sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4">

          <div className="flex justify-between items-center h-16">

            <h2 className="text-xl font-bold text-gray-800">
              🏛️ JAAT
              <span className="text-blue-600">
                University
              </span>
            </h2>

            <button
              type="button"
              onClick={scrollForm}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Send Inquiry
            </button>

          </div>

        </div>

      </nav>

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="
          bg-gradient-to-br
          from-blue-600
          via-blue-700
          to-indigo-800
          text-white
          py-20
          px-4
        "
      >

        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-4xl md:text-6xl font-bold">

            Start Your
            <br />

            <span className="text-yellow-300">
              Career Journey
            </span>

          </h1>

          <p className="mt-5 text-lg text-blue-100">
            Get information about courses,
            fees and admission process.
          </p>

          <button
            type="button"
            onClick={scrollForm}
            className="
              mt-8
              bg-white
              text-blue-700
              px-8
              py-3
              rounded-xl
              font-bold
              hover:bg-gray-100
              transition
            "
          >
            📩 Send Inquiry
          </button>

        </div>

      </section>

      {/* =================================================
          FORM
      ================================================= */}

      <section
        ref={formRef}
        className="py-16 px-4"
      >

        <div className="max-w-3xl mx-auto">

          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">

            Course{" "}

            <span className="text-blue-600">
              Inquiry
            </span>

          </h2>

          {/* SUCCESS MESSAGE */}

          {success && (
            <div className="
              bg-green-100
              border
              border-green-300
              text-green-700
              p-4
              rounded-xl
              mb-5
              text-center
              font-medium
            ">
              ✅ {success}
            </div>
          )}

          {/* =================================================
              FORMIK
          ================================================= */}

          <Formik
            initialValues={{
              studentName: "",
              email: "",
              mobile: "",
              courseName: "",
              message: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >

            {({ isSubmitting }) => (

              <Form
                className="
                  bg-white
                  shadow-xl
                  rounded-2xl
                  p-8
                  space-y-5
                "
              >

                {/* =================================================
                    STUDENT NAME
                ================================================= */}

                <div>

                  <label className="block mb-2 font-medium text-gray-700">
                    Name *
                  </label>

                  <Field
                    type="text"
                    name="studentName"
                    placeholder="Enter name"
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                  <ErrorMessage
                    name="studentName"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />

                </div>

                {/* =================================================
                    EMAIL
                ================================================= */}

                <div>

                  <label className="block mb-2 font-medium text-gray-700">
                    Email *
                  </label>

                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />

                </div>

                {/* =================================================
                    MOBILE
                ================================================= */}

                <div>

                  <label className="block mb-2 font-medium text-gray-700">
                    Mobile *
                  </label>

                  <Field
                    type="text"
                    name="mobile"
                    maxLength="10"
                    placeholder="10 digit mobile number"
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                  <ErrorMessage
                    name="mobile"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />

                </div>

                {/* =================================================
                    COURSE
                ================================================= */}

                <div>

                  <label className="block mb-2 font-medium text-gray-700">
                    Select Course *
                  </label>

                  <Field
                    as="select"
                    name="courseName"
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      bg-white
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  >

                    <option value="">
                      Select Course
                    </option>

                    {programs.map((item) => (
                      <option
                        key={item._id}
                        value={item.courseName}
                      >
                        {item.courseName}
                      </option>
                    ))}

                  </Field>

                  <ErrorMessage
                    name="courseName"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />

                </div>

                {/* =================================================
                    MESSAGE
                ================================================= */}

                <div>

                  <label className="block mb-2 font-medium text-gray-700">
                    Message *
                  </label>

                  <Field
                    as="textarea"
                    name="message"
                    rows="4"
                    placeholder="Your query"
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      resize-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                  <ErrorMessage
                    name="message"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />

                </div>

                {/* =================================================
                    SUBMIT
                ================================================= */}

                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className={`
                    w-full
                    text-white
                    px-8
                    py-3
                    rounded-xl
                    font-medium
                    transition
                    ${
                      loading || isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }
                  `}
                >

                  {loading || isSubmitting
                    ? "Submitting..."
                    : "Submit Inquiry"}

                </button>

              </Form>

            )}

          </Formik>

        </div>

      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default InquiryPage;


// import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// import { addAddmissionform } from "../../Service/frontend/Addmissionpage";

// import Header from "../frontend/Header";
// import Footer from "../frontend/Footer";

// const AddmissionPage = () => {
//   const navigate = useNavigate();

//   const [formStep, setFormStep] = useState(1);

//   const formRef = useRef(null);
//   const heroRef = useRef(null);
//   const programsRef = useRef(null);
//   const contactRef = useRef(null);

//   // =====================================================
//   // VALIDATION
//   // =====================================================

//   const validationSchema = Yup.object({
//     studentName: Yup.string()
//       .trim()
//       .required("Full Name is required"),

//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),

//     mobile: Yup.string()
//       .matches(
//         /^[0-9]{10}$/,
//         "Mobile number must be exactly 10 digits"
//       )
//       .required("Mobile number is required"),

//     courseName: Yup.string()
//       .required("Please select a course"),

//     DOB: Yup.string()
//       .required("Date of Birth is required"),

//     agreeTerms: Yup.boolean()
//       .oneOf(
//         [true],
//         "Please accept Terms & Conditions"
//       ),
//   });

//   // =====================================================
//   // FORM SUBMIT
//   // =====================================================

//   const handleSubmit = async (
//     values,
//     { resetForm, setSubmitting }
//   ) => {
//     try {
//       // ================================================
//       // CHECK LOGIN
//       // ================================================

//       const token = localStorage.getItem("studentToken");

//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       console.log("Admission Form Data:", values);

//       // ================================================
//       // API CALL
//       // ================================================

//       const res = await addAddmissionform(values);

//       console.log(
//         "Admission API Response:",
//         res
//       );

//       // ================================================
//       // SUCCESS
//       // ================================================

//       if (
//         res?.success === true ||
//         res?.status === true
//       ) {
//         alert(
//           "✅ Application Submitted Successfully!"
//         );

//         resetForm();

//         setFormStep(1);
//       } else {
//         alert(
//           res?.message ||
//             "Application submission failed"
//         );
//       }
//     } catch (error) {
//       console.log(
//         "Admission API Error:",
//         error.response?.data ||
//           error.message
//       );

//       alert(
//         error.response?.data?.message ||
//           "Something went wrong"
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // =====================================================
//   // SCROLL TO FORM
//   // =====================================================

//   const scrollToForm = () => {
//     formRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <Header />

//       {/* =================================================
//           NAVIGATION
//       ================================================= */}

//       <nav className="bg-white shadow-md sticky top-0 z-50">

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//           <div className="flex justify-between items-center h-16">

//             {/* LOGO */}

//             <a
//               href="/"
//               className="flex items-center gap-2"
//             >
//               <span className="text-2xl font-bold text-blue-600">
//                 🏛️
//               </span>

//               <span className="text-xl font-bold text-gray-800">
//                 JAAT
//                 <span className="text-blue-600">
//                   University
//                 </span>
//               </span>
//             </a>

//             {/* DESKTOP MENU */}

//             <div className="hidden md:flex items-center gap-8">

//               <a
//                 href="#hero"
//                 className="text-gray-600 hover:text-blue-600 transition font-medium"
//               >
//                 Home
//               </a>

//               <a
//                 href="#programs"
//                 className="text-gray-600 hover:text-blue-600 transition font-medium"
//               >
//                 Programs
//               </a>

//               <a
//                 href="#application-form"
//                 className="text-gray-600 hover:text-blue-600 transition font-medium"
//               >
//                 Apply
//               </a>

//               <a
//                 href="#contact"
//                 className="text-gray-600 hover:text-blue-600 transition font-medium"
//               >
//                 Contact
//               </a>

//               <button
//                 type="button"
//                 onClick={scrollToForm}
//                 className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
//               >
//                 Apply Now
//               </button>

//             </div>

//             {/* MOBILE BUTTON */}

//             <button
//               type="button"
//               className="md:hidden text-gray-600"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>

//           </div>

//         </div>

//       </nav>

//       {/* =================================================
//           HERO SECTION
//       ================================================= */}

//       <section
//         id="hero"
//         ref={heroRef}
//         className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-4"
//       >

//         <div className="max-w-4xl mx-auto text-center">

//           <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">

//             Your Future Starts
//             <br />

//             <span className="text-yellow-300">
//               Right Here
//             </span>

//           </h1>

//           <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">

//             Join 5,000+ students who have already
//             secured their admission for the 2026
//             academic year.

//           </p>

//           <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

//             <button
//               type="button"
//               onClick={scrollToForm}
//               className="px-8 py-4 bg-white text-blue-700 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg"
//             >
//               🚀 Apply Now — It's Free
//             </button>

//             <a
//               href="#application-form"
//               className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition"
//             >
//               📖 Admission Guide
//             </a>

//           </div>

//           {/* STATS */}

//           <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto">

//             <div className="text-center">
//               <p className="text-3xl font-bold">
//                 5K+
//               </p>
//               <p className="text-sm text-blue-200">
//                 Students
//               </p>
//             </div>

//             <div className="text-center">
//               <p className="text-3xl font-bold">
//                 97%
//               </p>
//               <p className="text-sm text-blue-200">
//                 Acceptance Rate
//               </p>
//             </div>

//             <div className="text-center">
//               <p className="text-3xl font-bold">
//                 40+
//               </p>
//               <p className="text-sm text-blue-200">
//                 Programs
//               </p>
//             </div>

//           </div>

//         </div>

//       </section>

//       {/* =================================================
//           PROGRAMS
//       ================================================= */}

//       <section
//         id="programs"
//         ref={programsRef}
//         className="py-16 px-4 max-w-7xl mx-auto"
//       >

//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">

//           Our{" "}
//           <span className="text-blue-600">
//             Programs
//           </span>

//         </h2>

//         <div className="grid md:grid-cols-3 gap-6">

//           {/* BCA */}

//           <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">

//             <div className="text-4xl mb-3">
//               💻
//             </div>

//             <h3 className="text-xl font-bold text-gray-800">
//               BCA
//             </h3>

//             <p className="text-gray-600 mt-1">
//               Bachelor of Computer Applications
//             </p>

//             <button
//               type="button"
//               onClick={scrollToForm}
//               className="inline-block mt-4 text-blue-600 font-medium hover:underline"
//             >
//               Apply Now →
//             </button>

//           </div>

//           {/* BTECH */}

//           <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">

//             <div className="text-4xl mb-3">
//               🖥️
//             </div>

//             <h3 className="text-xl font-bold text-gray-800">
//               B.Tech
//             </h3>

//             <p className="text-gray-600 mt-1">
//               Bachelor of Technology
//             </p>

//             <button
//               type="button"
//               onClick={scrollToForm}
//               className="inline-block mt-4 text-blue-600 font-medium hover:underline"
//             >
//               Apply Now →
//             </button>

//           </div>

//           {/* MBA */}

//           <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">

//             <div className="text-4xl mb-3">
//               📊
//             </div>

//             <h3 className="text-xl font-bold text-gray-800">
//               MBA
//             </h3>

//             <p className="text-gray-600 mt-1">
//               Master of Business Administration
//             </p>

//             <button
//               type="button"
//               onClick={scrollToForm}
//               className="inline-block mt-4 text-blue-600 font-medium hover:underline"
//             >
//               Apply Now →
//             </button>

//           </div>

//         </div>

//       </section>

//       {/* =================================================
//           APPLICATION FORM
//       ================================================= */}

//       <section
//         id="application-form"
//         className="py-16 px-4 bg-gray-50"
//       >

//         <div
//           ref={formRef}
//           className="max-w-4xl mx-auto"
//         >

//           {/* HEADER */}

//           <div className="text-center mb-10">

//             <h2 className="text-3xl font-bold text-gray-800">

//               📝 Start Your{" "}

//               <span className="text-blue-600">
//                 Application
//               </span>

//             </h2>

//             <p className="text-gray-600 mt-2">
//               Fill out the form below.
//               All fields marked with * are required.
//             </p>

//             {/* PROGRESS */}

//             <div className="mt-6 flex justify-center items-center gap-2 text-sm">

//               <span
//                 className={`px-3 py-1 rounded-full ${
//                   formStep >= 1
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200 text-gray-600"
//                 }`}
//               >
//                 1. Info
//               </span>

//               <span className="w-8 h-0.5 bg-gray-300"></span>

//               <span
//                 className={`px-3 py-1 rounded-full ${
//                   formStep >= 2
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200 text-gray-600"
//                 }`}
//               >
//                 2. Review
//               </span>

//             </div>

//           </div>

//           {/* =================================================
//               FORMIK
//           ================================================= */}

//           <Formik
//             initialValues={{
//               studentName: "",
//               email: "",
//               mobile: "",
//               courseName: "",
//               DOB: "",
//               agreeTerms: false,
//             }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >

//             {({
//               values,
//               isSubmitting,
//               setFieldValue,
//             }) => (

//               <Form className="bg-white shadow-xl rounded-2xl p-6 md:p-8">

//                 {/* =================================================
//                     STEP 1
//                 ================================================= */}

//                 {formStep === 1 && (

//                   <div className="space-y-5">

//                     <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
//                       Personal Information
//                     </h3>

//                     {/* NAME + DOB */}

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                       {/* NAME */}

//                       <div>

//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Full Name *
//                         </label>

//                         <Field
//                           type="text"
//                           name="studentName"
//                           placeholder="Enter full name"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                         />

//                         <ErrorMessage
//                           name="studentName"
//                           component="p"
//                           className="text-red-500 text-sm mt-1"
//                         />

//                       </div>

//                       {/* DOB */}

//                       <div>

//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Date of Birth *
//                         </label>

//                         <Field
//                           type="date"
//                           name="DOB"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                         />

//                         <ErrorMessage
//                           name="DOB"
//                           component="p"
//                           className="text-red-500 text-sm mt-1"
//                         />

//                       </div>

//                     </div>

//                     {/* EMAIL + MOBILE */}

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                       {/* EMAIL */}

//                       <div>

//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Email Address *
//                         </label>

//                         <Field
//                           type="email"
//                           name="email"
//                           placeholder="you@example.com"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                         />

//                         <ErrorMessage
//                           name="email"
//                           component="p"
//                           className="text-red-500 text-sm mt-1"
//                         />

//                       </div>

//                       {/* MOBILE */}

//                       <div>

//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Phone Number *
//                         </label>

//                         <Field
//                           type="text"
//                           name="mobile"
//                           maxLength="10"
//                           placeholder="10 digit mobile number"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                         />

//                         <ErrorMessage
//                           name="mobile"
//                           component="p"
//                           className="text-red-500 text-sm mt-1"
//                         />

//                       </div>

//                     </div>

//                     {/* COURSE */}

//                     <div>

//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Select Program *
//                       </label>

//                       <Field
//                         as="select"
//                         name="courseName"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                       >

//                         <option value="">
//                           -- Choose a program --
//                         </option>

//                         <option value="BCA">
//                           BCA
//                         </option>

//                         <option value="B.Tech">
//                           B.Tech
//                         </option>

//                         <option value="MBA">
//                           MBA
//                         </option>

//                         <option value="MCA">
//                           MCA
//                         </option>

//                       </Field>

//                       <ErrorMessage
//                         name="courseName"
//                         component="p"
//                         className="text-red-500 text-sm mt-1"
//                       />

//                     </div>

//                     {/* NEXT BUTTON */}

//                     <button
//                       type="button"
//                       onClick={() => setFormStep(2)}
//                       className="mt-2 w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
//                     >
//                       Next Step →
//                     </button>

//                   </div>

//                 )}

//                 {/* =================================================
//                     STEP 2
//                 ================================================= */}

//                 {formStep === 2 && (

//                   <div className="space-y-5">

//                     <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
//                       Review & Submit
//                     </h3>

//                     {/* REVIEW DATA */}

//                     <div className="bg-gray-50 rounded-xl p-5 space-y-3 text-sm">

//                       <p>
//                         <span className="font-semibold">
//                           Name:
//                         </span>{" "}
//                         {values.studentName || "—"}
//                       </p>

//                       <p>
//                         <span className="font-semibold">
//                           Email:
//                         </span>{" "}
//                         {values.email || "—"}
//                       </p>

//                       <p>
//                         <span className="font-semibold">
//                           Phone:
//                         </span>{" "}
//                         {values.mobile || "—"}
//                       </p>

//                       <p>
//                         <span className="font-semibold">
//                           Date of Birth:
//                         </span>{" "}
//                         {values.DOB || "—"}
//                       </p>

//                       <p>
//                         <span className="font-semibold">
//                           Course:
//                         </span>{" "}
//                         {values.courseName || "—"}
//                       </p>

//                     </div>

//                     {/* TERMS */}

//                     <div className="flex items-start gap-2">

//                       <input
//                         type="checkbox"
//                         name="agreeTerms"
//                         checked={values.agreeTerms}
//                         onChange={(e) =>
//                           setFieldValue(
//                             "agreeTerms",
//                             e.target.checked
//                           )
//                         }
//                         className="mt-1"
//                       />

//                       <div>

//                         <label className="text-sm text-gray-600">

//                           I confirm that all information
//                           provided is accurate and I agree
//                           to the Terms & Conditions and
//                           Privacy Policy.

//                         </label>

//                         <ErrorMessage
//                           name="agreeTerms"
//                           component="p"
//                           className="text-red-500 text-sm mt-1"
//                         />

//                       </div>

//                     </div>

//                     {/* BUTTONS */}

//                     <div className="flex gap-3 flex-wrap">

//                       <button
//                         type="button"
//                         onClick={() => setFormStep(1)}
//                         className="bg-gray-200 text-gray-800 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-300 transition"
//                       >
//                         ← Back
//                       </button>

//                       <button
//                         type="submit"
//                         disabled={
//                           isSubmitting ||
//                           !values.agreeTerms
//                         }
//                         className={`px-6 py-2.5 rounded-xl font-medium text-white transition ${
//                           values.agreeTerms
//                             ? "bg-blue-600 hover:bg-blue-700"
//                             : "bg-gray-400 cursor-not-allowed"
//                         }`}
//                       >

//                         {isSubmitting
//                           ? "Submitting..."
//                           : "🎓 Apply Now"}

//                       </button>

//                     </div>

//                   </div>

//                 )}

//               </Form>

//             )}

//           </Formik>

//         </div>

//       </section>

//       {/* =================================================
//           CONTACT
//       ================================================= */}

//       <section
//         id="contact"
//         ref={contactRef}
//         className="py-16 px-4 bg-white border-t border-gray-200"
//       >

//         <div className="max-w-4xl mx-auto text-center">

//           <h2 className="text-3xl font-bold text-gray-800 mb-6">

//             Get In{" "}
//             <span className="text-blue-600">
//               Touch
//             </span>

//           </h2>

//           <p className="text-gray-600 mb-8">
//             Have questions? Our admissions team is here
//             to help.
//           </p>

//           <div className="grid md:grid-cols-3 gap-6">

//             {/* EMAIL */}

//             <a
//               href="mailto:admissions@university.edu"
//               className="p-4 border rounded-xl hover:shadow-md transition"
//             >

//               <div className="text-3xl mb-2">
//                 📧
//               </div>

//               <p className="font-medium text-gray-800">
//                 Email Us
//               </p>

//               <p className="text-sm text-blue-600">
//                 admissions@university.edu
//               </p>

//             </a>

//             {/* PHONE */}

//             <a
//               href="tel:+18005551234"
//               className="p-4 border rounded-xl hover:shadow-md transition"
//             >

//               <div className="text-3xl mb-2">
//                 📞
//               </div>

//               <p className="font-medium text-gray-800">
//                 Call Us
//               </p>

//               <p className="text-sm text-blue-600">
//                 +1 (800) 555-1234
//               </p>

//             </a>

//             {/* WHATSAPP */}

//             <a
//               href="https://wa.me/18005551234"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-4 border rounded-xl hover:shadow-md transition"
//             >

//               <div className="text-3xl mb-2">
//                 💬
//               </div>

//               <p className="font-medium text-gray-800">
//                 WhatsApp
//               </p>

//               <p className="text-sm text-blue-600">
//                 Chat with us
//               </p>

//             </a>

//           </div>

//         </div>

//       </section>

//       {/* =================================================
//           FOOTER
//       ================================================= */}

//       <Footer />

//     </div>
//   );
// };

// export default AddmissionPage;

