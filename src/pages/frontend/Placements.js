import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../frontend/Header';
import Footer from '../frontend/Footer';
import { 
  GraduationCap, TrendingUp, Users, Briefcase, Award, 
  ArrowRight, Mail, Phone, MapPin, Clock, CheckCircle,
  DollarSign, Globe, FileText, User, Building2, 
  Cloud, ShoppingBag, Code, Database, Sparkles, 
  Rocket, Zap, Crown
} from 'lucide-react';

export default function Placements() {
  const stats = [
    { number: '95%', label: 'Placement Rate', icon: TrendingUp, color: 'text-green-600' },
    { number: '120+', label: 'Companies Hired', icon: Briefcase, color: 'text-blue-600' },
    { number: '50K+', label: 'Alumni Network', icon: Users, color: 'text-purple-600' },
    { number: '₹25 LPA', label: 'Highest Package', icon: Award, color: 'text-orange-600' },
  ];

  // Companies with Lucide icons
  const companies = [
    { name: 'Google', icon: Cloud, color: 'from-red-400 to-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    { name: 'Microsoft', icon: Code, color: 'from-blue-500 to-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
    { name: 'Amazon', icon: ShoppingBag, color: 'from-orange-400 to-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
    { name: 'Flipkart', icon: Zap, color: 'from-yellow-400 to-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    { name: 'Tata Consultancy', icon: Building2, color: 'from-indigo-500 to-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200' },
    { name: 'Infosys', icon: Database, color: 'from-cyan-500 to-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-200' },
    { name: 'Wipro', icon: Rocket, color: 'from-sky-500 to-sky-700', bg: 'bg-sky-50', border: 'border-sky-200' },
    { name: 'Accenture', icon: Crown, color: 'from-purple-500 to-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
  ];

  const processSteps = [
    { title: 'Registration', description: 'Register for placement drive', icon: FileText },
    { title: 'Interview', description: 'Face interviews & assessments', icon: User },
    { title: 'Placement', description: 'Get placed with top companies', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
   <Header></Header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Placement <span className="text-yellow-300">Success</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Our students get placed in top companies across the globe
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className={`${stat.color} w-14 h-14 rounded-2xl bg-opacity-10 flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.number}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Top <span className="text-blue-600">Recruiters</span>
            </h2>
            <p className="text-gray-600 mt-2">Our students have been hired by leading companies</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {companies.map((company, idx) => (
              <div 
                key={idx} 
                className={`${company.bg} rounded-2xl p-6 text-center border-2 ${company.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
              >
                <div className={`bg-gradient-to-r ${company.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-110 transition`}>
                  <company.icon className="w-8 h-8" />
                </div>
                <p className="font-semibold text-gray-900 text-sm md:text-base">{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Placement <span className="text-blue-600">Process</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your <span className="text-yellow-300">Career</span>?
          </h2>
          <p className="text-blue-100 mb-8">Join our placement-driven programs</p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition inline-flex items-center gap-2">
            Explore Programs <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}