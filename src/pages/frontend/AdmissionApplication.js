import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    Check,
    FileText,
    Upload,
    CreditCard,
    GraduationCap,
    User,
    MapPin,
    BookOpen,
    ChevronRight,
    ChevronLeft,
} from "lucide-react";

import { ViewAllCourse } from "../../Service/frontend/Course";
import { addAddmissionform } from "../../Service/frontend/Addmissionpage";

const steps = [
    {
        id: 1,
        title: "Fill Application Form",
        icon: FileText,
    },
    {
        id: 2,
        title: "Submit Documents",
        icon: Upload,
    },
    {
        id: 3,
        title: "Pay Application Fee",
        icon: CreditCard,
    },
    {
        id: 4,
        title: "Submit Application",
        icon: GraduationCap,
    },
];

const initialValues = {
    // Personal
    fullName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    category: "",
    nationality: "Indian",

    // Contact
    email: "",
    mobile: "",
    alternateMobile: "",

    // Address
    address: "",
    city: "",
    state: "",
    pincode: "",

    // Course
    courseId: "",
    admissionType: "",
    academicSession: "",

    // Academic
    tenthBoard: "",
    tenthPercentage: "",
    tenthYear: "",
    twelfthBoard: "",
    twelfthPercentage: "",
    twelfthYear: "",
    graduation: "",
    graduationPercentage: "",

    // Other
    fatherOccupation: "",
    motherOccupation: "",
    familyIncome: "",
    bloodGroup: "",
    domicile: "",
    disability: "",

    // Documents
    photo: null,
    signature: null,
    aadhaar: null,
    tenthMarksheet: null,
    twelfthMarksheet: null,
    graduationMarksheet: null,

    // Payment
    paymentMethod: "",
    transactionId: "",

    agreeTerms: false,
};

const validationSchema = Yup.object({
    fullName: Yup.string()
        .trim()
        .required("Full Name is required"),

    fatherName: Yup.string()
        .trim()
        .required("Father Name is required"),

    motherName: Yup.string()
        .trim()
        .required("Mother Name is required"),

    dob: Yup.date()
        .required("Date of Birth is required"),

    gender: Yup.string()
        .required("Gender is required"),

    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

    mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile number")
        .required("Mobile number is required"),

    address: Yup.string()
        .required("Address is required"),

    city: Yup.string()
        .required("City is required"),

    state: Yup.string()
        .required("State is required"),

    pincode: Yup.string()
        .matches(/^[0-9]{6}$/, "Enter valid 6 digit PIN code")
        .required("PIN code is required"),

    courseId: Yup.string()
        .required("Please select course"),

    admissionType: Yup.string()
        .required("Please select admission type"),

    academicSession: Yup.string()
        .required("Please select academic session"),

    tenthBoard: Yup.string()
        .required("10th board is required"),

    tenthPercentage: Yup.string()
        .required("10th percentage is required"),

    twelfthBoard: Yup.string()
        .required("12th board is required"),

    twelfthPercentage: Yup.string()
        .required("12th percentage is required"),

    agreeTerms: Yup.boolean()
        .oneOf([true], "Please accept Terms & Conditions"),
});

const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition";

const labelClass =
    "block text-sm font-semibold text-gray-700 mb-2";


function InputField({
    label,
    name,
    type = "text",
    placeholder,
}) {
    return (
        <div>
            <label className={labelClass}>
                {label}
            </label>

            <Field
                name={name}
                type={type}
                placeholder={placeholder}
                className={inputClass}
            />

            <ErrorMessage
                name={name}
                component="p"
                className="text-red-500 text-xs mt-1"
            />
        </div>
    );
}


function SelectField({
    label,
    name,
    children,
}) {
    return (
        <div>
            <label className={labelClass}>
                {label}
            </label>

            <Field
                as="select"
                name={name}
                className={inputClass}
            >
                {children}
            </Field>

            <ErrorMessage
                name={name}
                component="p"
                className="text-red-500 text-xs mt-1"
            />
        </div>
    );
}


