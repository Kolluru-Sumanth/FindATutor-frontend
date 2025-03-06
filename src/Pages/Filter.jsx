// import React, { useState } from 'react';
// import Header from '../components/Header';
// import FilterComponent from '../components/Filter-page/filter';
// import TutorList from '../components/Filter-page/tutor-list';

// const Filter = () => {
//   const [tutors, setTutors] = useState([
//     {
//       id: 1,
//       name: 'John Doe',
//       profession: 'Math Tutor',
//       subjects: ['math'],
//       location: 'New York',
//       about: 'I am a math tutor with 5 years of experience.',
//       price: 50,
//       profilePicture: 'https://www.sciencefriday.com/wp-content/uploads/2023/10/elon-musk.jpg',
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       profession: 'Science Tutor',
//       subjects: ['science'],
//       location: 'Los Angeles',
//       about: 'I am a science tutor with 3 years of experience.',
//       price: 60,
//       profilePicture: 'https://www.sciencefriday.com/wp-content/uploads/2023/10/elon-musk.jpg',
//     },
//   ]);

//   const [filters, setFilters] = useState({
//     subject: '',
//     location: '',
//     cost: { min: 0, max: 100 },
//   });

//   const filteredTutors = tutors.filter(tutor => {
//     if (filters.subject && !tutor.subjects.includes(filters.subject)) {
//       return false;
//     }
//     if (filters.location && !tutor.location.toLowerCase().includes(filters.location.toLowerCase())) {
//       return false;
//     }
//     if (tutor.price < filters.cost.min || tutor.price > filters.cost.max) {
//       return false;
//     }
//     return true;
//   });

//   return (
//     <div className="bg-background min-h-screen">
//       <Header />
//       <div className="flex p-4">
//         <div className="w-1/4 pr-2">
//           <FilterComponent filters={filters} setFilters={setFilters} />
//         </div>
//         <div className="w-3/4 pl-2">
//           <TutorList tutors={filteredTutors} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filter;


import React, { useState } from 'react';
import { Search, MapPin, Filter, Star, Sliders, X } from 'lucide-react';

