
const getAllDepartments = (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: "Computer Science" },
      { id: 2, name: "Mechanical" },
      { id: 3, name: "Electrical" },
    ],
  });
};

const getDepartmentById = (req, res) => {
  const { id } = req.params;

  res.json({
    success: true,
    data: {
      id,
      name: "Computer Science",
      departmentDetails: "Details about department",
      facultyMembers: ["Dr. Arun", "Dr. Rakshit"],
      activities: ["Seminar", "Workshop", "Hackathon"],
    },
  });
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
};