function FileField({
    label,
    name,
    setFieldValue,
    values,
}) {
    return (
        <div>
            <label className={labelClass}>
                {label}
            </label>

            <label className="border-2 border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition">

                <Upload className="w-7 h-7 text-blue-600 mb-2" />

                <span className="text-sm text-gray-600">
                    {values[name]
                        ? values[name].name
                        : "Click to upload"}
                </span>

                <span className="text-xs text-gray-400 mt-1">
                    PDF / JPG / PNG
                </span>

                <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                        const file = e.currentTarget.files?.[0];

                        if (file) {
                            setFieldValue(name, file);
                        }
                    }}
                />

            </label>
        </div>
    );
}


export default function AdmissionApplication() {

    const [currentStep, setCurrentStep] = useState(1);

    const [program, setProgram] = useState([])

    const [loadingCourses, setLoadingCourses] = useState(false);

    const [submitSuccess, setSubmitSuccess] = useState(false);

    const [applicationData, setApplicationData] = useState(null);


    // ==========================
    // GET COURSES
    // ==========================

    useEffect(() => {
        handleViewAllProgram();
    }, []);
    const handleViewAllProgram = async () => {
        try {
            const res = await ViewAllCourse();

            console.log("Full Response:", res);

            if (Array.isArray(res)) {
                setProgram(res);
            } else {
                setProgram([]);
            }

        } catch (error) {
            console.log("Course Error:", error);
            setProgram([]);
        }
    };


    // ==========================
    // NEXT STEP
    // ==========================

    const nextStep = async (
        validateForm,
        setTouched
    ) => {

        const errors = await validateForm();

        // Step 1 validation
        if (currentStep === 1) {

            const step1Fields = [
                "fullName",
                "fatherName",
                "motherName",
                "dob",
                "gender",
                "email",
                "mobile",
                "address",
                "city",
                "state",
                "pincode",
                "courseId",
                "admissionType",
                "academicSession",
                "tenthBoard",
                "tenthPercentage",
                "twelfthBoard",
                "twelfthPercentage",
            ];

            const step1Errors = {};

            step1Fields.forEach((field) => {

                if (errors[field]) {
                    step1Errors[field] = true;
                }

            });

            if (Object.keys(step1Errors).length > 0) {

                const touched = {};

                step1Fields.forEach((field) => {
                    touched[field] = true;
                });

                setTouched(touched);

                return;
            }
        }


        if (currentStep < 4) {

            setCurrentStep((prev) => prev + 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

        }

    };


    // ==========================
    // PREVIOUS
    // ==========================

    const previousStep = () => {

        if (currentStep > 1) {

            setCurrentStep((prev) => prev - 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

        }

    };


    // ==========================
    // SUBMIT
    // ==========================

    const handleSubmit = async (
        values,
        { setSubmitting }
    ) => {

        try {

            const formData = new FormData();


            // Personal
            formData.append("fullName", values.fullName);
            formData.append("fatherName", values.fatherName);
            formData.append("motherName", values.motherName);
            formData.append("dob", values.dob);
            formData.append("gender", values.gender);
            formData.append("category", values.category);
            formData.append("nationality", values.nationality);


            // Contact
            formData.append("email", values.email);
            formData.append("mobile", values.mobile);
            formData.append(
                "alternateMobile",
                values.alternateMobile
            );


            // Address
            formData.append("address", values.address);
            formData.append("city", values.city);
            formData.append("state", values.state);
            formData.append("pincode", values.pincode);


            // Course
            formData.append("courseId", values.courseId);
            formData.append(
                "admissionType",
                values.admissionType
            );
            formData.append(
                "academicSession",
                values.academicSession
            );


            // Academic
            formData.append(
                "tenthBoard",
                values.tenthBoard
            );

            formData.append(
                "tenthPercentage",
                values.tenthPercentage
            );

            formData.append(
                "tenthYear",
                values.tenthYear
            );

            formData.append(
                "twelfthBoard",
                values.twelfthBoard
            );

            formData.append(
                "twelfthPercentage",
                values.twelfthPercentage
            );

            formData.append(
                "twelfthYear",
                values.twelfthYear
            );

            formData.append(
                "graduation",
                values.graduation
            );

            formData.append(
                "graduationPercentage",
                values.graduationPercentage
            );


            // Other
            formData.append(
                "fatherOccupation",
                values.fatherOccupation
            );

            formData.append(
                "motherOccupation",
                values.motherOccupation
            );

            formData.append(
                "familyIncome",
                values.familyIncome
            );

            formData.append(
                "bloodGroup",
                values.bloodGroup
            );

            formData.append(
                "domicile",
                values.domicile
            );

            formData.append(
                "disability",
                values.disability
            );


            // Payment
            formData.append(
                "paymentMethod",
                values.paymentMethod
            );

            formData.append(
                "transactionId",
                values.transactionId
            );
            // Terms
            formData.append("agreeTerms", values.agreeTerms);


            // Documents
            if (values.photo) {
                formData.append("photo", values.photo);
            }

            if (values.signature) {
                formData.append(
                    "signature",
                    values.signature
                );
            }

            if (values.aadhaar) {
                formData.append(
                    "aadhaar",
                    values.aadhaar
                );
            }

            if (values.tenthMarksheet) {
                formData.append(
                    "tenthMarksheet",
                    values.tenthMarksheet
                );
            }

            if (values.twelfthMarksheet) {
                formData.append(
                    "twelfthMarksheet",
                    values.twelfthMarksheet
                );
            }

            if (values.graduationMarksheet) {
                formData.append(
                    "graduationMarksheet",
                    values.graduationMarksheet
                );
            }


            console.log(
                "Submitting Admission..."
            );


            const res = await addAddmissionform(formData);

console.log("Admission Response:", res);
            console.log(
                "Admission Response:",
                res
            );


           if (res?.success === true) {

    setApplicationData({
        ...res.data,
        applicationNo: res.applicationNo
    });

    setSubmitSuccess(true);

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

} else {

    alert(
        res?.message ||
        "Admission submission failed"
    );
}

        } catch (error) {

            console.log(
                "Admission Submit Error:",
                error
            );

            alert(
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong"
            );

        } finally {

            setSubmitting(false);

        }

    };


    // ==========================
    // SUCCESS SCREEN
    // ==========================

    if (submitSuccess) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

                <div className="bg-white max-w-xl w-full rounded-3xl shadow-lg border border-gray-100 p-8 text-center">

                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">

                        <Check className="w-10 h-10 text-green-600" />

                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mt-6">
                        Application Submitted Successfully
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Your admission application has been
                        submitted successfully.
                    </p>


                    <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">

                        <p className="text-sm text-gray-500">
                            Your Application Number
                        </p>

                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {applicationData?.applicationNo ||
                                "Generating..."}
                        </p>

                    </div>


                    <div className="mt-6 text-left space-y-3">

                        <div className="flex justify-between border-b pb-3">

                            <span className="text-gray-500">
                                Applicant
                            </span>

                            <span className="font-semibold">
                                {applicationData?.fullName || "—"}
                            </span>

                        </div>


                        <div className="flex justify-between border-b pb-3">

                            <span className="text-gray-500">
                                Status
                            </span>

                            <span className="font-semibold text-orange-500">
                                {applicationData?.status || "Pending"}
                            </span>

                        </div>

                    </div>


                    <p className="text-sm text-gray-500 mt-6">
                        Please save your Application Number for
                        future admission related activities.
                    </p>

                </div>

            </div>
        );

    }


    return (
        <div className="min-h-screen bg-white">


            {/* ================= HEADER ================= */}

            <div className="border-b border-gray-100 bg-white">

                <div className="max-w-7xl mx-auto px-4 py-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                College Admission
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                Complete your application in a few simple
                                steps
                            </p>

                        </div>


                        <div className="hidden md:flex items-center gap-2">

                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">

                                <GraduationCap className="text-white w-5 h-5" />

                            </div>

                            <span className="font-bold text-gray-800">
                                College Portal
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================= PROCESS ================= */}

            <div className="max-w-7xl mx-auto px-4 pt-8">

                <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-7 shadow-sm">

                    <div className="flex items-center justify-between">

                        {steps.map((step, index) => {

                            const Icon = step.icon;

                            const completed =
                                currentStep > step.id;

                            const active =
                                currentStep === step.id;


                            return (
                                <React.Fragment key={step.id}>

                                    <div className="flex flex-col items-center text-center min-w-0">

                                        <div
                                            className={`w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 transition ${completed
                                                ? "bg-green-500 border-green-500 text-white"
                                                : active
                                                    ? "bg-blue-600 border-blue-600 text-white"
                                                    : "bg-white border-gray-200 text-gray-400"
                                                }`}
                                        >

                                            {completed ? (
                                                <Check className="w-5 h-5 md:w-6 md:h-6" />
                                            ) : (
                                                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                            )}

                                        </div>


                                        <p
                                            className={`mt-2 text-xs md:text-sm font-semibold ${active
                                                ? "text-blue-600"
                                                : completed
                                                    ? "text-green-600"
                                                    : "text-gray-400"
                                                }`}
                                        >
                                            {step.id}. {step.title}
                                        </p>

                                    </div>


                                    {index < steps.length - 1 && (

                                        <div
                                            className={`h-0.5 flex-1 mx-2 md:mx-5 ${currentStep > step.id
                                                ? "bg-green-500"
                                                : "bg-gray-200"
                                                }`}
                                        />

                                    )}

                                </React.Fragment>
                            );

                        })}

                    </div>

                </div>

            </div>


            {/* ================= FORM ================= */}

            <div className="max-w-6xl mx-auto px-4 py-8">

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >

                    {({
                        values,
                        setFieldValue,
                        isSubmitting,
                        validateForm,
                        setTouched,
                    }) => (

                        <Form>


                            {/* =====================================================
                  STEP 1
              ===================================================== */}

                            {currentStep === 1 && (

                                <div className="space-y-6">


                                    {/* PERSONAL */}

                                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">

                                        <div className="p-6 border-b border-gray-100 flex items-center gap-3">

                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                                                <User className="w-5 h-5 text-blue-600" />

                                            </div>

                                            <div>

                                                <h2 className="text-lg font-bold text-gray-900">
                                                    Personal Information
                                                </h2>

                                                <p className="text-sm text-gray-500">
                                                    Enter your basic personal details
                                                </p>

                                            </div>

                                        </div>


                                        <div className="p-6 grid md:grid-cols-2 gap-5">

                                            <InputField
                                                label="Full Name *"
                                                name="fullName"
                                                placeholder="Enter full name"
                                            />

                                            <InputField
                                                label="Father's Name *"
                                                name="fatherName"
                                                placeholder="Enter father's name"
                                            />

                                            <InputField
                                                label="Mother's Name *"
                                                name="motherName"
                                                placeholder="Enter mother's name"
                                            />

                                            <InputField
                                                label="Date of Birth *"
                                                name="dob"
                                                type="date"
                                            />

                                            <SelectField
                                                label="Gender *"
                                                name="gender"
                                            >

                                                <option value="">
                                                    Select Gender
                                                </option>

                                                <option value="Male">
                                                    Male
                                                </option>

                                                <option value="Female">
                                                    Female
                                                </option>

                                                <option value="Other">
                                                    Other
                                                </option>

                                            </SelectField>


                                            <SelectField
                                                label="Category"
                                                name="category"
                                            >

                                                <option value="">
                                                    Select Category
                                                </option>

                                                <option value="General">
                                                    General
                                                </option>

                                                <option value="OBC">
                                                    OBC
                                                </option>

                                                <option value="SC">
                                                    SC
                                                </option>

                                                <option value="ST">
                                                    ST
                                                </option>

                                                <option value="EWS">
                                                    EWS
                                                </option>

                                            </SelectField>

                                        </div>

                                    </div>


                                    {/* CONTACT */}

                                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">

                                        <div className="p-6 border-b border-gray-100 flex items-center gap-3">

                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                                                <MapPin className="w-5 h-5 text-blue-600" />

                                            </div>

                                            <div>

                                                <h2 className="text-lg font-bold text-gray-900">
                                                    Contact & Address
                                                </h2>

                                                <p className="text-sm text-gray-500">
                                                    Provide your contact details
                                                </p>

                                            </div>

                                        </div>


                                        <div className="p-6 grid md:grid-cols-2 gap-5">

                                            <InputField
                                                label="Email Address *"
                                                name="email"
                                                type="email"
                                                placeholder="example@gmail.com"
                                            />

                                            <InputField
                                                label="Mobile Number *"
                                                name="mobile"
                                                placeholder="10 digit mobile number"
                                            />

                                            <InputField
                                                label="Alternate Mobile"
                                                name="alternateMobile"
                                                placeholder="Alternate mobile number"
                                            />

                                            <InputField
                                                label="Address *"
                                                name="address"
                                                placeholder="Enter complete address"
                                            />

                                            <InputField
                                                label="City *"
                                                name="city"
                                                placeholder="Enter city"
                                            />

                                            <InputField
                                                label="State *"
                                                name="state"
                                                placeholder="Enter state"
                                            />

                                            <InputField
                                                label="PIN Code *"
                                                name="pincode"
                                                placeholder="6 digit PIN code"
                                            />

                                        </div>

                                    </div>


                                    {/* COURSE */}

                                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">

                                        <div className="p-6 border-b border-gray-100 flex items-center gap-3">

                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                                                <BookOpen className="w-5 h-5 text-blue-600" />

                                            </div>

                                            <div>

                                                <h2 className="text-lg font-bold text-gray-900">
                                                    Course Information
                                                </h2>

                                                <p className="text-sm text-gray-500">
                                                    Select your desired program
                                                </p>

                                            </div>

                                        </div>


                                        <div className="p-6 grid md:grid-cols-3 gap-5">


                                            {/* COURSE FROM API */}

                                            <SelectField
                                                label="Course / Program *"
                                                name="courseId"
                                            >

                                                <option value="">
                                                    {loadingCourses
                                                        ? "Loading Courses..."
                                                        : "Select Course"}
                                                </option>


                                                {program.map((course) => (

                                                    <option
                                                        key={course._id}
                                                        value={course._id}
                                                    >
                                                        {course.courseName}
                                                    </option>

                                                ))}

                                            </SelectField>


                                            <SelectField
                                                label="Admission Type *"
                                                name="admissionType"
                                            >

                                                <option value="">
                                                    Select Type
                                                </option>

                                                <option value="Regular">
                                                    Regular
                                                </option>

                                                <option value="Lateral Entry">
                                                    Lateral Entry
                                                </option>

                                            </SelectField>


                                            <SelectField
                                                label="Academic Session *"
                                                name="academicSession"
                                            >

                                                <option value="">
                                                    Select Session
                                                </option>

                                                <option value="2026-27">
                                                    2026-27
                                                </option>

                                                <option value="2027-28">
                                                    2027-28
                                                </option>

                                            </SelectField>

                                        </div>

                                    </div>


                                    {/* ACADEMIC */}

                                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">

                                        <div className="p-6 border-b border-gray-100">

                                            <h2 className="text-lg font-bold text-gray-900">
                                                Academic Information
                                            </h2>

                                        </div>


                                        <div className="p-6 grid md:grid-cols-2 gap-5">

                                            <InputField
                                                label="10th Board *"
                                                name="tenthBoard"
                                                placeholder="CBSE / RBSE / Other"
                                            />

                                            <InputField
                                                label="10th Percentage *"
                                                name="tenthPercentage"
                                                placeholder="Example: 85%"
                                            />

                                            <InputField
                                                label="10th Passing Year"
                                                name="tenthYear"
                                                placeholder="Example: 2024"
                                            />

                                            <InputField
                                                label="12th Board *"
                                                name="twelfthBoard"
                                                placeholder="CBSE / RBSE / Other"
                                            />

                                            <InputField
                                                label="12th Percentage *"
                                                name="twelfthPercentage"
                                                placeholder="Example: 82%"
                                            />

                                            <InputField
                                                label="12th Passing Year"
                                                name="twelfthYear"
                                                placeholder="Example: 2026"
                                            />

                                            <InputField
                                                label="Graduation"
                                                name="graduation"
                                                placeholder="Degree name"
                                            />

                                            <InputField
                                                label="Graduation Percentage"
                                                name="graduationPercentage"
                                                placeholder="Example: 75%"
                                            />

                                        </div>

                                    </div>


                                    {/* OTHER */}

                                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">

                                        <div className="p-6 border-b border-gray-100">

                                            <h2 className="text-lg font-bold text-gray-900">
                                                Other Information
                                            </h2>

                                        </div>


                                        <div className="p-6 grid md:grid-cols-2 gap-5">

                                            <InputField
                                                label="Father's Occupation"
                                                name="fatherOccupation"
                                                placeholder="Enter occupation"
                                            />

                                            <InputField
                                                label="Mother's Occupation"
                                                name="motherOccupation"
                                                placeholder="Enter occupation"
                                            />

                                            <InputField
                                                label="Annual Family Income"
                                                name="familyIncome"
                                                placeholder="Example: ₹5,00,000"
                                            />

                                            <SelectField
                                                label="Blood Group"
                                                name="bloodGroup"
                                            >

                                                <option value="">
                                                    Select Blood Group
                                                </option>

                                                <option value="A+">
                                                    A+
                                                </option>

                                                <option value="A-">
                                                    A-
                                                </option>

                                                <option value="B+">
                                                    B+
                                                </option>

                                                <option value="B-">
                                                    B-
                                                </option>

                                                <option value="O+">
                                                    O+
                                                </option>

                                                <option value="O-">
                                                    O-
                                                </option>

                                                <option value="AB+">
                                                    AB+
                                                </option>

                                                <option value="AB-">
                                                    AB-
                                                </option>

                                            </SelectField>


                                            <InputField
                                                label="Domicile"
                                                name="domicile"
                                                placeholder="Domicile state"
                                            />


                                            <SelectField
                                                label="Disability Status"
                                                name="disability"
                                            >

                                                <option value="">
                                                    Select
                                                </option>

                                                <option value="No">
                                                    No
                                                </option>

                                                <option value="Yes">
                                                    Yes
                                                </option>

                                            </SelectField>

                                        </div>

                                    </div>

                                </div>

                            )}


                            {/* =====================================================
                  STEP 2
              ===================================================== */}

                            {currentStep === 2 && (

                                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">

                                    <div className="p-6 border-b border-gray-100">

                                        <h2 className="text-xl font-bold text-gray-900">
                                            Submit Documents
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Upload your required documents
                                        </p>

                                    </div>


                                    <div className="p-6 grid md:grid-cols-2 gap-5">

                                        <FileField
                                            label="Passport Size Photo"
                                            name="photo"
                                            setFieldValue={setFieldValue}
                                            values={values}
                                        />

                                        <FileField
                                            label="Signature"
                                            name="signature"
                                            setFieldValue={setFieldValue}
                                            values={values}
                                        />

                                        <FileField
                                            label="Aadhaar Card"
                                            name="aadhaar"
                                            setFieldValue={setFieldValue}
                                            values={values}
                                        />

                                        <FileField
                                            label="10th Marksheet"
                                            name="tenthMarksheet"
                                            setFieldValue={setFieldValue}
                                            values={values}
                                        />

                                        <FileField
                                            label="12th Marksheet"
                                            name="twelfthMarksheet"
                                            setFieldValue={setFieldValue}
                                            values={values}
                                        />

                                        <FileField
                                            label="Graduation Marksheet"
                                            name="graduationMarksheet"
                                            setFieldValue={setFieldValue}
                                            values={values}
                                        />

                                    </div>

                                </div>

                            )}


                            {/* =====================================================
                  STEP 3
              ===================================================== */}

                            {currentStep === 3 && (

                                <div className="max-w-2xl mx-auto">

                                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">

                                        <div className="text-center">

                                            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">

                                                <CreditCard className="w-8 h-8 text-blue-600" />

                                            </div>

                                            <h2 className="text-2xl font-bold text-gray-900 mt-5">
                                                Application Fee
                                            </h2>

                                            <p className="text-gray-500 mt-2">
                                                Complete your application fee payment
                                            </p>

                                        </div>


                                        <div className="mt-8 bg-gray-50 rounded-xl p-5 flex justify-between items-center">

                                            <span className="font-medium text-gray-700">
                                                Application Fee
                                            </span>

                                            <span className="text-2xl font-bold text-blue-600">
                                                ₹1,000
                                            </span>

                                        </div>


                                        <div className="mt-6 space-y-5">

                                            <SelectField
                                                label="Payment Method"
                                                name="paymentMethod"
                                            >

                                                <option value="">
                                                    Select Payment Method
                                                </option>

                                                <option value="UPI">
                                                    UPI
                                                </option>

                                                <option value="Card">
                                                    Debit / Credit Card
                                                </option>

                                                <option value="Net Banking">
                                                    Net Banking
                                                </option>

                                            </SelectField>


                                            <InputField
                                                label="Transaction ID"
                                                name="transactionId"
                                                placeholder="Enter transaction ID"
                                            />

                                        </div>

                                    </div>

                                </div>

                            )}


                            {/* =====================================================
                  STEP 4
              ===================================================== */}

                            {currentStep === 4 && (

                                <div className="max-w-3xl mx-auto">

                                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">

                                        <div className="text-center">

                                            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto">

                                                <GraduationCap className="w-10 h-10 text-blue-600" />

                                            </div>

                                            <h2 className="text-2xl font-bold text-gray-900 mt-5">
                                                Review & Submit Application
                                            </h2>

                                            <p className="text-gray-500 mt-2">
                                                Please verify your details before
                                                submitting your application.
                                            </p>

                                        </div>


                                        <div className="mt-8 grid md:grid-cols-2 gap-4">

                                            <div className="border rounded-xl p-4">

                                                <p className="text-xs text-gray-400">
                                                    Applicant
                                                </p>

                                                <p className="font-semibold mt-1">
                                                    {values.fullName || "—"}
                                                </p>

                                            </div>


                                            <div className="border rounded-xl p-4">

                                                <p className="text-xs text-gray-400">
                                                    Course
                                                </p>

                                                <p className="font-semibold mt-1">

                                                    {program.find(
                                                        (course) =>
                                                            course._id ===
                                                            values.courseId
                                                    )?.courseName || "—"}

                                                </p>

                                            </div>


                                            <div className="border rounded-xl p-4">

                                                <p className="text-xs text-gray-400">
                                                    Email
                                                </p>

                                                <p className="font-semibold mt-1">
                                                    {values.email || "—"}
                                                </p>

                                            </div>


                                            <div className="border rounded-xl p-4">

                                                <p className="text-xs text-gray-400">
                                                    Mobile
                                                </p>

                                                <p className="font-semibold mt-1">
                                                    {values.mobile || "—"}
                                                </p>

                                            </div>

                                        </div>


                                        <div className="mt-6 flex items-start gap-3">

                                            <Field
                                                type="checkbox"
                                                name="agreeTerms"
                                                className="mt-1 w-4 h-4"
                                            />

                                            <div>

                                                <p className="text-sm text-gray-600">

                                                    I confirm that all information
                                                    provided by me is correct and I
                                                    agree to the college terms and
                                                    conditions.

                                                </p>

                                                <ErrorMessage
                                                    name="agreeTerms"
                                                    component="p"
                                                    className="text-red-500 text-xs mt-1"
                                                />

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )}


                            {/* ================= BUTTONS ================= */}

                            <div className="mt-8 flex justify-between">

                                <button
                                    type="button"
                                    onClick={previousStep}
                                    disabled={currentStep === 1}
                                    className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${currentStep === 1
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                                        }`}
                                >

                                    <ChevronLeft className="w-5 h-5" />

                                    Back

                                </button>


                                {currentStep < 4 ? (

                                    <button
                                        type="button"
                                        onClick={() =>
                                            nextStep(
                                                validateForm,
                                                setTouched
                                            )
                                        }
                                        className="px-7 py-3 bg-blue-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 transition"
                                    >

                                        Continue

                                        <ChevronRight className="w-5 h-5" />

                                    </button>

                                ) : (

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-7 py-3 bg-green-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-green-700 transition disabled:opacity-50"
                                    >

                                        <Check className="w-5 h-5" />

                                        {isSubmitting
                                            ? "Submitting..."
                                            : "Submit Application"}

                                    </button>

                                )}

                            </div>

                        </Form>

                    )}

                </Formik>

            </div>

        </div>
    );
}