

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


