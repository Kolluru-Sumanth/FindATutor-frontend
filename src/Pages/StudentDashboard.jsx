import React, { useState } from 'react';
import { User, Mail, Phone, Edit, Calendar, MapPin, Clock, BookOpen, Check, X, AlertCircle } from 'lucide-react';

const StudentDashboard = () => {
  // Initial student data
  const [student, setStudent] = useState({
    name: "Alice Johnson",
    username: "alicej",
    password: "securepassword123",
    email: "alice.johnson@example.com",
    phone: "+1234567890",
    bookings: ["64f8a7b1c9b1a2b3c4d5e6f7", "64f8a7b1c9b1a2b3c4d5e6f8"]
  });

  // Sample bookings data
  const [bookings, setBookings] = useState([
    {
      id: "64f8a7b1c9b1a2b3c4d5e6f7",
      subject: "Mathematics",
      location: "Virtual",
      status: "accepted",
      time: "2025-03-08T15:00:00",
      tutor: "Dr. Smith"
    },
    {
      id: "64f8a7b1c9b1a2b3c4d5e6f8",
      subject: "Physics",
      location: "Library, Room 204",
      status: "pending",
      time: "2025-03-10T16:30:00",
      tutor: "Prof. Williams"
    }
  ]);

  // State for profile editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({...student});

  // State for active tab
  const [activeTab, setActiveTab] = useState("profile");

  // Handle profile update
  const handleProfileUpdate = () => {
    setStudent(editedProfile);
    setIsEditing(false);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case "accepted": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case "accepted": return <Check size={16} className="mr-1" />;
      case "pending": return <Clock size={16} className="mr-1" />;
      case "cancelled": return <X size={16} className="mr-1" />;
      default: return <AlertCircle size={16} className="mr-1" />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">StudyBuddy</h1>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
              {student.name.charAt(0)}
            </div>
            <span>{student.username}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 mt-6">
        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-200">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === "profile" ? "text-blue-900 border-b-2 border-blue-900" : "text-gray-500"}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === "bookings" ? "text-blue-900 border-b-2 border-blue-900" : "text-gray-500"}`}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </button>
        </div>

        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-blue-900">Personal Info</h2>
              {!isEditing && (
                <button 
                  className="flex items-center text-blue-900 hover:text-blue-700"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit size={18} className="mr-1" /> Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <User size={18} />
                      </span>
                      <input 
                        type="text" 
                        className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <User size={18} />
                      </span>
                      <input 
                        type="text" 
                        className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        value={editedProfile.username}
                        onChange={(e) => setEditedProfile({...editedProfile, username: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <Mail size={18} />
                      </span>
                      <input 
                        type="email" 
                        className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <Phone size={18} />
                      </span>
                      <input 
                        type="text" 
                        className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        value={editedProfile.password}
                        onChange={(e) => setEditedProfile({...editedProfile, password: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button 
                    className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedProfile({...student});
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-blue-900 rounded-md text-white hover:bg-blue-800"
                    onClick={handleProfileUpdate}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <User size={20} className="text-blue-900 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{student.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User size={20} className="text-blue-900 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="font-medium">{student.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail size={20} className="text-blue-900 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone size={20} className="text-blue-900 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{student.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bookings Tab Content */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-900">Your Tutoring Sessions</h2>
            
            {/* Bookings */}
            <div className="space-y-4">
              {bookings.map(booking => (
                <div key={booking.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-900">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center mb-2">
                        <BookOpen size={18} className="text-blue-900 mr-2" />
                        <h3 className="font-bold text-lg">{booking.subject} with {booking.tutor}</h3>
                      </div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Calendar size={16} className="mr-2" />
                        <span>{formatDate(booking.time)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin size={16} className="mr-2" />
                        <span>{booking.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`flex items-center px-3 py-1 rounded-md text-white ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Info message about who can cancel */}
                  {booking.status !== "cancelled" && (
                    <div className="mt-3 text-sm text-gray-500 italic">
                      <AlertCircle size={14} className="inline mr-1" />
                      Only tutors can cancel or modify bookings. Contact your tutor if you need to make changes.
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
              <h3 className="font-medium mb-2 text-blue-900">Status Legend</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Pending: Awaiting tutor confirmation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Accepted: Booking confirmed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">Cancelled: Session will not take place</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;