// import React, { useState, useEffect } from 'react';
// import FilterComponent from './FilterComponent';
// import TutorList from './TutorList';
// import axios from 'axios'; // Make sure to install axios

// function TutorFinder() {
//   // State for tutors and loading
//   const [tutors, setTutors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   // State for filters
//   const [filters, setFilters] = useState({
//     subject: '',
//     location: '',
//     cost: {
//       min: 0,
//       max: 100
//     }
//   });

//   // Fetch tutors based on filters
//   const fetchTutors = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       // Build query parameters from filters
//       const params = new URLSearchParams();
//       if (filters.subject) params.append('subject', filters.subject);
//       if (filters.location) params.append('location', filters.location);
//       if (filters.cost.min) params.append('minPrice', filters.cost.min);
//       if (filters.cost.max) params.append('maxPrice', filters.cost.max);
      
//       // Make API request
//       const response = await axios.get(`/api/tutors?${params.toString()}`);
//       setTutors(response.data);
//     } catch (err) {
//       setError('Failed to load tutors. Please try again later.');
//       console.error('Error fetching tutors:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch tutors on initial load and when filters change
//   useEffect(() => {
//     fetchTutors();
//   }, [filters]);

//   return (
//     <div className="tutor-finder container mx-auto p-4">
//       <h1 className="text-2xl font-bold text-primary mb-6">Find Your Perfect Tutor</h1>
      
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Sidebar with filters */}
//         <div className="w-full md:w-1/4">
//           <FilterComponent 
//             filters={filters} 
//             setFilters={setFilters} 
//           />
//         </div>
        
//         {/* Main content with tutor list */}
//         <div className="w-full md:w-3/4">
//           {loading ? (
//             <div className="flex justify-center p-8">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//             </div>
//           ) : error ? (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//               {error}
//             </div>
//           ) : (
//             <TutorList tutors={tutors} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TutorFinder;