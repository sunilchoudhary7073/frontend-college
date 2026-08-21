import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================= FRONTEND =================

import Home from "./pages/frontend/Home";
import About from "./pages/frontend/About";
import Programs from "./pages/frontend/Programs.js";
import Addmission from "./pages/frontend/Addmissions.js";
import InquiryPage from "./pages/frontend/InquiryPage.js";
import Placements from "./pages/frontend/Placements";
import Contact from "./pages/frontend/Contact";
import StudentLife from "./pages/frontend/StudentLife";
import Login from "./pages/frontend/Login.js";
import ForgotPassword from "./pages/frontend/ForgotPassword.js";
import Profile from "./pages/frontend/Profile.js";
import Register from "./pages/frontend/Register";
import ProgramDetails from "./pages/frontend/ProgramDeatials.js";
import EventDetail from "./pages/frontend/EventDetail.js";
import EventRegister from "./pages/frontend/EventRegister.js";
import AdmissionApplication from "./pages/frontend/AdmissionApplication.js";
import Faculty from "./pages/frontend/Faculty.js";


// ================= ADMIN =================

import AdminLayout from "./Components/Layout";
import AdminLogin from "./Components/Login";
import AdminProtectedRoute from "./Components/AdminProtectedRoute";

// Dashboard
import Deshboard from "./pages/admin/Deshboard.js/index.js";

// Teacher
import TeacherList from "./pages/admin/Teacher";
import TeacherAdd from "./pages/admin/Teacher/Add";
import TeacherEdit from "./pages/admin/Teacher/edit";

// Student
import StudentList from "./pages/admin/Student/index";
import Studentadd from "./pages/admin/Student/add";
import StudentEdit from "./pages/admin/Student/edit";

// Course
import Courseadd from "./pages/admin/Course/add";
import CourseEdit from "./pages/admin/Course/Edit";
import CourseList from "./pages/admin/Course/index";

// Fees
import Feesadd from "./pages/admin/fees/add";
import FeesEdit from "./pages/admin/fees/edit";
import FeesList from "./pages/admin/fees/index";

// Batch
import BatchList from "./pages/admin/Batch/index";
import BatchAdd from "./pages/admin/Batch/Add";

// Admission
import AddmissionList from "./pages/admin/Addmission/index.js";
import AddmissionAdd from "./pages/admin/Addmission/add.js";
import EditAddmission from "./pages/admin/Addmission/Edit.js";

// Event
import AddEvent from "./pages/admin/Event/Add.js";
import EventList from "./pages/admin/Event/index.js";

// Notice
import NoticeList from "./pages/admin/Notice/index.js";
import Addnotice from "./pages/admin/Notice/add.js";

// Contact
import ContactList from "./pages/admin/Contact/index.js";

// Placement
import PlacementList from "./pages/admin/Placement/index.js";
import AddPlacment from "./pages/admin/Placement/Add.js";

// Assign Course
import AssignCourseList from "./pages/AssineCourse/index.js";
import CourseAssineAdd from "./pages/AssineCourse/Add.js";
import CourseAssineEdit from "./pages/AssineCourse/Edit.js";

// Subject
import SubjectList from "./pages/admin/Subject/index.js";
import AddSubjects from "./pages/admin/Subject/Add.js";
import SubjectsEdit from "./pages/admin/Subject/Edit.js";


