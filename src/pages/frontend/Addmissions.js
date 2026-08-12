import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../frontend/Header'
import Footer from '../frontend/Footer'
import { 
  GraduationCap, ArrowRight, CheckCircle, FileText, 
  Calendar, User, DollarSign, Mail, Phone, MapPin, Clock
} from 'lucide-react';

export default function Addmission() {
  const steps = [
    { step: 1, title: 'Fill Application Form', description: 'Complete the online application form with your details', icon: FileText },
    { step: 2, title: 'Submit Documents', description: 'Upload academic transcripts and other required documents', icon: CheckCircle },
    { step: 3, title: 'Pay Application Fee', description: 'Pay the application fee online', icon: DollarSign },
    { step: 4, title: 'Interview/Test', description: 'Appear for the entrance test or interview', icon: User },
    { step: 5, title: 'Get Admission Letter', description: 'Receive your admission letter and join the program', icon: Calendar },
  ];

  const requirements = [
    'Bachelor\'s degree with minimum 50% marks',
    'Valid entrance exam score',
    'Work experience (for MBA programs)',
    'Statement of Purpose',
    'Letter of Recommendation',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
     <Header></Header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Admission <span className="text-yellow-300">Process</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Simple steps to join your dream program at Manipal
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Process</h2>
            <div className="space-y-4">
              {steps.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-4 rounded-xl transition">
                  <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admission Requirements</h2>
            <ul className="space-y-3">
              {requirements.map((req, idx) => (
                <li key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to <span className="text-yellow-300">Apply</span>?
          </h2>
          <p className="text-blue-100 mb-8">Start your application process today</p>
          <Link to='/admission-application' className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition">
            Start Application <ArrowRight className="w-5 h-5 inline ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}