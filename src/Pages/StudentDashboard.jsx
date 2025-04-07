import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Edit, Calendar, MapPin, Clock, BookOpen, Check, X, AlertCircle } from 'lucide-react';

const API = import.meta.env.VITE_API; // Ensure this is set in your .env file (e.g., VITE_API=http://localhost:5000)

const StudentDashboard = () => {
  const [student, setStudent] = useState(null); // Initially null until data is fetched
  const [bookings, setBookings] = useState([]); // Store populated bookings
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [error, setError] = useState(null); // For error handling

  // Fetch student profile on mount
  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Assuming token is stored here after login
        if (!currentUser || !currentUser.token) {
          throw new Error('Please log in to view your dashboard');
        }

        const response = await fetch(`${API}/api/students/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${currentUser.token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch profile');
        }

        const studentData = await response.json();
        setStudent(studentData);
        setEditedProfile(studentData);
        setError(null);
      } catch (err) {
        console.error('Error fetching student profile:', err);
        setError(err.message);
      }
    };

    fetchStudentProfile();
  }, []);

  // Fetch student bookings when activeTab changes to "bookings" or on mount
  useEffect(() => {
    const fetchStudentBookings = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || !currentUser.token) {
          throw new Error('Please log in to view your bookings');
        }

        const response = await fetch(`${API}/api/bookings/student`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${currentUser.token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch bookings');
        }

        const bookingsData = await response.json();
        setBookings(bookingsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching student bookings:', err);
        setError(err.message);
      }
    };

    // Fetch bookings initially and when switching to bookings tab
    if (activeTab === "bookings" || bookings.length === 0) {
      fetchStudentBookings();
    }
  }, [activeTab]); // Dependency on activeTab to refetch when switching tabs

  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser || !currentUser.token) {
        throw new Error('Please log in to update your profile');
      }

      const response = await fetch(`${API}/api/students/me`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedProfile.name,
          username: editedProfile.username,
          email: editedProfile.email,
          phone: editedProfile.phone,
        }), // Exclude password as per backend restriction
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedStudent = await response.json();
      setStudent(updatedStudent);
      setEditedProfile(updatedStudent);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message);
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-500"; // Changed from "accepted" to "confirmed"
      case "pending": return "bg-yellow-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed": return <Check size={16} className="mr-1" />; // Changed from "accepted" to "confirmed"
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
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Loading state
  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans">
      <main className="container mx-auto p-4 mt-6">
        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {error}
          </div>
        )}

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
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
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
                        onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
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
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
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
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedProfile({ ...student });
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
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <div key={booking._id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-900">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <BookOpen size={18} className="text-blue-900 mr-2" />
                          <h3 className="font-bold text-lg">
                            {booking.subject} with {booking.tutorId?.name || 'Unknown Tutor'}
                          </h3>
                        </div>
                        <div className="flex items-center text-gray-600 mb-1">
                          <Calendar size={16} className="mr-2" />
                          <span>{formatDate(booking.date)}</span>
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
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                  <p className="text-gray-500">No bookings found.</p>
                </div>
              )}
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
                  <span className="text-sm">Confirmed: Booking confirmed</span> {/* Changed from "Accepted" */}
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