function App() {
  return (
    <BrowserRouter>

      <Routes>


        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route
          path="/programs"
          element={<Programs />}
        />

        <Route path="/addmissions"element={<Addmission />}/>

        <Route path="/inquiryPage"element={<InquiryPage />}/>

        <Route path="/admission-application"element={<AdmissionApplication />}/>
 

        <Route path="/placements" element={<Placements />} />

        <Route path="/contact"element={<Contact />}/>

        <Route path="/student-life" element={<StudentLife />} />

        <Route path="/login"element={<Login />}/>

         <Route path="/forgot-password"element={<ForgotPassword />}/>

        <Route path="/profile"element={<Profile />}/>

        <Route path="/register" element={<Register />}/>

        <Route path="/program/:id"element={<ProgramDetails />}/>

        <Route path="/event/:id"element={<EventDetail />}/>

        <Route path="/register/:id"element={<EventRegister />}/>

        <Route path="/faculty-deatials"element={<Faculty />}/>


       

        <Route path="/admin/login" element={<AdminLogin />}/>

     

<Route path="/admin" element={<AdminProtectedRoute />}>

  <Route element={<AdminLayout />}>

  

    <Route path="deshboard"element={<Deshboard />}/>




    <Route path="Teacher"element={<TeacherList />}/>

    <Route path="Teacher/add"element={<TeacherAdd />}/>

    <Route path="Teacher/edit/:id"element={<TeacherEdit />}/>


   

    <Route path="student"element={<StudentList />}/>

    <Route path="student/add"element={<Studentadd />}/>

    <Route path="student/edit/:id"element={<StudentEdit />}/>


   

    <Route path="Course" element={<CourseList />}/>

    <Route path="Course/add"element={<Courseadd />}/>

    <Route path="Course/edit/:id" element={<CourseEdit />}/>



    <Route path="subject"element={<SubjectList />}/>

    <Route path="subject/add"element={<AddSubjects />}/>

    <Route path="subject/edit/:id"element={<SubjectsEdit />}/>




    <Route path="fees" element={<FeesList />}/>

    <Route path="fees/add"element={<Feesadd />}/>

    <Route path="fees/edit/:id"element={<FeesEdit />}/>




    <Route path="Batch"element={<BatchList />}/>

    <Route path="Batch/add"element={<BatchAdd />}/>




    <Route path="addmissions"element={<AddmissionList />}/>

    <Route path="addmissions/add" element={<AddmissionAdd />}/>

    <Route path="addmissions/edit/:id"element={<EditAddmission />} />




    <Route path="Event"element={<EventList />}/>

    <Route path="Event/add" element={<AddEvent />}/>




    <Route path="notice"element={<NoticeList />}/>

    <Route path="notice/add"  element={<Addnotice />} />




    <Route path="contact"element={<ContactList />}/>



    <Route path="placment"element={<PlacementList />}/>

    <Route path="placment/add" element={<AddPlacment />}/>


   
   

    <Route path="assine-course" element={<AssignCourseList />}/>

    <Route path="assine-course/add"element={<CourseAssineAdd />}/>
    <Route path="assine-course/edit/:id"element={<CourseAssineEdit />}/>

  </Route>

</Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;



// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Header from "../src/pages/frontend/Header.js";
// import Footer from "../src/pages/frontend/Footer.js";

// import AdminLayout from "./Components/Layout";



// import Deshboard from "./pages/admin/Deshboard.js/index.js";

// import TeacherList from "./pages/admin/Teacher";
// import TeacherAdd from "./pages/admin/Teacher/Add";
// import TeacherEdit from "./pages/admin/Teacher/edit";


// import StudentList from "./pages/admin/Student/index";
// import Studentadd from "./pages/admin/Student/add";
// import StudentEdit from "./pages/admin/Student/edit";

// import Courseadd from './pages/admin/Course/add'
// import CourseEdit from './pages/admin/Course/Edit'
// import CourseList from './pages/admin/Course/index'

// import Feesadd from './pages/admin/fees/add'
// import FeesEdit from './pages/admin/fees/edit'
// import FeesList from './pages/admin/fees/index'

// import BatchList from "./pages/admin/Batch/index";
// import BatchAdd from './pages/admin/Batch/Add'

// import AddmissionList from "./pages/admin/Addmission/index.js";
// import AddmissionAdd from "./pages/admin/Addmission/add.js";
// import EditAddmission from "./pages/admin/Addmission/Edit.js";

// import AddEvent from "./pages/admin/Event/Add.js";
// import EventList from './pages/admin/Event/index.js'

// import NoticeList from "./pages/admin/Notice/index.js";
// import Addnotice from "./pages/admin/Notice/add.js";
// import ContactList from "./pages/admin/Contact/index.js";


// import PlacementList from "./pages/admin/Placement/index.js";
// import AddPlacment from "./pages/admin/Placement/Add.js";



// import AssignCourseList from "./pages/AssineCourse/index.js";
// import CourseAssineAdd from "./pages/AssineCourse/Add.js";

// import SubjectList from './pages/admin/Subject/index.js'

// import AddSubjects from './pages/admin/Subject/Add.js'
// import SubjectsEdit from './pages/admin/Subject/Edit.js'

// import AdminLogin from "./Components/Login";
// import AdminProtectedRoute from "./Components/AdminProtectedRoute";


// import Home from './pages/frontend/Home';
// import About from './pages/frontend/About';
// import Programs from "./pages/frontend/Programs.js";
// import Addmission from "./pages/frontend/Addmissions.js";
// import InquiryPage from "./pages/frontend/InquiryPage.js";
// import Placements from './pages/frontend/Placements';
// import Contact from './pages/frontend/Contact';
// import StudentLife from './pages/frontend/StudentLife';
// import Login from './pages/frontend/Login.js';
// import Profile from "./pages/frontend/Profile.js";
// import Register from './pages/frontend/Register';
// import ProgramDetails from "./pages/frontend/ProgramDeatials.js";
// import EventDetail from "./pages/frontend/EventDetail.js";
// import EventRegister from "./pages/frontend/EventRegister.js";
// import AdmissionApplication from "./pages/frontend/AdmissionApplication.js";
// import Faculty from "./pages/frontend/Faculty.js";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>




//         <Route >

//           <Route path="" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/programs" element={<Programs />} />
//           <Route path="/addmissions" element={<Addmission />} />

//           <Route path="/inquiryPage" element={<InquiryPage />} />
//           <Route path="/admission-application" element={<AdmissionApplication />} />

//           <Route path="/placements" element={<Placements />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/student-life" element={<StudentLife />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/program/:id" element={<ProgramDetails />} />
//           <Route path="/event/:id" element={<EventDetail />} />
//           <Route path="/register/:id" element={<EventRegister />} />
//           <Route path="/faculty-deatials" element={<Faculty />} />





//         </Route>



        



//              <Route path="/admin" element={<AdminLayout />}>
//          <Route path="deshboard" element={<Deshboard />}></Route>









//           <Route path="Teacher" element={<TeacherList />} />

//           <Route path="Teacher/add" element={<TeacherAdd />} />

//           <Route path="Teacher/edit/:id" element={<TeacherEdit />} />

//           <Route path="student/add" element={<Studentadd />} />

//           <Route path="student/edit/:id" element={<StudentEdit />} />

//           <Route path="student" element={<StudentList />} />
          
          

//           <Route path="Course/add" element={<Courseadd />} />
//           <Route path="Course/edit/:id" element={<CourseEdit />} />           
//           <Route path="Course" element={<CourseList />} />


//            <Route path="subject" element={<SubjectList />} />
//             <Route path="subject/add" element={<AddSubjects />} />
//             <Route path="subject/edit/:id" element={<SubjectsEdit />} />



//           <Route path="fees/add" element={<Feesadd />} />
//           <Route path="fees/edit/:id" element={<FeesEdit />} />
//           <Route path="fees" element={<FeesList />} />

//           <Route path="Batch/add" element={<BatchAdd />} />

//           <Route path="Batch" element={<BatchList />} />

//           <Route path="addmissions/add" element={<AddmissionAdd />} />

//           <Route path="addmissions/edit/:id" element={<EditAddmission />} />

//           <Route path="addmissions" element={<AddmissionList />} />

//           <Route path="Event/add" element={<AddEvent />} />

//           <Route path="Event" element={<EventList />} />

//           <Route path="notice/add" element={<Addnotice />} />

//           <Route path="notice" element={<NoticeList />} />

//           <Route path="contact" element={<ContactList />} />

//           <Route path="placment" element={<PlacementList />} />
//           <Route path="placment/add" element={<AddPlacment />} />

//           <Route path="assine-course"element={<AssignCourseList/>}/>
//              <Route path="assine-course/add"element={<CourseAssineAdd/>}/>

              


//           <Route path="/admin" element={<AdminLogin />} /> 

//           </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;