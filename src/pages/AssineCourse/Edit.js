import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  updateAssinecourse,
  FindOneAssinecourse,
} from "../../Service/admin/AssineCourse";

import { ViewAllStudent } from "../../Service/admin/collage";
import { ViewAllCourse } from "../../Service/admin/Course";

export default function CourseAssineEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [assignment, setAssignment] = useState({
    studentId: "",
    courseId: [],
    assignDate: "",
  });

  // ================= FORM =================

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      studentId: assignment.studentId || "",

      courseId: Array.isArray(assignment.courseId)
        ? assignment.courseId
        : assignment.courseId
        ? [assignment.courseId]
        : [],

      assignDate: assignment.assignDate
        ? String(assignment.assignDate).split("T")[0]
        : "",
    },

    validationSchema: Yup.object({
      studentId: Yup.string().required("Student is required"),

      courseId: Yup.array()
        .of(Yup.string())
        .min(1, "Please select at least one course")
        .required("Course is required"),

      assignDate: Yup.string().required("Assign date is required"),
    }),

    onSubmit: async (values) => {
      try {
        const payload = {
          id: id,
          studentId: values.studentId,
          courseId: values.courseId,
          assignDate: values.assignDate,
        };

        console.log("UPDATE PAYLOAD:", payload);

        const res = await updateAssinecourse(payload);

        console.log("UPDATE RESPONSE:", res);

        await Swal.fire({
          title: "Success!",
          text: "Course updated successfully",
          icon: "success",
        });

        navigate("/admin/assine-course");
      } catch (error) {
        console.log("UPDATE ERROR:", error);

        Swal.fire({
          title: "Error!",
          text:
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong",
          icon: "error",
        });
      }
    },
  });

  // ================= STUDENTS =================

  const getStudents = async () => {
    try {
      const res = await ViewAllStudent();

      console.log("STUDENT RESPONSE:", res);

      const data = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.data)
        ? res.data.data
        : [];

      setStudents(data);
    } catch (error) {
      console.log("STUDENT ERROR:", error);
      setStudents([]);
    }
  };

  // ================= COURSES =================

  const fetchCourses = async () => {
    try {
      const res = await ViewAllCourse();

      console.log("COURSE RESPONSE:", res);

      const data = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.data)
        ? res.data.data
        : [];

      setCourses(data);
    } catch (error) {
      console.log("COURSE ERROR:", error);
      setCourses([]);
    }
  };

  // ================= FIND ASSIGNMENT =================

  const getAssignment = async () => {
    try {
      if (!id) {
        console.log("ID NOT FOUND");
        return;
      }

      console.log("EDIT PAGE ID:", id);

      const res = await FindOneAssinecourse(id);

      console.log("FIND ONE RESPONSE:", res);

      /*
        Possible responses:

        { data: {...} }

        OR

        { data: { data: {...} } }

        OR

        {...}
      */

      const data =
        res?.data?.data ||
        res?.data ||
        res;

      console.log("FINAL ASSIGNMENT DATA:", data);

      if (!data || !data._id) {
        throw new Error("Assignment data not found");
      }

      // ================= STUDENT ID =================

      let studentId = "";

      if (data.studentId) {
        if (typeof data.studentId === "object") {
          studentId = data.studentId._id || "";
        } else {
          studentId = data.studentId;
        }
      }

      // ================= COURSE IDS =================

      let courseIds = [];

      if (Array.isArray(data.courseId)) {
        courseIds = data.courseId
          .map((course) => {
            if (typeof course === "object") {
              return course?._id;
            }

            return course;
          })
          .filter(Boolean);
      } else if (data.courseId) {
        courseIds = [
          typeof data.courseId === "object"
            ? data.courseId?._id
            : data.courseId,
        ].filter(Boolean);
      }

      // ================= DATE =================

      let assignDate = "";

      if (data.assignDate) {
        assignDate = String(data.assignDate).split("T")[0];
      }

      console.log("STUDENT ID:", studentId);
      console.log("COURSE IDS:", courseIds);
      console.log("ASSIGN DATE:", assignDate);

      setAssignment({
        studentId,
        courseId: courseIds,
        assignDate,
      });
    } catch (error) {
      console.log("FIND ASSIGNMENT ERROR:", error);

      Swal.fire({
        title: "Error!",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Unable to load assignment data",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ================= USE EFFECT =================

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        getStudents(),
        fetchCourses(),
      ]);

      if (id) {
        await getAssignment();
      } else {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-lg font-semibold text-violet-600">
          Loading assignment...
        </div>
      </div>
    );
  }

  // ================= UI =================

  return (
    <div>
      <div className="space-y-6">

        {/* HEADER */}

        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-slate-800">
            Edit Course Assignment
          </h2>
        </div>

        {/* FORM CARD */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 w-full">

          <form onSubmit={formik.handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {/* STUDENT */}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Student
                </label>

                <select
                  name="studentId"
                  value={formik.values.studentId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                >
                  <option value="">
                    Select Student
                  </option>

                  {students
                    .filter((item) => item.status === "Active")
                    .map((item) => (
                      <option
                        key={item._id}
                        value={item._id}
                      >
                        {item.StudentName}
                      </option>
                    ))}
                </select>

                {formik.touched.studentId &&
                  formik.errors.studentId && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.studentId}
                    </p>
                  )}
              </div>

              {/* COURSES */}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Courses
                </label>

                <div className="border border-slate-300 rounded-xl p-4 max-h-48 overflow-y-auto">

                  {courses.map((item) => {
                    const courseId = item._id;

                    return (
                      <label
                        key={courseId}
                        className="flex items-center gap-3 py-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={courseId}
                          checked={formik.values.courseId.includes(
                            courseId
                          )}
                          onChange={(e) => {
                            const { checked, value } = e.target;

                            if (checked) {
                              formik.setFieldValue(
                                "courseId",
                                [
                                  ...formik.values.courseId,
                                  value,
                                ]
                              );
                            } else {
                              formik.setFieldValue(
                                "courseId",
                                formik.values.courseId.filter(
                                  (course) =>
                                    course !== value
                                )
                              );
                            }
                          }}
                          className="w-4 h-4"
                        />

                        <span className="text-sm text-slate-700">
                          {item.courseName}
                        </span>
                      </label>
                    );
                  })}

                </div>

                {formik.touched.courseId &&
                  formik.errors.courseId && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.courseId}
                    </p>
                  )}
              </div>

              {/* DATE */}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Assign Date
                </label>

                <input
                  type="date"
                  name="assignDate"
                  value={formik.values.assignDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
                />

                {formik.touched.assignDate &&
                  formik.errors.assignDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.assignDate}
                    </p>
                  )}
              </div>
            </div>

            {/* DIVIDER */}

            <div className="border-t border-slate-200 my-8"></div>

            {/* BUTTONS */}

            <div className="flex justify-end gap-4">

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/assine-course")
                }
                className="px-8 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-md transition"
              >
                Update
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}