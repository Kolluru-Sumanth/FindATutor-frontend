import React, { useState } from 'react';
import { Bell, Calendar, Star, MessageSquare, Settings, LogOut, Check, X, Clock, User, Edit, ChevronRight, BookOpen, MapPin, Video, Phone, Globe } from 'lucide-react';

const TutorDashboard = () => {
  // Sample tutor data based on provided schema
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "johndoe@example.com",
    email: "johndoe@example.com",
    profilePicture: "/api/placeholder/200/200", // Using placeholder instead of external URL
    profession: "Math Tutor",
    about: "Experienced math tutor with 5+ years of teaching algebra, calculus, and geometry.",
    price: 50,
    subjects: ["Algebra", "Calculus", "Geometry"],
    locations: ["New York", "Online"],
    availability: [
      {
        day: "Monday",
        slots: [
          {
            startTime: "10:00",
            endTime: "12:00"
          },
          {
            startTime: "14:00",
            endTime: "16:00"
          }
        ]
      },
      {
        day: "Wednesday",
        slots: [
          {
            startTime: "09:00",
            endTime: "11:00"
          }
        ]
      }
    ],
    contact: {
      phone: "+1234567890",
      socialMedia: {
        whatsapp: "+1234567890",
        zoom: "https://zoom.us/j/1234567890"
      }
    },
    rating: {
      average: 4.5,
      total: 10
    },
    isVerified: true
  });

  // Sample bookings data
  const [bookings, setBookings] = useState([
    { id: 1, student: "Emma Wilson", subject: "Algebra", date: "Mar 10, 2025", time: "10:30 AM", duration: "1 hour", status: "pending" },
    { id: 2, student: "Noah Garcia", subject: "Calculus", date: "Mar 8, 2025", time: "2:30 PM", duration: "1.5 hours", status: "accepted" },
    { id: 3, student: "Olivia Taylor", subject: "Geometry", date: "Mar 12, 2025", time: "9:30 AM", duration: "1 hour", status: "pending" },
    { id: 4, student: "Liam Brown", subject: "Algebra", date: "Mar 9, 2025", time: "3:00 PM", duration: "1 hour", status: "cancelled" },
  ]);

  // Sample reviews data
  const [reviews, setReviews] = useState([
    { id: 1, student: "Riley Chen", rating: 5, comment: "Excellent tutor! Made calculus concepts really clear and easy to understand.", date: "Feb 28, 2025" },
    { id: 2, student: "Jordan Smith", rating: 4, comment: "Great teaching style. Helped me improve my algebra skills significantly.", date: "Feb 25, 2025" },
    { id: 3, student: "Taylor Kim", rating: 5, comment: "John is amazing! Patient and thorough with geometry explanations.", date: "Feb 20, 2025" },
  ]);

  const [activeTab, setActiveTab] = useState('bookings');
  const [editingProfile, setEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({...profile});
  const [activeProfileTab, setActiveProfileTab] = useState('info');

  // Function to update booking status
  const updateBookingStatus = (id, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? {...booking, status: newStatus} : booking
    ));
  };

  // Function to save profile changes
  const saveProfileChanges = () => {
    setProfile({...editedProfile});
    setEditingProfile(false);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Render star rating
  const StarRating = ({ rating }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
        ))}
      </div>
    );
  };

  // Verification badge
  const VerificationBadge = () => (
    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
      <Check size={12} className="mr-1" />
      Verified
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" style={{ backgroundColor: "#F1F6F9" }}>
      {/* Navbar */}
      <nav className="px-6 py-4" style={{ backgroundColor: "#14274E" }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen size={24} className="text-white" />
            <h1 className="text-xl font-bold text-white">TutorHub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-opacity-10 hover:bg-white">
              <Bell size={20} className="text-white" />
            </button>
            <button className="p-2 rounded-full hover:bg-opacity-10 hover:bg-white">
              <MessageSquare size={20} className="text-white" />
            </button>
            <div className="w-8 h-8 rounded-full bg-white overflow-hidden">
              <img src={profile.profilePicture} alt={profile.name} />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: "#394867" }}>
              {!editingProfile ? (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                    <img src={profile.profilePicture} alt={profile.name} className="object-cover w-full h-full" />
                  </div>
                  <h2 className="text-xl font-bold text-white flex items-center justify-center">
                    {profile.name}
                    {profile.isVerified && (
                      <Check size={16} className="ml-1 text-blue-400" />
                    )}
                  </h2>
                  <p className="text-sm mt-1" style={{ color: "#9BA4B4" }}>{profile.profession}</p>
                  <p className="mt-2 font-medium text-white">${profile.price}/hour</p>
                  
                  <div className="flex justify-center mt-2">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-white">{profile.rating.average}</span>
                      <span className="text-xs ml-1 text-gray-300">({profile.rating.total})</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="flex justify-around mb-3">
                      <button 
                        className={`text-sm font-medium pb-1 ${activeProfileTab === 'info' ? 'text-white border-b-2 border-white' : 'text-gray-300'}`}
                        onClick={() => setActiveProfileTab('info')}
                      >
                        Info
                      </button>
                      <button 
                        className={`text-sm font-medium pb-1 ${activeProfileTab === 'schedule' ? 'text-white border-b-2 border-white' : 'text-gray-300'}`}
                        onClick={() => setActiveProfileTab('schedule')}
                      >
                        Schedule
                      </button>
                      <button 
                        className={`text-sm font-medium pb-1 ${activeProfileTab === 'contact' ? 'text-white border-b-2 border-white' : 'text-gray-300'}`}
                        onClick={() => setActiveProfileTab('contact')}
                      >
                        Contact
                      </button>
                    </div>
                    
                    {activeProfileTab === 'info' && (
                      <div className="text-left">
                        <p className="text-sm text-white mb-3">{profile.about}</p>
                        <div>
                          <h4 className="text-xs font-medium" style={{ color: "#9BA4B4" }}>SUBJECTS</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {profile.subjects.map((subject, index) => (
                              <span key={index} className="text-xs px-2 py-1 rounded-full bg-blue-900 text-white">
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3">
                          <h4 className="text-xs font-medium" style={{ color: "#9BA4B4" }}>LOCATIONS</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {profile.locations.map((location, index) => (
                              <span key={index} className="text-xs px-2 py-1 rounded-full flex items-center bg-blue-900 text-white">
                                {location === "Online" ? <Video size={10} className="mr-1" /> : <MapPin size={10} className="mr-1" />}
                                {location}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeProfileTab === 'schedule' && (
                      <div className="text-left">
                        <h4 className="text-xs font-medium mb-2" style={{ color: "#9BA4B4" }}>WEEKLY AVAILABILITY</h4>
                        {profile.availability.map((day, index) => (
                          <div key={index} className="mb-2">
                            <h5 className="text-sm font-medium text-white">{day.day}</h5>
                            <div className="ml-2">
                              {day.slots.map((slot, slotIndex) => (
                                <div key={slotIndex} className="text-xs text-gray-300 mt-1">
                                  {slot.startTime} - {slot.endTime}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {activeProfileTab === 'contact' && (
                      <div className="text-left">
                        <div className="mb-2">
                          <h4 className="text-xs font-medium" style={{ color: "#9BA4B4" }}>PHONE</h4>
                          <p className="text-sm text-white flex items-center mt-1">
                            <Phone size={12} className="mr-1" />
                            {profile.contact.phone}
                          </p>
                        </div>
                        <div className="mb-2">
                          <h4 className="text-xs font-medium" style={{ color: "#9BA4B4" }}>EMAIL</h4>
                          <p className="text-sm text-white flex items-center mt-1">
                            <MessageSquare size={12} className="mr-1" />
                            {profile.email}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium" style={{ color: "#9BA4B4" }}>PLATFORMS</h4>
                          <p className="text-sm text-white flex items-center mt-1">
                            <Phone size={12} className="mr-1" />
                            WhatsApp
                          </p>
                          <p className="text-sm text-white flex items-center mt-1">
                            <Video size={12} className="mr-1" />
                            Zoom
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    className="mt-4 px-4 py-2 rounded-lg flex items-center justify-center w-full text-sm font-medium"
                    style={{ backgroundColor: "#9BA4B4", color: "#14274E" }}
                    onClick={() => setEditingProfile(true)}
                  >
                    <Edit size={16} className="mr-2" />
                    Edit Profile
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Edit Profile</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-white block mb-1">Name</label>
                      <input 
                        type="text" 
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                        className="w-full p-2 rounded bg-white text-gray-800 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white block mb-1">Profession</label>
                      <input 
                        type="text" 
                        value={editedProfile.profession}
                        onChange={(e) => setEditedProfile({...editedProfile, profession: e.target.value})}
                        className="w-full p-2 rounded bg-white text-gray-800 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white block mb-1">Hourly Rate ($)</label>
                      <input 
                        type="number" 
                        value={editedProfile.price}
                        onChange={(e) => setEditedProfile({...editedProfile, price: e.target.value})}
                        className="w-full p-2 rounded bg-white text-gray-800 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white block mb-1">About</label>
                      <textarea 
                        value={editedProfile.about}
                        onChange={(e) => setEditedProfile({...editedProfile, about: e.target.value})}
                        className="w-full p-2 rounded bg-white text-gray-800 text-sm"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white block mb-1">Subjects (comma separated)</label>
                      <input 
                        type="text" 
                        value={editedProfile.subjects.join(", ")}
                        onChange={(e) => setEditedProfile({...editedProfile, subjects: e.target.value.split(", ")})}
                        className="w-full p-2 rounded bg-white text-gray-800 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white block mb-1">Locations (comma separated)</label>
                      <input 
                        type="text" 
                        value={editedProfile.locations.join(", ")}
                        onChange={(e) => setEditedProfile({...editedProfile, locations: e.target.value.split(", ")})}
                        className="w-full p-2 rounded bg-white text-gray-800 text-sm"
                      />
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <button 
                        className="px-4 py-2 rounded-lg flex-1 text-sm font-medium bg-white text-gray-800"
                        onClick={() => {
                          setEditedProfile({...profile});
                          setEditingProfile(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button 
                        className="px-4 py-2 rounded-lg flex-1 text-sm font-medium"
                        style={{ backgroundColor: "#9BA4B4", color: "#14274E" }}
                        onClick={saveProfileChanges}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'bookings' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('bookings')}
                style={activeTab === 'bookings' ? {borderColor: "#14274E", color: "#14274E"} : {color: "#394867"}}
              >
                Bookings
              </button>
              <button 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('reviews')}
                style={activeTab === 'reviews' ? {borderColor: "#14274E", color: "#14274E"} : {color: "#394867"}}
              >
                Reviews
              </button>
            </div>

            {/* Bookings */}
            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold" style={{ color: "#14274E" }}>Upcoming Sessions</h2>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm rounded-lg font-medium" style={{ backgroundColor: "#394867", color: "white" }}>
                      All
                    </button>
                    <button className="px-3 py-1 text-sm rounded-lg font-medium text-gray-600">
                      Pending
                    </button>
                    <button className="px-3 py-1 text-sm rounded-lg font-medium text-gray-600">
                      Accepted
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <div key={booking.id} className="p-4 rounded-xl shadow-sm bg-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold" style={{ color: "#14274E" }}>{booking.subject}</h3>
                              <StatusBadge status={booking.status} />
                            </div>
                            <p className="text-sm mt-1" style={{ color: "#394867" }}>with {booking.student}</p>
                            <div className="flex items-center mt-2 text-sm" style={{ color: "#394867" }}>
                              <Calendar size={14} className="mr-1" />
                              {booking.date} at {booking.time}
                            </div>
                            <div className="flex items-center mt-1 text-sm" style={{ color: "#394867" }}>
                              <Clock size={14} className="mr-1" />
                              {booking.duration}
                            </div>
                          </div>
                          
                          {booking.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button 
                                className="p-2 rounded-full"
                                style={{ backgroundColor: "#F1F6F9" }}
                                onClick={() => updateBookingStatus(booking.id, 'accepted')}
                              >
                                <Check size={18} className="text-green-600" />
                              </button>
                              <button 
                                className="p-2 rounded-full"
                                style={{ backgroundColor: "#F1F6F9" }}
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              >
                                <X size={18} className="text-red-600" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center rounded-xl bg-white">
                      <Calendar size={48} className="mx-auto mb-3 text-gray-300" />
                      <h3 className="text-lg font-medium text-gray-600">No bookings yet</h3>
                      <p className="text-sm text-gray-500 mt-1">Your upcoming sessions will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reviews */}
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-bold mb-4" style={{ color: "#14274E" }}>Student Reviews</h2>
                <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: "#394867" }}>
                  <div className="flex items-end">
                    <div>
                      <p className="text-4xl font-bold text-white">{profile.rating.average}</p>
                      <StarRating rating={profile.rating.average} />
                    </div>
                    <p className="ml-2 text-sm text-white">based on {profile.rating.total} reviews</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="p-4 rounded-xl shadow-sm bg-white">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3" style={{ backgroundColor: "#9BA4B4" }}>
                              <User size={18} className="text-white" />
                            </div>
                            <div>
                              <p className="font-medium" style={{ color: "#14274E" }}>{review.student}</p>
                              <p className="text-xs" style={{ color: "#394867" }}>{review.date}</p>
                            </div>
                          </div>
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="mt-3 text-sm" style={{ color: "#394867" }}>{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center rounded-xl bg-white">
                      <Star size={48} className="mx-auto mb-3 text-gray-300" />
                      <h3 className="text-lg font-medium text-gray-600">No reviews yet</h3>
                      <p className="text-sm text-gray-500 mt-1">Student reviews will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;