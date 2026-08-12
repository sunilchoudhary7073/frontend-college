import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../frontend/Header';
import Footer from '../frontend/Footer';


import { 
  GraduationCap, Award, Users, Globe, TrendingUp, Shield, 
  Target, Eye, Heart, Lightbulb, Trophy, Mail, Phone, 
  MapPin, Clock, ArrowRight, Crown, Sparkles, UserCog,
  BookOpen, Laptop, Briefcase, Star, CheckCircle
} from 'lucide-react';

export default function About() {
  const stats = [
    { number: '70+', label: 'Years of Excellence', icon: Award },
    { number: '50K+', label: 'Students Empowered', icon: Users },
    { number: '120+', label: 'Countries Reached', icon: Globe },
    { number: '95%', label: 'Placement Rate', icon: TrendingUp },
  ];

  const values = [
    { icon: Trophy, title: 'Excellence', description: 'Striving for excellence in education and research' },
    { icon: Lightbulb, title: 'Innovation', description: 'Embracing technology for innovative learning' },
    { icon: Shield, title: 'Integrity', description: 'Maintaining integrity in all our endeavors' },
    { icon: Heart, title: 'Inclusivity', description: 'Providing inclusive education for all' },
  ];

  const team = [
    { name: 'Dr. Rajesh Kumar', role: 'Vice Chancellor', dept: 'Administration', image: 'RK' },
    { name: 'Prof. Priya Sharma', role: 'Dean Academics', dept: 'Computer Science', image: 'PS' },
    { name: 'Dr. Amit Patel', role: 'Head of Department', dept: 'Management', image: 'AP' },
    { name: 'Prof. Sneha Reddy', role: 'Senior Faculty', dept: 'Mathematics', image: 'SR' },
  ];

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
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
            <Shield className="w-4 h-4" />
            About Us
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-yellow-300">JAAT University</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Empowering careers through quality education since 1953
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-7 h-7 text-blue-600" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-gray-900">{stat.number}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our <span className="text-blue-600">Mission & Vision</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be a global leader in online education, empowering learners worldwide 
                with quality, accessible, and innovative educational programs.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide UGC-entitled, industry-relevant online degrees that combine 
                academic excellence with practical skills for career success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Core <span className="text-blue-600">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Leadership <span className="text-blue-600">Team</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center border border-gray-200 hover:shadow-xl transition">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.image}
                </div>
                <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                <p className="text-xs text-gray-500 mt-1">{member.dept}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join the <span className="text-yellow-300">Manipal</span> Family
          </h2>
          <p className="text-blue-100 mb-8">Start your journey towards a successful career</p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition">
            Apply Now <ArrowRight className="w-5 h-5 inline ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© 2026 JAAT,University. All rights reserved.</p>
        </div>
      </footer> */}

      <Footer> </Footer>
    </div>
  );
}