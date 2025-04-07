import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Star, Sliders, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API;

const TutorFilterPage = () => {
  const [filters, setFilters] = useState({
    subject: '',
    location: '',
    minPrice: 0,
    maxPrice: 100,
    rating: 0,
  });
  filters.subject = new URLSearchParams(window.location.search).get("subject") || filters.subject;

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [subjects, setSubjects] = useState([]); // Dynamic subjects
  const [locations, setLocations] = useState([]); // Dynamic locations
  const navigate = useNavigate();

  // Fetch tutors based on filter and extract subjects/locations
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);

        const params = {};
        if (filters.subject) params.subject = filters.subject;
        if (filters.location) params.location = filters.location;
        if (filters.minPrice > 0) params.minPrice = filters.minPrice;
        if (filters.maxPrice < 100) params.maxPrice = filters.maxPrice;
        if (filters.rating > 0) params.rating = filters.rating;

        const response = await axios.get(`${API}/api/tutors`, { params });
        const fetchedTutors = response.data;
        setTutors(fetchedTutors);
        setError(null);

        // Extract unique subjects
        const allSubjects = new Set();
        fetchedTutors.forEach(tutor => {
          tutor.subjects?.forEach(subject => allSubjects.add(subject));
        });
        setSubjects([...allSubjects].sort());

        // Extract unique locations
        const allLocations = new Set();
        fetchedTutors.forEach(tutor => {
          if (tutor.locations) allLocations.add(tutor.locations);
          else allLocations.add('Remote'); // Add 'Remote' if no location specified
        });
        setLocations([...allLocations].sort());
      } catch (err) {
        console.error('Error fetching tutors:', err);
        setError('Failed to load tutors. Please try again later.');
        setTutors([]);
        setSubjects([]);
        setLocations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [filters]);

  // Fetch specific tutor details
  const fetchTutorDetails = async (tutorId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/api/tutors/${tutorId}`);
      setSelectedTutor(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tutor details:', err);
      setError('Failed to load tutor details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const resetFilters = () => {
    setFilters({
      subject: '',
      location: '',
      minPrice: 0,
      maxPrice: 100,
      rating: 0,
    });
  };

  return (
    <div className="min-h-screen bg-[#F1F6F9]">
      {/* Search Bar - Mobile View */}
      <div className="container mx-auto p-4 md:hidden">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search by subject, tutor name..."
            className="w-full p-3 pr-10 rounded-full border border-[#9BA4B4] bg-white focus:outline-none focus:ring-2 focus:ring-[#394867]"
          />
          <Search className="absolute right-3 top-3 text-[#394867]" size={20} />
        </div>
        <button 
          onClick={() => setMobileFilterOpen(true)}
          className="mt-3 flex items-center justify-center w-full bg-[#394867] text-white p-2 rounded-lg"
        >
          <Filter size={18} className="mr-2" /> Filter Tutors
        </button>
      </div>

      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        {/* Filter Section */}
        <div className={`${mobileFilterOpen ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto' : 'hidden'} md:block md:sticky md:top-0 md:h-screen md:w-1/4 md:mr-6 md:p-4 md:bg-white md:rounded-xl md:shadow-lg`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#14274E]">Filters</h2>
            {mobileFilterOpen && (
              <button onClick={() => setMobileFilterOpen(false)} className="text-[#394867]">
                <X size={24} />
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Subject Filter */}
            <div>
              <label className="block mb-2 font-medium text-[#14274E]">Subject</label>
              <select 
                className="w-full p-2 border border-[#9BA4B4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394867]"
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
              >
                <option value="">All Subjects</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block mb-2 font-medium text-[#14274E]">Location</label>
              <select 
                className="w-full p-2 border border-[#9BA4B4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394867]"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Price Range - Min and Max */}
            <div>
              <label className="block mb-2 font-medium text-[#14274E]">
                Price Range: ${filters.minPrice} - ${filters.maxPrice}/hr
              </label>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#394867]">Min Price</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="99" 
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
                    className="w-full h-2 bg-[#9BA4B4] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#394867]">Max Price</label>
                  <input 
                    type="range" 
                    min={filters.minPrice + 1} 
                    max="100" 
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                    className="w-full h-2 bg-[#9BA4B4] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block mb-2 font-medium text-[#14274E]">Min Rating</label>
              <div className="flex items-center space-x-2">
                {[0, 3, 3.5, 4, 4.5].map((rating) => (
                  <button
                    key={rating}
                    className={`px-3 py-1 rounded-lg text-sm ${filters.rating === rating ? 'bg-[#394867] text-white' : 'bg-[#F1F6F9] text-[#394867] border border-[#9BA4B4]'}`}
                    onClick={() => handleFilterChange('rating', rating)}
                  >
                    {rating === 0 ? 'Any' : rating + '+'}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Filters */}
            <button 
              onClick={resetFilters}
              className="w-full mt-4 bg-[#9BA4B4] hover:bg-[#394867] text-white py-2 rounded-lg transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Tutors List */}
        <div className="w-full md:w-3/4">
          {/* Search bar - Desktop */}
          <div className="hidden md:block mb-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by subject, tutor name..."
                className="w-full p-3 pl-10 rounded-lg border border-[#9BA4B4] focus:outline-none focus:ring-2 focus:ring-[#394867]"
              />
              <Search className="absolute left-3 top-3 text-[#394867]" size={20} />
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 text-[#14274E]">
            <p className="font-medium">{tutors.length} tutors found</p>
          </div>

          {/* Loading and Error states */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block w-8 h-8 border-4 border-[#394867] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-[#394867]">Loading tutors...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}

          {/* Tutor Cards */}
          {!loading && !error && (
            <div className="space-y-4">
              {tutors.map((tutor) => (
                <div 
                  key={tutor._id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                  onClick={() => fetchTutorDetails(tutor._id)}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Tutor Image - Mobile */}
                    <div className="md:hidden w-full h-40 bg-[#9BA4B4]">
                      <img 
                        src={`${API}/${tutor.profilePicture || "/api/placeholder/150/150"}`} 
                        alt={tutor.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>

                    {/* Tutor Image - Desktop */}
                    <div className="hidden md:block md:w-2/4 md:h-auto">
                      <img 
                        src={`${API}/${tutor.profilePicture || "/api/placeholder/150/150"}`} 
                        alt={tutor.name} 
                        className="w-full h-full object-cover rounded-xl" 
                      />
                    </div>

                    {/* Tutor Info */}
                    <div className="p-4 w-full">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-[#14274E]">{tutor.name}</h3>
                          <p className="text-[#394867]">{tutor.profession}</p>
                          <div className="flex items-center mt-1 text-[#394867]">
                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                            <span className="ml-1">{tutor.rating?.average || 'New'}</span>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 md:text-right">
                          <p className="text-2xl font-bold text-[#14274E]">₹{tutor.price}</p>
                          <p className="text-sm text-[#9BA4B4]">per hour</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {tutor.subjects?.map((subject, idx) => (
                            <span key={idx} className="px-2 py-1 bg-[#F1F6F9] text-[#394867] text-xs rounded-full">
                              {subject}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-[#394867] text-sm mb-3">
                          <MapPin size={14} className="mr-1" />
                          {tutor.location || 'Remote'}
                        </div>
                        <p className="text-sm text-[#394867] line-clamp-2 mb-4">{tutor.about}</p>
                        <button className="w-full md:w-auto bg-[#14274E] hover:bg-[#394867] text-white py-2 px-6 rounded-full transition">
                          Book a Session
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {tutors.length === 0 && !loading && (
                <div className="bg-white p-8 rounded-xl text-center">
                  <p className="text-lg text-[#394867]">No tutors found matching your criteria.</p>
                  <button 
                    onClick={resetFilters}
                    className="mt-4 bg-[#394867] text-white py-2 px-6 rounded-lg hover:bg-[#14274E] transition"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tutor Detail Modal */}
      {selectedTutor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-[#14274E]">{selectedTutor.name}</h2>
                <button 
                  onClick={() => setSelectedTutor(null)}
                  className="text-[#394867] hover:text-[#14274E]"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <img 
                    src={`${API}/${selectedTutor.profilePicture || "/api/placeholder/150/150"}`} 
                    alt={selectedTutor.name} 
                    className="w-full rounded-xl"
                  />
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <Star size={18} className="text-yellow-400 fill-yellow-400 mr-2" />
                      <span className="font-medium">{selectedTutor.rating?.average || 'New'} ({selectedTutor.rating?.count || 0} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={18} className="mr-2 text-[#394867]" />
                      <span>{selectedTutor.location || 'Remote'}</span>
                    </div>
                    <p className="text-2xl font-bold text-[#14274E] mt-2">${selectedTutor.price}/hr</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-lg text-[#14274E] mb-2">About</h3>
                  <p className="text-[#394867] mb-4">{selectedTutor.about}</p>
                  <h3 className="font-semibold text-lg text-[#14274E] mb-2">Subjects</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedTutor.subjects?.map((subject, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#F1F6F9] text-[#394867] rounded-full">
                        {subject}
                      </span>
                    ))}
                  </div>
                  {selectedTutor.bookings && (
                    <>
                      <h3 className="font-semibold text-lg text-[#14274E] mb-2">Upcoming Sessions</h3>
                      <div className="space-y-2 mb-4">
                        {selectedTutor.bookings.filter(b => b.status === 'confirmed').map((booking, idx) => (
                          <div key={idx} className="bg-[#F1F6F9] p-3 rounded-lg">
                            <p className="font-medium">{new Date(booking.date).toLocaleString()}</p>
                            <p className="text-sm text-[#394867]">Status: {booking.status}</p>
                          </div>
                        ))}
                        {selectedTutor.bookings.filter(b => b.status === 'confirmed').length === 0 && (
                          <p className="text-[#394867]">No upcoming sessions</p>
                        )}
                      </div>
                    </>
                  )}
                  <button onClick={() => {
                    navigate("/tutor/" + selectedTutor._id)
                  }} className="w-full bg-[#14274E] hover:bg-[#394867] text-white py-3 rounded-xl transition font-medium mt-4">
                    Book a Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorFilterPage;