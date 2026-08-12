import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Heart, Users, Music, Trophy, Calendar, 
  ArrowRight, Mail, Phone, MapPin, Clock, Award, 
  Sparkles, Globe, Star, User, Camera, Mic, 
  Palette, Dumbbell, BookOpen, Laptop, Briefcase,
  Film, Coffee, Utensils, Bike, TreePine
} from 'lucide-react';


import Header from '../frontend/Header';
import Footer from '../frontend/Footer';

export default function StudentLife() {
  const activities = [
    { 
      icon: Users, 
      title: 'Student Clubs', 
      description: 'Join various student clubs and organizations to pursue your interests',
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      text: 'text-blue-600'
    },
    { 
      icon: Music, 
      title: 'Cultural Events', 
      description: 'Participate in cultural festivals, music concerts, and dance performances',
      color: 'from-pink-500 to-pink-600',
      bg: 'bg-pink-50',
      text: 'text-pink-600'
    },
    { 
      icon: Trophy, 
      title: 'Sports & Fitness', 
      description: 'Compete in inter-college sports tournaments and fitness activities',
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-50',
      text: 'text-green-600'
    },
    { 
      icon: Calendar, 
      title: 'Workshops & Seminars', 
      description: 'Attend workshops, seminars, and guest lectures by industry experts',
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
      text: 'text-purple-600'
    },
    { 
      icon: Camera, 
      title: 'Photography Club', 
      description: 'Capture moments and showcase your photography skills',
      color: 'from-orange-500 to-orange-600',
      bg: 'bg-orange-50',
      text: 'text-orange-600'
    },
    { 
      icon: Mic, 
      title: 'Debate & Drama', 
      description: 'Participate in debates, drama, and public speaking competitions',
      color: 'from-red-500 to-red-600',
      bg: 'bg-red-50',
      text: 'text-red-600'
    },
  ];

  const upcomingEvents = [
    { title: 'Annual Cultural Fest 2026', date: 'Aug 15-17, 2026', venue: 'Main Auditorium', tag: 'Cultural' },
    { title: 'Inter-College Sports Meet', date: 'Aug 20-22, 2026', venue: 'Sports Complex', tag: 'Sports' },
    { title: 'Tech Symposium 2026', date: 'Aug 25-26, 2026', venue: 'Conference Hall', tag: 'Academic' },
    { title: 'Music Night with DJ', date: 'Aug 28, 2026', venue: 'Open Air Theatre', tag: 'Entertainment' },
  ];

  const clubs = [
    { name: 'Dance Club', icon: Users, members: 45 },
    { name: 'Music Club', icon: Music, members: 38 },
    { name: 'Photography Club', icon: Camera, members: 52 },
    { name: 'Debate Club', icon: Mic, members: 30 },
    { name: 'Sports Club', icon: Trophy, members: 65 },
    { name: 'Art & Design Club', icon: Palette, members: 28 },
    { name: 'Tech Club', icon: Laptop, members: 55 },
    { name: 'Film Club', icon: Film, members: 22 },
  ];

  const facilities = [
    { icon: Coffee, name: 'Student Cafeteria' },
    { icon: BookOpen, name: 'Library' },
    { icon: Laptop, name: 'Computer Labs' },
    { icon: Dumbbell, name: 'Gym & Fitness' },
    { icon: TreePine, name: 'Campus Garden' },
    { icon: Bike, name: 'Bike Parking' },
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
      <Header>
        </Header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
            <Heart className="w-4 h-4" />
            Student Life
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vibrant <span className="text-yellow-300">Campus Life</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Experience a rich and fulfilling student life beyond academics at JAAT University
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg transition">
              <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">50+</p>
              <p className="text-sm text-gray-500">Student Clubs</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg transition">
              <div className="bg-pink-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-7 h-7 text-pink-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">100+</p>
              <p className="text-sm text-gray-500">Annual Events</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg transition">
              <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-7 h-7 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">25+</p>
              <p className="text-sm text-gray-500">Sports Teams</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg transition">
              <div className="bg-purple-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Globe className="w-7 h-7 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">120+</p>
              <p className="text-sm text-gray-500">Nationalities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Student <span className="text-blue-600">Activities</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the diverse range of activities available to our students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, idx) => (
              <div 
                key={idx} 
                className={`${activity.bg} rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:scale-105 transition-all group`}
              >
                <div className={`bg-gradient-to-r ${activity.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <activity.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{activity.title}</h3>
                <p className="text-gray-600 text-sm">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Clubs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Student <span className="text-blue-600">Clubs</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our vibrant student clubs and connect with like-minded peers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {clubs.map((club, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 text-center border border-gray-200 hover:shadow-lg transition">
                <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <club.icon className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-semibold text-gray-900 text-sm">{club.name}</p>
                <p className="text-xs text-gray-500">{club.members} members</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Upcoming <span className="text-blue-600">Events</span>
              </h2>
              <p className="text-gray-600 mt-2">Don't miss out on these exciting events</p>
            </div>
            <button className="text-blue-600 font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{event.title}</h4>
                <p className="text-xs text-gray-500">{event.date}</p>
                <p className="text-xs text-gray-400 mt-1">{event.venue}</p>
                <span className="inline-block mt-3 text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                  {event.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Facilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Campus <span className="text-blue-600">Facilities</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              World-class facilities to support your academic and personal growth
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {facilities.map((facility, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 text-center border border-gray-200 hover:shadow-lg transition">
                <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <facility.icon className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">{facility.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What <span className="text-yellow-300">Students</span> Say
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Hear from our students about their campus life experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex text-yellow-400 text-sm mb-3">
                {'★'.repeat(5)}
              </div>
              <p className="text-white text-sm mb-4">"The campus life at Manipal is incredible! So many clubs and events to participate in."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400 text-blue-900 flex items-center justify-center font-bold">
                  AK
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Ananya Kumar</p>
                  <p className="text-blue-200 text-xs">MBA Student</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex text-yellow-400 text-sm mb-3">
                {'★'.repeat(5)}
              </div>
              <p className="text-white text-sm mb-4">"I've made amazing friends through the sports clubs and cultural events."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400 text-blue-900 flex items-center justify-center font-bold">
                  RS
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Rahul Singh</p>
                  <p className="text-blue-200 text-xs">MCA Student</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex text-yellow-400 text-sm mb-3">
                {'★'.repeat(5)}
              </div>
              <p className="text-white text-sm mb-4">"The workshops and guest lectures have been incredibly valuable for my career."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400 text-blue-900 flex items-center justify-center font-bold">
                  PP
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Priya Patel</p>
                  <p className="text-blue-200 text-xs">MSc Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Our <span className="text-blue-600">Student Community</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Become part of a vibrant community of learners and leaders
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/admissions" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition flex items-center gap-2">
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/programs" className="bg-gray-100 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition flex items-center gap-2">
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}