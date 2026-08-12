



















import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from '../frontend/Header';
import Footer from '../frontend/Footer';

import { ViewAllCourse, ViewProgramOne } from '../../Service/frontend/Course'
import { ViewAllEvent, ViewOneEvent } from '../../Service/frontend/Event'
import{ViewAllPalcment} from '../../Service/frontend/palcment'
import studentImage from "../../assets/student.jpg";
import {
  GraduationCap,
  Calendar,
  Bell,
  Search,
  Users,
  BookOpen,
  Menu,
  X,
  User,
  Award,
  FileText,
  Star,
  Shield,
  Sparkles,
  Heart,
  Trophy,
  Globe,
  Book,
  Laptop,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  PlayCircle,
  TrendingUp,
  Users as UsersIcon,
  Clock,
  Quote,
  DollarSign,
  Headphones,
  Crown,
  Music,
  CloudDownload
} from 'lucide-react';




export default function Home() {
  const [event, setEvent] = useState([])
  const [programs, setPrograms] = useState([])
  const [placement, setPlacement] = useState([]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Navigation items with routes
  const navItems = [
    { label: 'Programs', icon: Book, dropdown: true, path: '/programs' },
    { label: 'About Us', icon: UsersIcon, path: '/about' },
    { label: 'Admissions', icon: FileText, path: '/addmissions' },
    { label: 'Student Life', icon: Heart, path: '/student-life' },
    { label: 'Placements', icon: Briefcase, path: '/placements' },
    { label: 'Contact', icon: Mail, path: '/contact' },
  ];



  // Features
  const features = [
    { icon: GraduationCap, title: 'UGC-Entitled', description: 'All programs are UGC recognized and approved', color: 'text-blue-600' },
    { icon: Laptop, title: 'Learn Anywhere', description: 'Access your courses from anywhere, anytime', color: 'text-purple-600' },
    { icon: Users, title: 'Expert Faculty', description: 'Learn from industry experts and academicians', color: 'text-green-600', path:'/faculty-deatials'},
    { icon: Award, title: 'Global Recognition', description: 'Degrees recognized worldwide', color: 'text-orange-600' },
  ];

  // Testimonials
  const testimonials = [
    { name: 'Rahul Sharma', course: 'MBA Graduate', quote: 'The online MBA program helped me balance work and study effectively.', rating: 5, image: 'RS' },
    { name: 'Priya Patel', course: 'MCA Student', quote: 'Excellent faculty support and industry-relevant curriculum.', rating: 5, image: 'PP' },
    { name: 'Amit Kumar', course: 'MSc Graduate', quote: 'Flexible learning schedule and great placement support.', rating: 5, image: 'AK' },
  ];

  // News/Events
  const newsItems = [
    { eventtitle: 'Admissions Open for 2026', event_date: 'July 15, 2026', tag: 'Admissions', color: 'bg-blue-100 text-blue-700' },
    { title: 'Webinar on Career Growth', date: 'July 20, 2026', tag: 'Webinar', color: 'bg-purple-100 text-purple-700' },
    { title: 'Placement Drive 2026', date: 'July 25, 2026', tag: 'Placement', color: 'bg-green-100 text-green-700' },
  ];

  // Social media icons
  const socialIcons = [
    { icon: Globe, label: 'Website', color: 'hover:text-blue-400' },
    { icon: Mail, label: 'Email', color: 'hover:text-blue-400' },
    { icon: Phone, label: 'Phone', color: 'hover:text-blue-400' },
    { icon: Music, label: 'Social', color: 'hover:text-blue-400' },
  ];
  const colorClass = {
    Admissions: "bg-blue-100 text-blue-700",
    Webinar: "bg-purple-100 text-purple-700",
    Placement: "bg-green-100 text-green-700",
    Sports: "bg-red-100 text-red-700",
  }


  useEffect(() => {
    handleViewAllProgram();
    handleEventView()
    handeleViewPlacement()
  }, []);
  const handleViewAllProgram = async () => {
  try {
    const res = await ViewAllCourse();

    console.log("COURSES:", res);

    if (Array.isArray(res)) {
      setPrograms(res);
    } else {
      setPrograms([]);
    }

  } catch (error) {
    console.log("COURSE ERROR:", error);
    setPrograms([]);
  }
};

  const handleViewProgramOne = async (id) => {
    try {
      const res = await ViewProgramOne(id)
      console.log(res.data);
      if (res.status) {
        setPrograms(res.data)

      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleEventView = async () => {
    try {
      const res = await ViewAllEvent()
      console.log("Full Response:", res);

      console.log(res)

      if (res.status) {

        setEvent(res.data)
      }

    } catch (error) {
      console.log(error)
    }
  }


  const handleViewOneEvent = async (id) => {
    try {
      const res = await ViewOneEvent(id)
      console.log(res.data);
      if (res.status) {
        setEvent(res.data)

      }
    } catch (error) {
      console.log(error)
    }
  }

  const handeleViewPlacement=async ()=>{
  try {
    const res=await ViewAllPalcment()
    console.log(res.data)
    if(res.status){
     setEvent(res.data)

  } 
  }catch (error) {
    console.log(error)
  }
}



  return (
    <div className="min-h-screen bg-white">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-1.5 px-4 text-center text-xs md:text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="bg-yellow-400 text-blue-900 px-2 py-0.5 rounded font-bold text-[10px]">NEW</span>
          Admissions Open for 2026 - Apply Now!
          <ArrowRight className="w-3 h-3 inline" />
        </span>
      </div>

      {/* HEADER */}
      <Header>
        
      </Header>

      {/* ===== HERO SECTION ===== */}
      {/* ===== HERO SECTION WITH VIDEO BACKGROUND ===== */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/jaat-university-hero.mp4" type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <img src="/images/hero-fallback.jpg" alt="JAAT University" className="w-full h-full object-cover" />
          </video>
          {/* Dark overlay for text readability */}
 <div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url(${studentImage})`,
  }}
>
  <div className="absolute inset-0 bg-black/50"></div>
</div>

              {/* <div className="absolute inset-0 bg-black/50"></div> */}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-blue-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                UGC-Entitled University
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Education That Powers
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Your Ambition
                </span>
              </h1>
              <p className="text-lg text-gray-200 mb-8 max-w-lg">
                Online degrees & courses from <span className="font-semibold text-blue-400">JAAT University</span>.
                Learn from anywhere, anytime.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to='/addmissionPage' className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full text-base font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center gap-2 cursor-pointer">
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                {/* Video Play Button - opens modal */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <PlayCircle className="w-5 h-5" />
                  Watch Video
                </button>
              </div>

              {/* ================= VIDEO MODAL ================= */}
{isVideoModalOpen && (
  <div
    className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
    onClick={() => setIsVideoModalOpen(false)}
  >

    {/* Video Container */}
    <div
      className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >

      {/* Close Button */}
      <button
        onClick={() => setIsVideoModalOpen(false)}
        className="absolute top-3 right-3 z-10 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl transition"
      >
        ×
      </button>

      {/* YouTube Video */}
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/LlCwHnp3kL4?autoplay=1&rel=0"
        title="JAAT University Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

    </div>
  </div>
)}

              {/* Trust Badges */}
              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-white">4.8/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-white">50K+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium text-white">NAAC A+</span>
                </div>
              </div>
            </div>

            {/* Right Content - Keep your existing programs grid */}
            <div className="relative">
              {/* Your existing program cards here */}
              <div className="bg-gradient-to-br from-blue-600/90 to-purple-600/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {programs.map((program, idx) => (
                      <div
                        key={idx}
                        className={`bg-gradient-to-r ${program.color} p-4 rounded-xl text-white transform hover:scale-105 transition-all cursor-pointer`}
                      >
                        <GraduationCap className="w-6 h-6 mb-2" />
                        <h4 className="font-semibold text-sm">{program.courseName}</h4>
                        <p className="text-xs opacity-80">{program.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">JAAT University</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience quality education with flexibility and global recognition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <Link
                key={idx}
                  to={feature.path}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
              >
                <div className={`${feature.color} bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS SECTION ===== */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our <span className="text-blue-600">Programs</span>
              </h2>
              <p className="text-gray-600 mt-2">
                Choose from a wide range of online degrees
              </p>
            </div>

            <Link
              to="/programs"
              className="text-blue-600 font-medium hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs?.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.courseName}
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                  {item.courseType}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-600">
                    Duration: {item.duration}
                  </span>

                  <span className="text-lg font-bold text-blue-600">
                    ₹{item.fees}
                  </span>
                </div>

                <Link
                  to={`/program/${item._id}`}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-600 hover:text-white transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWS & EVENTS SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                News & <span className="text-blue-600">Events</span>
              </h2>
              <p className="text-gray-600 mt-2">Stay updated with the latest happenings</p>
            </div>
            <button className="text-blue-600 font-medium hover:underline flex items-center gap-1 cursor-pointer">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


            {event.map((item, _idx) => (
              console.log(item.color),
              <div key={_idx} className="bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 mb-3">
                  {item.tag}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.eventTitle}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {item.event_date}
                </p>
                <Link to={`/event/${item._id}`} className="mt-4 inline-flex items-center gap-1 text-blue-600 font-medium text-sm hover:underline cursor-pointer">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our <span className="text-yellow-400">Students</span> Say
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Hear from our successful graduates and current students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <Quote className="w-8 h-8 text-yellow-400 mb-4" />
                <p className="text-white mb-4 text-sm leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-yellow-400 text-blue-900 flex items-center justify-center font-bold text-lg">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-blue-200 text-xs">{testimonial.course}</p>
                    <div className="flex text-yellow-400 text-sm">
                      {'★'.repeat(testimonial.rating)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Power Your <span className="text-blue-600">Ambition</span>?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students who have transformed their careers with Online Manipal
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full text-base font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center gap-2 cursor-pointer">
              Apply Now <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-gray-100 text-gray-700 px-8 py-4 rounded-full text-base font-semibold hover:bg-gray-200 transition-all flex items-center gap-2 cursor-pointer">
              <Headphones className="w-5 h-5" />
              Talk to Advisor
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">JAAT University</h3>
                  <p className="text-xs text-gray-400">UGC-Entitled</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Empowering careers through quality online education since 1953.
              </p>
              <div className="flex gap-4">
                {socialIcons.map((social, idx) => (
                  <button
                    key={idx}
                    className={`text-gray-400 ${social.color} transition cursor-pointer`}
                    onClick={() => { }}
                  >
                    <social.icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
                <li><Link to="/programs" className="hover:text-blue-400 transition">Programs</Link></li>
                <li><Link to="/addmissions" className="hover:text-blue-400 transition">Addmissions</Link></li>
                <li><Link to="/placements" className="hover:text-blue-400 transition">Placements</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-white font-semibold mb-4">Our Programs</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/program/mba" className="hover:text-blue-400 transition">Online MBA</Link></li>
                <li><Link to="/program/mca" className="hover:text-blue-400 transition">Online MCA</Link></li>
                <li><Link to="/program/msc" className="hover:text-blue-400 transition">Online MSc</Link></li>
                <li><Link to="/program" className="hover:text-blue-400 transition">Online MA</Link></li>
                <li><Link to="/program" className="hover:text-blue-400 transition">Online M.Com</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 mt-0.5" />
                  <span>JAAT,University,Jaipur, India</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+91 0000400005</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>admissions@JAAT.edu</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© 2026 JAAT.University All rights reserved. | UGC-Entitled University</p>
          </div>
        </div>
      </footer>
    </div>
  );
}