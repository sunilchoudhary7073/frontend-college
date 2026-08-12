import React, { useState, useEffect } from "react";
import { FacultyView } from "../../Service/frontend/Faculiy";
import Header from "../frontend/Header";
import Footer from "../frontend/Footer";

export default function Faculty() {
  const [facultyData, setFacultyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // GET FACULTY FROM API
  // =========================
  const handleViewAllFaculty = async () => {
    try {
      setLoading(true);

      const res = await FacultyView();

      console.log("FULL FACULTY RESPONSE:", res);
      console.log("FACULTY DATA:", res?.data);

      if (res?.success && Array.isArray(res?.data)) {
        setFacultyData(res.data);
      } else {
        // setFacultyData([]);
      }
    } catch (error) {
      console.log("Faculty API Error:", error);
      setFacultyData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleViewAllFaculty();
  }, []);

  // =========================
  // SEARCH
  // =========================
  const filteredFaculty = facultyData.filter((f) => {
    const query = searchTerm.toLowerCase().trim();

    if (!query) return true;

    return (
      f?.TeacherName?.toLowerCase().includes(query) ||
      f?.Department?.toLowerCase().includes(query) ||
      f?.Qualification?.toLowerCase().includes(query) ||
      f?.Experience?.toLowerCase().includes(query) ||
      f?.Email?.toLowerCase().includes(query)
    );
  });

  // =========================
  // OPEN MODAL
  // =========================
  const openModal = (faculty) => {
    setSelectedFaculty(faculty);
    document.body.style.overflow = "hidden";
  };

  // =========================
  // CLOSE MODAL
  // =========================
  const closeModal = () => {
    setSelectedFaculty(null);
    document.body.style.overflow = "";
  };

  // =========================
  // OPEN LIGHTBOX
  // =========================
  const openLightbox = (e, image) => {
    e.stopPropagation();
    setLightboxImage(image);
    document.body.style.overflow = "hidden";
  };

  // =========================
  // CLOSE LIGHTBOX
  // =========================
  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = "";
  };

  // =========================
  // ESCAPE KEY
  // =========================
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (lightboxImage) {
          closeLightbox();
        } else if (selectedFaculty) {
          closeModal();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedFaculty, lightboxImage]);

  return (



    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* ================= HEADER ================= */}
        <Header>

        </Header>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">

              <span className="bg-indigo-100 text-indigo-600 p-2.5 rounded-xl">
                <i className="fas fa-chalkboard-user text-xl"></i>
              </span>

              Faculty
            </h1>

            <p className="text-gray-500 text-sm mt-0.5">
              Meet our experienced instructors
            </p>
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">

            <i className="fas fa-search text-gray-400 text-sm"></i>

            <input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-40 sm:w-52 text-gray-700 placeholder-gray-400"
            />

          </div>

        </div>

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Loading faculty...
            </p>
          </div>
        )}

        {/* ================= NO DATA ================= */}

        {!loading && filteredFaculty.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">

            <div className="text-gray-300 text-6xl mb-4">
              <i className="fas fa-user-slash"></i>
            </div>

            <h3 className="text-gray-700 text-xl font-semibold">
              No faculty found
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your search.
            </p>

          </div>
        )}

        {/* ================= GRID ================= */}

        {!loading && filteredFaculty.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredFaculty.map((f) => {

          const image = f?.image
  ? `http://localhost:4000/uploads/${f.image}`
  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
      f?.TeacherName || "Faculty"
    )}&size=400&background=4F46E5&color=fff&bold=true`;

              return (
                <div
                  key={f?._id}
                  onClick={() => openModal(f)}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1"
                >

                  {/* NAME + EXPERIENCE */}

                  <div className="flex items-center gap-2 mb-4">

                    <h3 className="text-xl font-bold text-gray-900">
                      {f?.TeacherName}
                    </h3>

                    <span className="text-indigo-600 font-medium text-sm whitespace-nowrap">
                      ({f?.Experience})
                    </span>

                  </div>

                  {/* IMAGE */}

                  <div className="flex justify-center mb-4">

                   <img
  src={image}
  alt={f?.TeacherName}
  onClick={(e) => openLightbox(e, image)}
  className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-100 cursor-pointer transition-all hover:ring-indigo-300 hover:scale-105"
  loading="lazy"
/>

                  </div>

                  {/* EXPERTISE / FACULTY INFO */}

                  <div className="mt-2">

                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">

                      <i className="fas fa-star text-amber-400 text-[10px]"></i>

                      Qualification

                    </p>

                    <div className="flex flex-wrap gap-2">

                      <span className="bg-gray-50 text-gray-700 text-sm font-medium px-3.5 py-1.5 rounded-full border border-gray-200">
                        {f?.Qualification}
                      </span>

                      <span className="bg-gray-50 text-gray-700 text-sm font-medium px-3.5 py-1.5 rounded-full border border-gray-200">
                        {f?.Department}
                      </span>

                    </div>

                  </div>

                  {/* VIEW PROFILE */}

                  <div className="mt-5 pt-3 border-t border-gray-100 text-sm text-indigo-500 font-medium flex items-center justify-between">

                    <span>
                      View Profile
                    </span>

                    <i className="fas fa-arrow-right text-xs"></i>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* ================= DETAIL MODAL ================= */}

        {selectedFaculty && (

          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            onClick={closeModal}
          >

            <div
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >

              {/* CLOSE */}

              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors text-sm z-10"
              >
                <i className="fas fa-times"></i>
              </button>

              {/* TOP */}

              <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">

                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    selectedFaculty?.TeacherName || "Faculty"
                  )}&size=400&background=4F46E5&color=fff&bold=true`}
                  alt={selectedFaculty?.TeacherName}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-indigo-50 flex-shrink-0 mx-auto sm:mx-0"
                />

                <div className="text-center sm:text-left flex-1">

                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedFaculty?.TeacherName}
                  </h2>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">

                    <span className="text-indigo-600 font-medium text-sm">
                      {selectedFaculty?.Qualification}
                    </span>

                    <span className="hidden sm:inline text-gray-300">
                      •
                    </span>

                    <span className="text-gray-500 text-sm font-medium">
                      ({selectedFaculty?.Experience})
                    </span>

                  </div>

                  <p className="text-gray-500 text-sm mt-1">
                    {selectedFaculty?.Department}
                  </p>

                </div>

              </div>

              <hr className="border-gray-100 my-4" />

              {/* INFORMATION */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

                {/* EMAIL */}

                <div>

                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                    <i className="fas fa-envelope mr-1.5"></i>
                    Email
                  </span>

                  <p className="text-gray-700 font-medium truncate">

                    <a
                      href={`mailto:${selectedFaculty?.Email}`}
                      className="hover:text-indigo-600 transition"
                    >
                      {selectedFaculty?.Email}
                    </a>

                  </p>

                </div>

                {/* PHONE */}

                <div>

                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                    <i className="fas fa-phone mr-1.5"></i>
                    Phone
                  </span>

                  <p className="text-gray-700 font-medium">
                    {selectedFaculty?.PhoneNumber}
                  </p>

                </div>

                {/* DEPARTMENT */}

                <div>

                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                    <i className="fas fa-building mr-1.5"></i>
                    Department
                  </span>

                  <p className="text-gray-700 font-medium">
                    {selectedFaculty?.Department}
                  </p>

                </div>

                {/* GENDER */}

                {/* <div>

                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                    <i className="fas fa-user mr-1.5"></i>
                    Gender
                  </span>

                  <p className="text-gray-700 font-medium">
                    {selectedFaculty?.gender}
                  </p>

                </div> */}

                {/* QUALIFICATION */}

                <div>

                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                    <i className="fas fa-graduation-cap mr-1.5"></i>
                    Qualification
                  </span>

                  <p className="text-gray-700 font-medium">
                    {selectedFaculty?.Qualification}
                  </p>

                </div>

                {/* EXPERIENCE */}

                <div>

                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                    <i className="fas fa-briefcase mr-1.5"></i>
                    Experience
                  </span>

                  <p className="text-gray-700 font-medium">
                    {selectedFaculty?.Experience}
                  </p>

                </div>

              </div>

              <hr className="border-gray-100 my-4" />

              {/* STATUS */}

              <div>

                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                  Status
                </span>

                <div className="mt-2">

                  <span className="inline-block bg-green-50 text-green-700 text-sm font-medium px-4 py-2 rounded-full border border-green-100">
                    {selectedFaculty?.status}
                  </span>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="mt-6 flex flex-wrap gap-2 pt-1">

                <a
                  href={`mailto:${selectedFaculty?.Email}`}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition shadow-sm"
                >
                  <i className="fas fa-envelope"></i>
                  Email
                </a>

                <a
                  href={`tel:${selectedFaculty?.PhoneNumber}`}
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-full transition"
                >
                  <i className="fas fa-phone"></i>
                  Call
                </a>

                <button
                  onClick={closeModal}
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium px-5 py-2.5 rounded-full transition ml-auto"
                >
                  <i className="fas fa-times"></i>
                  Close
                </button>

              </div>

            </div>

          </div>
        )}

        {/* ================= IMAGE LIGHTBOX ================= */}

        {lightboxImage && (

          <div
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
            onClick={closeLightbox}
          >

            <div
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white/70 hover:text-white text-2xl transition"
              >
                <i className="fas fa-times"></i>
              </button>

              <img
                src={lightboxImage}
                alt="Faculty"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />

            </div>

          </div>

        )}

      </div>

    </div>
  );
}