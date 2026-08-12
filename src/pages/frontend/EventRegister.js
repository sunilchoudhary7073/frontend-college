import React, { useState,useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, CreditCard, CheckCircle, Ticket } from 'lucide-react';
import { ViewOneEvent } from '../../Service/frontend/Event';
const EventRegister = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    tickets: 1,
    specialRequests: '',
    paymentMethod: 'card'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [event, setEvent] = useState(null);
    const ticketPrice = Number(event?.price || 0);

const totalAmount =
    ticketPrice * Number(formData.tickets || 1);

  // Sample event data - Replace with API call
  // const event = {
  //   id: id || 1,
  //   title: "AI & Machine Learning Summit 2026",
  //   date: "August 15, 2026",
  //   location: "San Francisco, CA",
  //   price: "$149 - $299",
  //   image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop"
  // };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Registration Data:', formData);
      console.log('Event ID:', id);
      setIsSubmitting(false);
      setStep(3);
    }, 1500);
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };


    useEffect(() => {
      const fetchEvent = () => {
        // setLoading(true);
      
        ViewOneEvent(id).then(response => {
          setEvent(response.data);
          // setLoading(false);
        }).catch(error => {
          console.error('Error:', error);
          setEvent(null);
          // setLoading(false);
        });
      }
    },[])
  // ✅ Step 1: Personal Information
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Event
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Event Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
                <img 
                  src={event?.image} 
                  alt={event?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{event?.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event?.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event?.location}
                    </p>
                    <p className="flex items-center gap-2 text-green-600 font-semibold">
                      <Ticket className="w-4 h-4" />
                      {event?.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800">Register for Event</h1>
                  <p className="text-gray-600 mt-2">Fill in your details to secure your spot</p>
                </div>

                <form onSubmit={nextStep}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Tickets *
                      </label>
                      <input
                        type="number"
                        name="tickets"
                        value={formData.tickets}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                        placeholder="Dietary restrictions, accessibility needs, etc."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to Payment
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Step 2: Payment
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={prevStep}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Payment Method *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                          className={`p-3 border-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                            formData.paymentMethod === 'card' 
                              ? 'border-blue-600 bg-blue-50' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <CreditCard className="w-5 h-5" />
                          Credit Card
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                          className={`p-3 border-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                            formData.paymentMethod === 'paypal' 
                              ? 'border-blue-600 bg-blue-50' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#003087">
                            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74l1.944-12.33c.041-.26.262-.442.527-.442h4.218c3.106 0 5.26 1.547 5.26 5.155 0 2.645-1.593 4.457-4.23 4.457H8.659l-.843 4.879c-.035.222-.225.386-.452.386h-.288z"/>
                          </svg>
                          PayPal
                        </button>
                      </div>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              CVV *
                            </label>
                            <input
                              type="password"
                              placeholder="123"
                              required
                              maxLength="4"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                          </div>
                        </div>
                      </>
                    )}

      <div className="bg-gray-50 rounded-lg p-4 space-y-2">

    <div className="flex justify-between text-sm">
        <span className="text-gray-600">
            Ticket Price
        </span>

        <span className="font-semibold">
            ₹{ticketPrice}
        </span>
    </div>

    <div className="flex justify-between text-sm">
        <span className="text-gray-600">
            Number of Tickets
        </span>

        <span className="font-semibold">
            x{formData.tickets}
        </span>
    </div>

    <div className="border-t pt-2 flex justify-between font-bold text-lg">
        <span>Total Amount</span>

        <span className="text-blue-600">
            ₹{totalAmount}
        </span>
    </div>

</div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Confirm Payment
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
                <img 
                  src={event?.image} 
                  alt={event?.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">{event?.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event?.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event?.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Step 3: Success
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Registration Successful! 🎉</h2>
          <p className="text-gray-600 mb-6">
            You have successfully registered for "{event?.title}"
          </p>

          <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2 mb-6">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Name:</span> {formData.fullName}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Email:</span> {formData.email}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Tickets:</span> {formData.tickets}
            </p>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            A confirmation email has been sent to your email address.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate(`/event/${id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Back to Event
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Browse More Events
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default EventRegister;