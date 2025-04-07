import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Star, MessageSquare, Settings, LogOut, Check, X, Clock, User, Edit, ChevronRight, BookOpen, MapPin, Video, Phone, Globe } from 'lucide-react';

const API = import.meta.env.VITE_API;

const TutorDashboard = () => {
  const [tutor, setTutor] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const [editingProfile, setEditingProfile] = useState(false);
  const [editedTutor, setEditedTutor] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeProfileTab, setActiveProfileTab] = useState('info');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const token = currentUser.token;

        // Fetch tutor profile
        const tutorResponse = await fetch(`${API}/api/tutors/me`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!tutorResponse.ok) throw new Error('Failed to fetch tutor data');
        const tutorData = await tutorResponse.json();
        setTutor(tutorData);
        setEditedTutor(tutorData);
        setImagePreview(tutorData.profilePicture ? `${API}/${tutorData.profilePicture}` : null);

        // Fetch bookings
        const bookingsResponse = await fetch(`${API}/api/bookings/tutor`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!bookingsResponse.ok) throw new Error('Failed to fetch bookings');
        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData);

        // Fetch reviews
        const reviewsResponse = await fetch(`${API}/api/reviews/tutor/${tutorData._id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!reviewsResponse.ok) {
          const errorData = await reviewsResponse.json();
          throw new Error(errorData.message || 'Failed to fetch reviews');
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };
    fetchTutorData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const saveProfileChanges = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const token = currentUser.token;
      const formData = new FormData();

      formData.append('name', editedTutor.name);
      formData.append('profession', editedTutor.profession);
      formData.append('price', editedTutor.price);
      formData.append('about', editedTutor.about);
      formData.append('subjects', editedTutor.subjects.join(','));
      formData.append('locations', editedTutor.locations.join(','));
      if (profileImage) formData.append('image', profileImage);

      const response = await fetch(`${API}/api/tutors/me`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to update profile');
      const updatedTutor = await response.json();
      setTutor(updatedTutor);
      setEditingProfile(false);
      setProfileImage(null);
      setImagePreview(updatedTutor.profilePicture ? `${API}/${updatedTutor.profilePicture}` : null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const token = currentUser.token;
      const response = await fetch(`${API}/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update booking status');
      }

      const updatedBooking = await response.json();
      setBookings(
        bookings.map(booking =>
          booking._id === bookingId ? { ...booking, status: updatedBooking.status } : booking
        )
      );
    } catch (error) {
      console.error('Error updating booking status:', error.message);
    }
  };

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const StarRating = ({ rating }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
      ))}
    </div>
  );

  const VerificationBadge = () => (
    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
      <Check size={12} className="mr-1" /> Verified
    </div>
  );

  if (!tutor) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50" style={{ backgroundColor: "#F1F6F9" }}>
      <div className="container mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: "#394867" }}>
              {!editingProfile ? (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                    <img src={imagePreview || `${API}/default-profile.jpg`} alt={tutor.name} className="object-cover w-full h-full" />
                  </div>
                  <h2 className="text-xl font-bold text-white flex items-center justify-center">
                    {tutor.name}
                    {tutor.isVerified && <Check size={16} className="ml-1 text-blue-400" />}
                  </h2>
                  <p className="text-sm mt-1" style={{ color: "#9BA4B4" }}>{tutor.profession}</p>
                  <p className="mt-2 font-medium text-white">₹{tutor.price}/hour</p>
                  <div className="flex justify-center mt-2">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-white">{tutor.rating.average}</span>
                      <span className="text-xs ml-1 text-gray-300">({tutor.rating.total})</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="flex justify-around mb-3">
                      <button className={`text-sm font-medium pb-1 ${activeProfileTab === 'info' ? 'text-white border-b-2 border-white' : 'text-gray-300'}`} onClick={() => setActiveProfileTab('info')}>
                        Info
                      </button>
                      <button className={`text-sm font-medium pb-1 ${activeProfileTab === 'schedule' ? 'text-white border-b-2 border-white' : 'text-gray-300'}`} onClick={() => setActiveProfileTab('schedule')}>
                        Schedule
                      </button>
                      <button className={`text-sm font-medium pb-1 ${activeProfileTab === 'contact' ? 'text-white border-b-2 border-white' : 'text-gray-300'}`} onClick={() => setActiveProfileTab('contact')}>
                        Contact
                      </button>
                    </div>

                    {activeProfileTab === 'info' && (
                      <div className="text-left">
                        <p className="text-sm text-white mb-3">{tutor.about}</p>
                        <div>
                          <h4 className="text-xs font-medium" style={{ color: "#9BA4B4" }}>SUBJECTS</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {tutor.subjects.map((subject, index) => (
                              <span key={index} className="text-xs px-2 py-1 rounded-full bg-blue-900 text-white">{subject}</span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3">
                          <h4 className="text-xs font-medium" style={{ color: "#9BA4B4" }}>LOCATIONS</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {tutor.locations.map((location, index) => (
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
                        {tutor.availability.map((day, index) => (
                          <div key={index} className="mb-2">
                            <h5 className="text-sm font-medium text-white">{day.day}</h5>
                            <div className="ml-2">
                              {day.slots.map((slot, slotIndex) => (
                                <div key={slotIndex} className="text-xs text-gray-300 mt-1">{slot.startTime} - {slot.endTime}</div>
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
                            {tutor.contact.phone}
                          </p>
                        </div>
                        <div className="mb-2">
                          <h4 className="text-xs font-medium" style={{ color: "#9BA4B4" }}>EMAIL</h4>
                          <p className="text-sm text-white flex items-center mt-1">
                            <MessageSquare size={12} className="mr-1" />
                            {tutor.email}
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

                  <button className="mt-4 px-4 py-2 rounded-lg flex items-center justify-center w-full text-sm font-medium" style={{ backgroundColor: "#9BA4B4", color: "#14274E" }} onClick={() => setEditingProfile(true)}>
                    <Edit size={16} className="mr-2" /> Edit Profile
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Edit Profile</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-white block mb-1">Profile Picture</label>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img src={imagePreview || `${API}/default-profile.jpg`} alt="Preview" className="object-cover w-full h-full" />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-white file:text-gray-800 hover:file:bg-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-white block mb-1">Name</label>
                      <input type="text" value={editedTutor.name} onChange={(e) => setEditedTutor({ ...editedTutor, name: e.target.value })} className="w-full p-2 rounded bg-white text-gray-800 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm text-white block mb-1">Profession</label>
                      <input type="text" value={editedTutor.profession} onChange={(e) => setEditedTutor({ ...editedTutor, profession: e.target.value })} className="w-full p-2 rounded bg-white text-gray-800 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm text-white block mb-1">Hourly Rate ($)</label>
                      <input type="number" value={editedTutor.price} onChange={(e) => setEditedTutor({ ...editedTutor, price: e.target.value })} className="w-full p-2 rounded bg-white text-gray-800 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm text-white block mb-1">About</label>
                      <textarea value={editedTutor.about} onChange={(e) => setEditedTutor({ ...editedTutor, about: e.target.value })} className="w-full p-2 rounded bg-white text-gray-800 text-sm" rows={3} />
                    </div>
                    <div>
                      <label className="text-sm text-white block mb-1">Subjects (comma separated)</label>
                      <input type="text" value={editedTutor.subjects.join(", ")} onChange={(e) => setEditedTutor({ ...editedTutor, subjects: e.target.value.split(", ") })} className="w-full p-2 rounded bg-white text-gray-800 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm text-white block mb-1">Locations (comma separated)</label>
                      <input type="text" value={editedTutor.locations.join(", ")} onChange={(e) => setEditedTutor({ ...editedTutor, locations: e.target.value.split(", ") })} className="w-full p-2 rounded bg-white text-gray-800 text-sm" />
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <button className="px-4 py-2 rounded-lg flex-1 text-sm font-medium bg-white text-gray-800" onClick={() => { setEditedTutor({ ...tutor }); setEditingProfile(false); setProfileImage(null); setImagePreview(tutor.profilePicture ? `${API}/${tutor.profilePicture}` : null); }}>
                        Cancel
                      </button>
                      <button className="px-4 py-2 rounded-lg flex-1 text-sm font-medium" style={{ backgroundColor: "#9BA4B4", color: "#14274E" }} onClick={saveProfileChanges}>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex border-b border-gray-200 mb-6">
              <button className={`px-4 py-2 font-medium text-sm ${activeTab === 'bookings' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`} onClick={() => setActiveTab('bookings')} style={activeTab === 'bookings' ? { borderColor: "#14274E", color: "#14274E" } : { color: "#394867" }}>
                Bookings
              </button>
              <button className={`px-4 py-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`} onClick={() => setActiveTab('reviews')} style={activeTab === 'reviews' ? { borderColor: "#14274E", color: "#14274E" } : { color: "#394867" }}>
                Reviews
              </button>
            </div>

            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold" style={{ color: "#14274E" }}>Upcoming Sessions</h2>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm rounded-lg font-medium" style={{ backgroundColor: "#394867", color: "white" }}>All</button>
                    <button className="px-3 py-1 text-sm rounded-lg font-medium text-gray-600">Pending</button>
                    <button className="px-3 py-1 text-sm rounded-lg font-medium text-gray-600">Confirmed</button>
                  </div>
                </div>
                <div className="space-y-4">
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <div key={booking._id} className="p-4 rounded-xl shadow-sm bg-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold" style={{ color: "#14274E" }}>{booking.subject}</h3>
                              <StatusBadge status={booking.status} />
                            </div>
                            <p className="text-sm mt-1" style={{ color: "#394867" }}>with {booking.studentId.name}</p>
                            <p className="text-sm mt-1" style={{ color: "#394867" }}>on {booking.studentId.phone}</p>
                            <div className="flex items-center mt-1 text-sm" style={{ color: "#394867" }}>
                              <Clock size={14} className="mr-1" />
                              {booking.duration || "Initial call"}
                            </div>
                          </div>
                          {booking.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                className="p-2 rounded-full"
                                style={{ backgroundColor: "#F1F6F9" }}
                                onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                              >
                                <Check size={18} className="text-green-600" />
                              </button>
                              <button
                                className="p-2 rounded-full"
                                style={{ backgroundColor: "#F1F6F9" }}
                                onClick={() => updateBookingStatus(booking._id, 'cancelled')}
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

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-bold mb-4" style={{ color: "#14274E" }}>Student Reviews</h2>
                <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: "#394867" }}>
                  <div className="flex items-end">
                    <div>
                      <p className="text-4xl font-bold text-white">{tutor.rating.average}</p>
                      <StarRating rating={tutor.rating.average} />
                    </div>
                    <p className="ml-2 text-sm text-white">based on {tutor.rating.total} reviews</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review._id} className="p-4 rounded-xl shadow-sm bg-white">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                              {/* <img 
                                src={ `${API}/default-profile.jpg`}
                                alt={review.studentId.name}
                                className="object-cover w-full h-full"
                              /> */}
                              <User size={36} className="text-gray-900" />
                            </div>
                            <div>
                              <p className="font-medium" style={{ color: "#14274E" }}>{review.studentId.name}</p>
                              <p className="text-xs" style={{ color: "#394867" }}>{new Date(review.createdAt).toLocaleDateString()}</p>
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