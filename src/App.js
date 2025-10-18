import React, { useState, useEffect } from 'react';

const AmoslandPTO = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEventId, setSelectedEventId] = useState(null);

  //Return to the top of the page when navigating between pages
  useEffect(() => {
     window.scrollTo(0, 0);
   }, [currentPage]);

  const [events, setEvents] = useState([
    {
      id: 1,
      date: 'October 18, 2025',
      time: '5:00 PM - 7:00 PM',
      title: 'Trunk or Treat with Amosland Home & School',
      shortDescription: 'Join us for lots of treats and maybe a few tricks. Volunteer opportunities available.',
      fullDescription: '1-2 families per trunk. Each participating family MUST register and supply candy for approximately 300 kids. NO Walk-ins, all families MUST register in advance. For the safety of everyone, CARS WILL NOT BE PERMITTED TO LEAVE EARLY. Please plan to stay until 7PM.',
      location: 'Amosland Elementary School Parking Lot',
      cost: '$10 per family',
      requiresRegistration: true,
      capacity: 200,
      registrationDeadline: 'October 10, 2025'
    },
    {
      id: 2,
      date: 'TBD',
      time: 'TBD',
      title: 'Boys MVP Event',
      shortDescription: 'More information coming soon',
      fullDescription: 'Stay tuned for additional details',
      location: 'TBD',
      cost: 'TBD',
      requiresRegistration: false,
      capacity: null
    },
    {
      id: 3,
      date: 'February 20, 2026',
      time: 'TBD',
      title: 'Girls VIP Dance',
      shortDescription: 'Join us for a magical night of dancing and fun.',
      fullDescription: 'Details coming soon',
      location: 'Amosland Cafeteria',
      cost: 'TBD',
      requiresRegistration: false,
      capacity: 250
    },
    {
      id: 4,
      date: 'March 15, 2026',
      time: 'TBD',
      title: 'Family Fun Night',
      shortDescription: 'Join us for family fun, food, and bingo',
      fullDescription: 'Full details coming soon',
      location: 'Amosland Elementary Cafeteria',
      cost: 'TBD',
      requiresRegistration: false,
      capacity: 300,
      registrationDeadline: 'TBD'
    }
  ]);

  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [currentPage]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const goToEventDetail = (eventId) => {
    setSelectedEventId(eventId);
    setCurrentPage('eventDetail');
  };

  const goHome = () => {
    setCurrentPage('home');
    setSelectedEventId(null);
  };

  const quickLinks = [
    {
      href: 'https://venmo.com/u/Amosland-HomeandSchool',
      icon: '💳',
      title: 'Support Via Venmo'
    },
    {
      href: 'mailto:Amoslandhands@gmail.com',
      icon: '📧',
      title: 'Contact PTO'
    },
    {
      href: "https://www.facebook.com/amoslandelementary",
      icon: '📘',
      title: "Follow Us On Facebook"
    },
    {
      href: "https://btfe.smart.link/c2jjdifkw?referral_code=HMXJ2O8E&school_id=93857 ",
      icon: '🎟️',
      title: "Earn Box Tops For Our School"
    }
  ];

  const involvementOptions = [
    {
      icon: '📚',
      title: 'Volunteer at Events',
      description: 'Help with setup, activities, and cleanup at our school events. Great way to meet other families!'
    },
    {
      icon: '👥',
      title: 'Join a Committee',
      description: 'Get more involved by joining one of our committees: Events, Fundraising, Communications, or Volunteer Coordination.'
    },
    {
      icon: '🎯',
      title: 'Donate or Sponsor',
      description: 'Financial contributions help fund field trips, classroom supplies, and special programs for our students.'
    },
    {
      icon: '📢',
      title: 'Spread the Word',
      description: 'Help us connect with more families by sharing our events and activities on social media and with neighbors.'
    }
  ];

  if (currentPage === 'eventDetail') {
    return <EventDetailPage event={events.find(e => e.id === selectedEventId)} goHome={goHome} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50">
      {/* Header */}
      <header className="bg-green-900 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <button onClick={goHome} className="flex items-center gap-4">
              <div className="w-18 h-18 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-lg">
                <img 
                  src="/Ridley Logo.png" 
                  alt="Ridley School District Logo" 
                  className="w-14 h-14 object-contain"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold">Amosland Home And School</h1>
                <p className="text-green-200 text-sm">Amosland Elementary PTO</p>
              </div>
            </button>
            <nav>
              <ul className="flex flex-wrap gap-6 justify-center">
                {['events', 'links', 'involved', 'contact'].map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => scrollToSection(section)}
                      className="text-white font-medium px-4 py-2 rounded-full hover:bg-green-700 transition-all duration-300 hover:-translate-y-1"
                    >
                      {section === 'events' ? 'Events' : 
                       section === 'links' ? 'Quick Links' :
                       section === 'involved' ? 'Get Involved' : 'Contact'}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 to-green-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute bottom-32 left-40 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-4 h-4 bg-white rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Welcome to Our School Community!
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Building stronger connections between home and school, one event at a time. 
            Join us in creating amazing experiences for our Amosland Elementary students!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('events')}
              className="bg-white text-green-900 px-8 py-4 rounded-full font-bold text-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              View Upcoming Events
            </button>
            <button
              onClick={() => scrollToSection('involved')}
              className="bg-transparent border-3 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-900 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              Get Involved Today
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Events Section */}
        <section 
          id="events" 
          className={`section bg-white rounded-3xl p-10 shadow-xl transition-all duration-700 ${isVisible.events ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl">
              📅
            </div>
            <h3 className="text-3xl font-bold text-green-900">Upcoming Events</h3>
          </div>
          <p className="text-gray-600 mb-8 text-lg">
            Stay connected with all the exciting activities happening at Amosland Elementary. Click on any event for more details and registration!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <button 
                key={event.id}
                onClick={() => goToEventDetail(event.id)}
                className="bg-gradient-to-br from-amber-50 to-green-50 rounded-2xl p-6 border-l-4 border-green-600 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer block group w-full text-left"
              >
                <div className="bg-green-900 text-white px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                  {event.date}
                </div>
                <h4 className="text-xl font-bold text-green-900 mb-3 group-hover:text-green-700">
                  {event.title}
                </h4>
                <p className="text-gray-600 leading-relaxed mb-4">{event.shortDescription}</p>
                <div className="flex items-center text-green-700 font-semibold">
                  <span>View Details & Register</span>
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Quick Links Section */}
        <section 
          id="links" 
          className={`section bg-white rounded-3xl p-10 shadow-xl transition-all duration-700 ${isVisible.links ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl">
              🔗
            </div>
            <h3 className="text-3xl font-bold text-green-900">Quick Links & Resources</h3>
          </div>
          <p className="text-gray-600 mb-8 text-lg">
            Access important documents, make donations, and stay connected with our school community.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="bg-gradient-to-br from-green-900 to-green-700 text-white p-8 rounded-2xl text-center hover:-translate-y-3 hover:scale-105 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="text-4xl mb-4 relative z-10">{link.icon}</div>
                <div className="text-lg font-bold relative z-10">{link.title}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Get Involved Section */}
        <section 
          id="involved" 
          className={`section bg-white rounded-3xl p-10 shadow-xl transition-all duration-700 ${isVisible.involved ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl">
              🤝
            </div>
            <h3 className="text-3xl font-bold text-green-900">Get Involved</h3>
          </div>
          <p className="text-gray-600 mb-8 text-lg">
            There are many ways to support our school community. Every contribution makes a difference!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {involvementOptions.map((option, index) => (
              <div 
                key={index}
                className="bg-amber-50 rounded-2xl p-8 text-center border-2 border-green-600 hover:bg-white hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6">
                  {option.icon}
                </div>
                <h4 className="text-xl font-bold text-green-900 mb-4">{option.title}</h4>
                <p className="text-gray-600 leading-relaxed">{option.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section 
          id="mission" 
          className={`section bg-white rounded-3xl p-10 shadow-xl transition-all duration-700 ${isVisible.mission ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl">
              🎯
            </div>
            <h3 className="text-3xl font-bold text-green-900">Our Mission</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            The Amosland Home And School PTO is dedicated to fostering a collaborative partnership between families and educators. 
            We work together to enhance our children's educational experience through fundraising, volunteer activities, and community 
            building events. Our goal is to support our teachers, enrich student programs, and create lasting memories for our 
            Amosland Elementary family.
          </p>
          
          <div className="bg-amber-50 rounded-2xl p-8 border-l-4 border-green-600">
            <h4 className="text-xl font-bold text-green-900 mb-4">Recent Achievements</h4>
            <ul className="text-gray-600 leading-relaxed space-y-2">
              <li>• Raised $8,500 for new playground equipment</li>
              <li>• Funded field trips for all grade levels</li>
              <li>• Provided classroom supplies for teachers</li>
              <li>• Organized successful family engagement events</li>
              <li>• Built stronger home-school connections</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-green-900 text-white py-16 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-green-400 font-bold mb-4">Contact Information</h4>
              <p className="leading-relaxed">
                📍 Amosland Elementary School<br/>
                549 Amosland Road<br/>
                Morton, PA 19070
              </p>
              <p className="mt-4">
                📧 Amoslandhands@gmail.com<br/>
              </p>
            </div>
            
            <div>
              <h4 className="text-green-400 font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="https://www.ridleysd.org/o/aes" className="block hover:text-green-400 transition-colors">Amosland Elementary</a>
                <a href="https://www.ridleysd.org/" className="block hover:text-green-400 transition-colors">Ridley School District</a>
                <button onClick={() => scrollToSection('events')} className="block hover:text-green-400 transition-colors text-left">Upcoming Events</button>
                <button onClick={() => scrollToSection('involved')} className="block hover:text-green-400 transition-colors text-left">Volunteer Opportunities</button>
              </div>
            </div>
            
            
            <div>
              <h4 className="text-green-400 font-bold mb-4">Follow Us</h4>
              <div className="space-y-2">
                <a href="https://www.facebook.com/amoslandelementary" className="block hover:text-green-400 transition-colors">Facebook Group</a>
                <a href="https://venmo.com/u/Amosland-HomeandSchool" className="block hover:text-green-400 transition-colors">Venmo: @Amosland-HomeandSchool</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-700 pt-8 text-center text-green-200">
            <p>&copy; {new Date().getFullYear()} Amosland Home And School PTO. Built with ❤️ for our school community.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const EventDetailPage = ({ event, goHome }) => {
  const [formData, setFormData] = useState({
    childName: '',
    childGrade: '',
    parentName: '',
    email: '',
    phone: '',
    numParticipants: 1,
    paymentMethod: 'venmo',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the event you're looking for.</p>
          <button 
            onClick={goHome}
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Replace with your Google Apps Script web app URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwSL4Yp3T8AdkqBqIZKwoSbTiQIwORZhKDZcZPScR4iIZ_Vng0Ufjj5rV0-MtN4xAg96w/exec';
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('eventTitle', event.title);
      formDataToSend.append('eventDate', event.date);
      formDataToSend.append('childName', formData.childName);
      formDataToSend.append('childGrade', formData.childGrade);
      formDataToSend.append('parentName', formData.parentName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('numParticipants', formData.numParticipants);
      formDataToSend.append('paymentMethod', formData.paymentMethod);
      formDataToSend.append('emergencyContact', formData.emergencyContact);
      formDataToSend.append('emergencyPhone', formData.emergencyPhone);
      
      console.log('Sending to:', SCRIPT_URL);
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formDataToSend
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const result = await response.json();
      console.log('Response data:', result);
      
      if (result.success) {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message and scroll to top
        window.scrollTo(0, 0);
        setShowSuccessMessage(true);
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      alert('There was an error submitting your registration. Please try again or contact us at Amoslandhands@gmail.com');
    }
  };

  const totalCost = event.cost === 'Free' ? 0 : parseInt(event.cost.replace(/\D/g, '')) * formData.numParticipants;

  return (
   <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50">
  {/* Header */}
  <header className="bg-green-900 text-white shadow-xl">
    <div className="max-w-6xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <button onClick={goHome} className="flex items-center gap-4 hover:text-green-200 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Home</span>
        </button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-lg">
            <img 
              src="/Ridley Logo.png" 
              alt="Ridley School District Logo" 
              className="w-14 h-14 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">Amosland Home And School</h1>
            <p className="text-green-200 text-sm">Amosland Elementary PTO</p>
          </div>
        </div>
      </div>
    </div>
  </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {showSuccessMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="font-bold text-3xl mb-3 text-green-900">Registration Successful!</h3>
              <p className="text-lg text-gray-700 mb-2">Thank you for registering for</p>
              <p className="text-xl font-semibold text-green-800 mb-4">{event.title}</p>
              <button
                onClick={() => {
                  setShowSuccessMessage(false);
                  goHome();
                }}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-green-700 hover:to-green-800 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Return to Home Page
              </button>
            </div>
          </div>
        )}

        {/* Event Details */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-green-900 to-green-700 text-white p-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                <div className="space-y-2 text-green-100">
                  <p className="flex items-center gap-2">
                    <span>📅</span> {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <span>🕐</span> {event.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📍</span> {event.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <span>💰</span> {event.cost}
                  </p>
                </div>
              </div>
              
              {event.requiresRegistration && (
                <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center">
                  <p className="font-semibold">Registration Required</p>
                  {event.registrationDeadline && (
                    <p className="text-sm text-green-100">Deadline: {event.registrationDeadline}</p>
                  )}
                  {event.capacity && (
                    <p className="text-sm text-green-100">Capacity: {event.capacity} people</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-green-900 mb-4">About This Event</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{event.fullDescription}</p>
          </div>
        </div>

        {/* Registration Form */}
        {event.requiresRegistration ? (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-green-900 mb-6">Event Registration</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Child Information */}
              <div className="bg-amber-50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Child Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Child's Name *</label>
                    <input
                      type="text"
                      name="childName"
                      value={formData.childName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter child's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grade *</label>
                    <select
                      name="childGrade"
                      value={formData.childGrade}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select grade</option>
                      <option value="K">Kindergarten</option>
                      <option value="1">1st Grade</option>
                      <option value="2">2nd Grade</option>
                      <option value="3">3rd Grade</option>
                      <option value="4">4th Grade</option>
                      <option value="5">5th Grade</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Parent/Guardian Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Parent/Guardian Name *</label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter parent/guardian name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="(610) 555-0123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name *</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Emergency contact name"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone *</label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Emergency contact phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Event Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Participants *</label>
                    <select
                      name="numParticipants"
                      value={formData.numParticipants}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num} participant{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  {event.cost !== 'Free' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method *</label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="venmo">Venmo (@Amosland-HomeandSchool)</option>
                        <option value="cash">Cash (Include Child Name, Event Name)</option>
                        <option value="check">Check (payable to Amosland PTO)</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Cost Summary */}
              {event.cost !== 'Free' && (
                <div className="bg-yellow-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">Cost Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cost per participant:</span>
                      <span>${event.cost.replace(/\D/g, '')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Number of participants:</span>
                      <span>{formData.numParticipants}</span>
                    </div>
                    <div className="border-t border-yellow-200 pt-2 flex justify-between font-bold text-lg">
                      <span>Total Cost:</span>
                      <span>${totalCost}</span>
                    </div>
                  </div>
                  
                  {formData.paymentMethod === 'venmo' && (
                    <div className="mt-4 p-4 bg-purple-100 rounded-lg">
                      <p className="font-semibold text-purple-800">Venmo Payment Instructions:</p>
                      <p className="text-purple-700">Send ${totalCost} to @Amosland-HomeandSchool</p>
                      <p className="text-sm text-purple-600">Include your child's name and "{event.title}" in the memo</p>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-8 rounded-full font-bold text-lg hover:from-green-700 hover:to-green-800 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  {event.cost === 'Free' ? 'Register for Event' : `Register & Pay ${totalCost}`}
                </button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  By registering, you agree to our event terms and conditions. 
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-green-900 mb-4">Registration Not Yet Open</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Stay tuned for event details and registration!
            </p>
            <button 
              onClick={goHome}
              className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
            >
              Back to All Events
            </button>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Questions about this event?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
            <div>
              <p className="mb-2">
                <strong>Email:</strong>{' '}
                <a href="mailto:Amoslandhands@gmail.com" className="text-green-700 hover:text-green-900 hover:underline">
                  Amoslandhands@gmail.com
                </a>
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>Follow us:</strong>{' '}
                <a 
                  href="https://www.facebook.com/amoslandelementary" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-700 hover:text-green-900 hover:underline"
                >
                  Facebook Group
                </a>
              </p>
            </div>
            <div>
              <p>
                <strong>Donations:</strong>{' '}
                <a 
                  href="https://venmo.com/u/Amosland-HomeandSchool" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-700 hover:text-green-900 hover:underline"
                >
                  @Amosland-HomeandSchool
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AmoslandPTO;