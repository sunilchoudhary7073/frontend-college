import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Music
} from 'lucide-react';

export default function Footer() {
  // Social media icons
  const socialIcons = [
    { icon: Globe, label: 'Website', color: 'hover:text-blue-400' },
    { icon: Mail, label: 'Email', color: 'hover:text-blue-400' },
    { icon: Phone, label: 'Phone', color: 'hover:text-blue-400' },
    { icon: Music, label: 'Social', color: 'hover:text-blue-400' },
  ];

  return (
    <div>
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
                    onClick={() => {}}
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
                <li><Link to="/addmissions" className="hover:text-blue-400 transition">Admissions</Link></li>
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
                <li><Link to="/program/ma" className="hover:text-blue-400 transition">Online MA</Link></li>
                <li><Link to="/program/mcom" className="hover:text-blue-400 transition">Online M.Com</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 mt-0.5" />
                  <span>JAAT University, Jaipur, India</span>
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
            <p>© 2026 JAAT University. All rights reserved. | UGC-Entitled University</p>
          </div>
        </div>
      </footer>
    </div>
  );
}