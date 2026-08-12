import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ViewProgramOne } from "../../Service/frontend/Course";

const ProgramDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const res = await ViewProgramOne(id);

        console.log("API Response:", res);

        if (res.status) {
          setProgram(res);
        } else {
          setProgram(null);
        }
      } catch (error) {
        console.log("Error:", error);
        setProgram(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProgramDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!program) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Program not found
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4">

   

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-8">
            <h1 className="text-4xl font-bold">
              {program.courseName}
            </h1>

            <p className="mt-2 text-blue-100">
              {program.courseType}
            </p>
          </div>

          <div className="p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="border rounded-xl p-5">
                <h3 className="font-semibold text-lg mb-2">
                  Course Code
                </h3>

                <p>{program.courseCode}</p>
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="font-semibold text-lg mb-2">
                  Duration
                </h3>

                <p>{program.duration}</p>
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="font-semibold text-lg mb-2">
                  Department
                </h3>

                <p>{program.department}</p>
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="font-semibold text-lg mb-2">
                  Total Semester
                </h3>

                <p>{program.totalSemester}</p>
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="font-semibold text-lg mb-2">
                  Course Type
                </h3>

                <p>{program.courseType}</p>
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="font-semibold text-lg mb-2">
                  Fees
                </h3>

                <p className="text-blue-600 font-bold text-xl">
                  ₹ {program.fees || "N/A"}
                </p>
              </div>

            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-3">
                Course Description
              </h2>

              <p className="text-gray-700 leading-8">
                {program.description}
              </p>
            </div>

            <div className="mt-10 flex gap-4">

              <button
                onClick={() => navigate("/addmissionPage")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                Apply Now
              </button>

              <button
                onClick={() => navigate(-1)}
                className="border border-gray-300 px-8 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Back
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProgramDetails;