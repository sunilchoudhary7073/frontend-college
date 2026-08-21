


const getAboutData = (req, res) => {
  res.json({
    success: true,
    data: {
      collegeIntroduction:
        "This is a premier college focused on quality education and innovation.",

      vision: "To become a global leader in education and research.",

      mission:
        "To provide quality education and develop skilled professionals.",

      history:
        "Established in 1995, the college has grown significantly over the years.",

      infrastructure:
        "Well-equipped labs, library, smart classrooms, and sports facilities.",

      managementTeam: [
        { name: "Dr. Sharma", position: "Principal" },
        { name: "Mr. Verma", position: "Director" },
      ],
    },
  });
};

module.exports = {
  getAboutData,
};