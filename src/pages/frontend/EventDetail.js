import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Ticket, Share2, Heart } from 'lucide-react';
import Header from '../frontend/Header'
import Footer from '../frontend/Footer'


import { ViewOneEvent } from '../../Service/frontend/Event'; 

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = () => {
      setLoading(true);
    
      ViewOneEvent(id).then(response => {
        setEvent(response.data);
        setLoading(false);
      }).catch(error => {
        console.error('Error:', error);
        setEvent(null);
        setLoading(false);
      });

      // 📦 Sample data - Remove this when using API
      const eventsData = {
        1: {
          id: 1,
          title: "AI & Machine Learning Summit 2026",
          event_date: "August 15, 2026",
          category: "Technology",
          location: "San Francisco, CA",
          venue: "Moscone Center, Hall A",
          event_time: "10:00 AM - 6:00 PM",
          price: "$149 - $299",
          image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=600&fit=crop",
          organizer: "Tech Events Inc.",
          organizerEmail: "info@techevents.com",
          fullDescription: "The AI & Machine Learning Summit brings together the brightest minds in artificial intelligence. Over 50 speakers will cover topics including generative AI, neural networks, ethical AI, and real-world applications across healthcare, finance, and autonomous systems.",
          speakers: [
            { name: "Dr. Sarah Chen", title: "Head of AI Research, Google", image: "https://randomuser.me/api/portraits/women/1.jpg" },
            { name: "Prof. James Wilson", title: "Professor of Computer Science, MIT", image: "https://randomuser.me/api/portraits/men/2.jpg" },
            { name: "Maria Rodriguez", title: "Director of Engineering, OpenAI", image: "https://randomuser.me/api/portraits/women/3.jpg" }
          ],
          agenda: [
            { start_time: "9:00 AM", eventtitle: "Registration & Breakfast", description: "Check-in and networking breakfast" },
            { start_time: "10:00 AM", eventtitle: "Opening Keynote", description: "The Future of AI" },
            { start_time: "11:00 AM", eventtitle: "Panel Discussion", description: "Generative AI Impact" }
          ],
          faqs: [
            { question: "Is this event virtual or in-person?", answer: "This is an in-person event." },
            { question: "What is the refund policy?", answer: "Full refunds up to 7 days before." }
          ]
        },
        2: {
          id: 2,
          title: "Sustainable Future Conference",
          event_date: "September 5, 2026",
          category: "Environment",
          location: "Virtual Event",
          venue: "Online Platform (Zoom)",
          event_time: "9:00 AM - 5:00 PM",
          price: "Free - $49",
          image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=600&fit=crop",
          organizer: "Green Future Foundation",
          organizerEmail: "events@greenfuture.org",
          fullDescription: "This virtual conference features 40+ sessions on climate tech, circular economy, and ESG investing.",
          speakers: [
            { name: "Dr. Elena Vogt", title: "Climate Advisor, UN", image: "https://randomuser.me/api/portraits/women/5.jpg" },
            { name: "Mark Thompson", title: "Head of Sustainability, Tesla", image: "https://randomuser.me/api/portraits/men/6.jpg" }
          ],
          agenda: [
            { start_time: "9:00 AM", eventtitle: "Welcome Address", description: "Introduction" },
            { start_time: "10:00 AM", eventtitle: "Climate Tech Innovations", description: "Latest developments" }
          ],
          faqs: [
            { question: "Is there a recording available?", answer: "Yes, all sessions will be recorded." }
          ]
        },
        3: {
          id: 3,
          title: "Women in Tech Leadership",
          event_date: "September 20, 2026",
          category: "Diversity",
          location: "New York, NY",
          venue: "Hilton Midtown",
          event_time: "8:30 AM - 4:30 PM",
          price: "$199 - $399",
          image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=600&fit=crop",
          organizer: "Women in Tech Global",
          organizerEmail: "nyc@womenintech.com",
          fullDescription: "A full-day event dedicated to advancing women in tech careers.",
          speakers: [
            { name: "Amanda Jones", title: "VP of Engineering, Microsoft", image: "https://randomuser.me/api/portraits/women/8.jpg" },
            { name: "Priya Sharma", title: "Technical Director, Google", image: "https://randomuser.me/api/portraits/women/9.jpg" }
          ],
          agenda: [
            { start_time: "8:30 AM", eventtitle: "Registration", description: "Check-in" },
            { start_time: "9:30 AM", eventtitle: "Keynote", description: "Breaking Barriers" }
          ],
          faqs: [
            { question: "Is this event only for women?", answer: "Everyone is welcome to attend." }
          ]
        }
      };

      const foundEvent = eventsData[id];
      setEvent(foundEvent || null);
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  // ⏳ Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  // ❌ Event Not Found
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-3xl font-bold text-gray-700 mb-2">Event Not Found</h2>
          <p className="text-gray-500 mb-6">The event you're looking for doesn't exist</p>
          <Link 
            to="/event/1" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            View Events
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Render Event
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      {/* <div className="max-w-6xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div> */}

      <Header></Header>

      {/* Hero Section */}
      <div className="relative h-[500px] mt-4">
        <img
  src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200"
  alt="Sports Meet"
  className="w-full h-full object-cover"
/>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        <div className="absolute top-6 right-6 flex gap-3">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg"
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg">
            <Share2 className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-full font-medium">
              {event.category}
            </span>
            <span className="bg-green-600 text-white text-sm px-4 py-1.5 rounded-full font-medium flex items-center gap-1">
              <Ticket className="w-4 h-4" />
              {event.price}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {event.eventTitle}
          </h1>
          
          <div className="flex flex-wrap gap-6 text-white/95">
            <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Calendar className="w-5 h-5" />
              {event.date || event.event_date}
            </span>
            <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
              <MapPin className="w-5 h-5" />
              {event.location}
            </span>
            <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5" />
              {event.start_time || event.end_time}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {event.description}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Organized by</p>
                  <p className="font-semibold text-gray-800">{event.organizer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Venue</p>
                  <p className="font-semibold text-gray-800">{event.venue}</p>
                </div>
              </div>
            </div>

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  Speakers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.speakers.map((speaker, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <img 
                        src={speaker.image || ` "https://randomuser.me/api/portraits/men/2.jpg`} 
                        alt={speaker.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{speaker.name}</p>
                        <p className="text-sm text-gray-600">{speaker.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Agenda</h2>
                <div className="space-y-4">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="md:w-32">
                        <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg text-sm">
                          {item.start_time}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{item.eventtitle}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {event.faqs && event.faqs.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">❓ Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {event.faqs.map((faq, idx) => (
                    <details key={idx} className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <span className="font-semibold text-gray-800">{faq.question}</span>
                        <span className="text-blue-600 group-open:rotate-180 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      <div className="p-4 text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Registration Card */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-3xl font-bold text-gray-800">{event.price}</p>
                <p className="text-xs text-gray-400">Includes full access and materials</p>
              </div>

              <Link to={`/register/${event._id}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <Ticket className="w-5 h-5" />
                Register Now
              </Link>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-700">Date</p>
                    <p className="text-gray-600">{event.date || event.event_date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-700">Time</p>
                    <p className="text-gray-600">{event.start_time || event.end_time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-700">Location</p>
                    <p className="text-gray-600">{event.location}</p>
                    <p className="text-sm text-gray-500">{event.venue}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-400 text-center">
                  Questions? Contact <br />
                  <a href={`mailto:${event.organizerEmail}`} className="text-blue-600 hover:underline">
                    {event.organizerEmail}
                  </a>
                </p>
              </div>
            </div>

            {/* Organizer Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Organized By</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  {event.organizer?.charAt(0) || 'E'}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{event.organizer}</p>
                  <p className="text-sm text-gray-500">Event Organizer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default EventDetail;