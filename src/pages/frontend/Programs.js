import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ViewAllCourse } from '../../Service/frontend/Course'
import Header from '../frontend/Header';
import Footer from '../frontend/Footer';
import {
  GraduationCap,
  Briefcase,
  Laptop,
  Book,
  BookOpen,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { array } from 'yup';

const getIcon = (iconName) => {
  const icons = {
    'GraduationCap': GraduationCap,
     'Calendar': Calendar,
    // 'Clock': Clock,
    // 'Users': Users,
    'BookOpen': BookOpen,
    // 'Award': Award,
    'DollarSign': DollarSign,
    'Briefcase': Briefcase,
    'Laptop': Laptop,
    // 'Star': Star,
    // 'Shield': Shield,
    // 'Heart': Heart
  };
  return icons[iconName] || GraduationCap;
};
const Program = [
  {
    icon: Briefcase,
    color: "from-blue-600 to-blue-700",
  },
  {
    icon: Laptop,
    color: "from-purple-600 to-purple-700",
  },
  {
    icon: Book,
    color: "from-green-600 to-green-700",
  },
  {
    icon: BookOpen,
    color: "from-orange-600 to-orange-700",
  },
  {
    icon: DollarSign,
    color: "from-red-600 to-red-700",
  },
];



export default function Programs() {
  const [program, setProgram] = useState([])

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
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-xl">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  JAAT <span className="text-blue-600">University</span>
                </h1>
                <p className="text-xs text-gray-500 font-medium">UGC-Entitled | Est. 1953</p>
              </div>
            </Link>
            <Link to="/" className="text-blue-600 hover:underline flex items-center gap-1">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header> */}
      <Header></Header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-yellow-300">Programs</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Choose from a wide range of UGC-entitled online degrees
          </p>
        </div>
      </section>

      {/* Programs Grid */}
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {program.map((item, idx) => {
        const icons = [Briefcase, Laptop, Book, BookOpen, DollarSign];

        const colors = [
          "from-blue-600 to-blue-700",
          "from-purple-600 to-purple-700",
          "from-green-600 to-green-700",
          "from-orange-600 to-orange-700",
          "from-red-600 to-red-700",
        ];

        const Icon = icons[idx % icons.length];
        const color = colors[idx % colors.length];

        return (
          <div
            key={item._id}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all group"
          >
            <div
              className={`bg-gradient-to-r ${color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}
            >
              <Icon className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {item.courseName}
            </h3>

            <p className="text-sm text-gray-500 mb-2">
              {item.courseType}
            </p>

            <p className="text-sm text-gray-600 mb-4">
              {item.description}
            </p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm font-medium text-gray-600">
                <Calendar className="w-4 h-4 inline mr-1" />
                {item.duration}
              </span>

              <span className="text-lg font-bold text-blue-600">
                ₹{item.fees}
              </span>
            </div>

           <Link
  to="/addmissionpage"
  className="flex items-center justify-center w-full mt-4 bg-blue-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
>
  Apply Now
</Link>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© 2026 JAAT ,University. All rights reserved.</p>
        </div>
      </footer> */}

      <Footer></Footer>
    </div>
  );
}