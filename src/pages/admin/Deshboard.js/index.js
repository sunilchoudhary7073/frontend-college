import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { ViewAallDesboard } from "../../../Service/admin/Teacher";
import{ViewAall_Desboard}from '../../../Service/admin/Course'
import{ViewAllStudentDeshboard} from '../../../Service/admin/collage'
import{EnrollmentTrends}from '../../../Service/admin/Deashboard'

export default function Deshboard() {
  const [dashboard, setDashboard] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalCourses: 0,
    totalAdmissions: 0,
    enrollment: [],
  });
  const [enrollmentData, setEnrollmentData] = useState([]);

  useEffect(() => {
    handleViewAllDashboard();
    handleViewAllCourseDashboard()
    handleViewAllstudentsDashboard()
    handleEnrollment()
  }, []);

  const handleViewAllDashboard = async () => {
    try {
      const res = await ViewAallDesboard();
      console.log(res);

      if (res?.status) {
      setDashboard((prev) => ({
  ...prev,
  totalFaculty: res.data.length,
}));
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleViewAllCourseDashboard = async () => {
  try {
    const res = await ViewAall_Desboard();

    if (res?.status) {
    
 setDashboard((prev) => ({
  ...prev,
  totalCourses: res.data.length,
}));

    }
  } catch (error) {
    console.log(error);
  }
};
const handleEnrollment = async () => {
  try {
    const res = await EnrollmentTrends();

    console.log("Enrollment Response:", res);
    console.log(res)

    if (res.status) {
      setEnrollmentData(res.data);
    }
  } catch (error) {
    console.log(error);
  }
};



 const handleViewAllstudentsDashboard = async () => {
  try {
    const res = await ViewAllStudentDeshboard();

    console.log("Student API:", res);

  
      setDashboard((prev) => ({
        ...prev,
        totalStudents: res.length,
      }));
    
  } catch (error) {
    console.log(error);
  }
};
const statsData = [
  {
    title: "Total Students",
    value: dashboard.totalStudents,
    icon: "👨‍🎓",
    color: "bg-blue-500",
  },
  {
    title: "Total Faculty",
    value: dashboard.totalFaculty,
    icon: "👨‍🏫",
    color: "bg-green-500",
  },
  {
    title: "Active Courses",
    value: dashboard.totalCourses,
    icon: "📚",
    color: "bg-purple-500",
  },
  {
    title: "Admissions",
    value: dashboard.totalAdmissions,
    icon: "📝",
    color: "bg-orange-500",
  },
];


const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const chartData = enrollmentData.map((item) => ({
  
  month: months[item._id - 1],
  students: item.students,
}));
console.log(enrollmentData);
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-5"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">{stat.title}</p>
                <h2 className="text-2xl font-bold">{stat.value}</h2>
              </div>

              <div
                className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-xl font-semibold mb-4">
          Enrollment Trends
        </h2>

        <div className="h-[350px]">
     <ResponsiveContainer width="100%" height={350}>
  <BarChart data={enrollmentData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Bar
      dataKey="students"
      fill="#3B82F6"
      barSize={35}
      radius={[5, 5, 0, 0]}
    />
  </BarChart>
</ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}