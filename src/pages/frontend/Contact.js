import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../frontend/Header';
import Footer from '../frontend/Footer';
import{ContactAdd} from '../../Service/frontend/Contact'
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  User,
  Send,
  MessageSquare,
} from "lucide-react";
import {
  FaFacebookF as Facebook,
  FaTwitter as Twitter,
  FaInstagram as Instagram,
  FaLinkedinIn as Linkedin,
  FaYoutube as Youtube,
} from "react-icons/fa";

export default function Contact() {

  const [contact,setContact]=useState([])
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const contactInfo = [
    { icon: MapPin, label: 'Address', value: 'JAAT University, Jaipur, India' },
    { icon: Phone, label: 'Phone', value: '+91 0000500004' },
    { icon: Mail, label: 'Email', value: 'admissions@Jaat.edu' },
    { icon: Clock, label: 'Working Hours', value: 'Mon-Sat: 9:00 AM - 6:00 PM' },
  ];


 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await ContactAdd(formData);

    console.log(res);

    if (res.status) {
      alert("Message sent successfully!");

      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong!");
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
            <Link to="/Home" className="text-blue-600 hover:underline flex items-center gap-1">
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
            Get in <span className="text-yellow-300">Touch</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We're here to help you with any questions about our programs
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="text-gray-900 font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-4">Follow Us</p>
                <div className="flex flex-wrap gap-3">
                  <button className="p-3 bg-blue-50 rounded-full hover:bg-blue-100 transition">
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </button>
                  <button className="p-3 bg-blue-50 rounded-full hover:bg-blue-100 transition">
                    <Twitter className="w-5 h-5 text-blue-600" />
                  </button>
                  <button className="p-3 bg-pink-50 rounded-full hover:bg-pink-100 transition">
                    <Instagram className="w-5 h-5 text-pink-600" />
                  </button>
                  <button className="p-3 bg-blue-50 rounded-full hover:bg-blue-100 transition">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </button>
                  <button className="p-3 bg-red-50 rounded-full hover:bg-red-100 transition">
                    <Youtube className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Admission Inquiry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
                {isSubmitted && (
                  <div className="bg-green-50 text-green-700 p-3 rounded-xl text-center font-medium">
                    ✅ Message sent successfully!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-200 rounded-3xl h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">Find us on Google Maps</p>
              <p className="text-sm text-gray-400">JAAT University, Jaipur, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to <span className="text-yellow-300">Apply</span>?
          </h2>
          <p className="text-blue-100 mb-8">Start your journey with JAAT University today</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/admissions" className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition">
              Apply Now <ArrowRight className="w-5 h-5 inline ml-2" />
            </Link>
            <Link to="/programs" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition">
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© 2026 JAAT University. All rights reserved. | UGC-Entitled University</p>
        </div>
      </footer> */}
      <Footer></Footer>
    </div>
  );
}