const TutorFilterPage = () => {
  const [filters, setFilters] = useState({
    subject: '',
    location: '',
    maxPrice: 100,
    rating: 0,
    availability: [],
  });
  
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  const [tutors, setTutors] = useState([
    {
      id: 1,
      name: "Alex Kim",
      profession: "Math Professor",
      subjects: ["Calculus", "Statistics", "Algebra"],
      location: "New York, NY",
      about: "Math genius with 5+ years teaching experience at NYU. I make complex concepts simple.",
      price: 45,
      rating: 4.9,
      img: "https://www.sciencefriday.com/wp-content/uploads/2023/10/elon-musk.jpg"
    },
    {
      id: 2,
      name: "Zoe Martinez",
      profession: "Physics Teacher",
      subjects: ["Physics", "Chemistry"],
      location: "Remote",
      about: "Physics wizard who breaks down complex theories into bite-sized explanations.",
      price: 38,
      rating: 4.7,
      img: "/api/placeholder/150/150"
    },
    {
      id: 3,
      name: "Jordan Taylor",
      profession: "English Literature Expert",
      subjects: ["English Literature", "Creative Writing", "Essay Writing"],
      location: "Chicago, IL",
      about: "Passionate about literature and helping students find their voice in writing.",
      price: 35,
      rating: 4.8,
      img: "/api/placeholder/150/150"
    },
    {
      id: 4,
      name: "Priya Patel",
      profession: "Computer Science Major",
      subjects: ["Programming", "Web Development", "Data Structures"],
      location: "Remote",
      about: "CS student who can help you debug your code and understand programming concepts.",
      price: 30,
      rating: 4.4,
      img: "https://www.sciencefriday.com/wp-content/uploads/2023/10/elon-musk.jpg"
    }
  ]);
  
  const subjects = ["Math", "Physics", "Chemistry", "Biology", "Computer Science", "History", "English", "Literature", "Economics"];
  const locations = ["Remote", "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Miami, FL"];
  const availabilityOptions = ["Weekdays", "Weekends", "Evenings", "Mornings"];
  
  // Filter tutors based on selected filters
  const filteredTutors = tutors.filter(tutor => {
    return (
      (filters.subject === '' || tutor.subjects.some(s => s.toLowerCase().includes(filters.subject.toLowerCase()))) &&
      (filters.location === '' || tutor.location === filters.location) &&
      (tutor.price <= filters.maxPrice) &&
      (filters.rating === 0 || tutor.rating >= filters.rating)
    );
  });
  
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const toggleAvailability = (option) => {
    if (filters.availability.includes(option)) {
      setFilters({
        ...filters,
        availability: filters.availability.filter(item => item !== option)
      });
    } else {
      setFilters({
        ...filters,
        availability: [...filters.availability, option]
      });
    }
  };
  
  const resetFilters = () => {
    setFilters({
      subject: '',
      location: '',
      maxPrice: 100,
      rating: 0,
      availability: [],
    });
  };
  
  return (
    <div className="min-h-screen bg-[#F1F6F9]">
      {/* Header */}
      <header className="bg-[#14274E] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">TutorMatch</h1>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-[#9BA4B4] transition">Home</a>
            <a href="#" className="hover:text-[#9BA4B4] transition">Tutors</a>
            <a href="#" className="hover:text-[#9BA4B4] transition">How it Works</a>
            <a href="#" className="hover:text-[#9BA4B4] transition">About Us</a>
            <button className="bg-[#394867] hover:bg-[#9BA4B4] transition px-4 py-2 rounded-full">
              Sign In
            </button>
          </div>
          <button className="md:hidden text-white">
            <Filter size={24} />
          </button>
        </div>
      </header>
      
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
            
            {/* Price Range */}
            <div>
              <label className="block mb-2 font-medium text-[#14274E]">
                Max Price: ${filters.maxPrice}/hr
              </label>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                className="w-full h-2 bg-[#9BA4B4] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-[#394867] mt-1">
                <span>$10</span>
                <span>$100</span>
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
                    {rating === 0 ? 'Any' : rating+'+'}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Availability */}
            <div>
              <label className="block mb-2 font-medium text-[#14274E]">Availability</label>
              <div className="grid grid-cols-2 gap-2">
                {availabilityOptions.map((option) => (
                  <button
                    key={option}
                    className={`px-3 py-2 rounded-lg text-sm ${filters.availability.includes(option) ? 'bg-[#394867] text-white' : 'bg-[#F1F6F9] text-[#394867] border border-[#9BA4B4]'}`}
                    onClick={() => toggleAvailability(option)}
                  >
                    {option}
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
            <p className="font-medium">{filteredTutors.length} tutors found</p>
          </div>
          
          {/* Tutor Cards */}
          <div className="space-y-4">
            {filteredTutors.map((tutor) => (
              <div key={tutor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row">
                  {/* Tutor Image - Mobile */}
                  <div className="md:hidden w-sm h-40 bg-[#9BA4B4]">
                    <img src={tutor.img} alt={tutor.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Tutor Image - Desktop */}
                  <div className="hidden  md:block md:w-2/4 md:h-auto ">
                    <img src={tutor.img} alt={tutor.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  
                  {/* Tutor Info */}
                  <div className="p-4 w-full">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#14274E]">{tutor.name}</h3>
                        <p className="text-[#394867]">{tutor.profession}</p>
                        
                        <div className="flex items-center mt-1 text-[#394867]">
                          <Star size={16} className="text-yellow-400 fill-yellow-400" />
                          <span className="ml-1">{tutor.rating}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 md:mt-0 md:text-right">
                        <p className="text-2xl font-bold text-[#14274E]">${tutor.price}</p>
                        <p className="text-sm text-[#9BA4B4]">per hour</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {tutor.subjects.map((subject, idx) => (
                          <span key={idx} className="px-2 py-1 bg-[#F1F6F9] text-[#394867] text-xs rounded-full">
                            {subject}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-[#394867] text-sm mb-3">
                        <MapPin size={14} className="mr-1" />
                        {tutor.location}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorFilterPage;