// import React from 'react';

// function FilterComponent({ filters, setFilters }) {
//   const handleSubjectChange = (e) => {
//     setFilters({ ...filters, subject: e.target.value });
//   };

//   const handleLocationChange = (e) => {
//     setFilters({ ...filters, location: e.target.value });
//   };

//   const handleMinCostChange = (e) => {
//     setFilters({ ...filters, cost: { ...filters.cost, min: parseInt(e.target.value) || 0 } });
//   };

//   const handleMaxCostChange = (e) => {
//     setFilters({ ...filters, cost: { ...filters.cost, max: parseInt(e.target.value) || 100 } });
//   };

//   return (
//     <div className="bg-tertiary p-4 rounded shadow-sm">
//       <h2 className="text-primary font-semibold mb-4">Filters</h2>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-primary">Subject</label>
//         <select value={filters['subject']} onChange={handleSubjectChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
//           <option value="">All</option>
//           <option value="math">Math</option>
//           <option value="science">Science</option>
//           <option value="english">English</option>
//           <option value="history">History</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-primary">Location</label>
//         <input type="text" value={filters['location']} onChange={handleLocationChange} placeholder="Enter location" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-primary">Cost</label>
//         <div className="flex space-x-2">
//           <input type="number" value={filters.cost.min} onChange={handleMinCostChange} placeholder="Min" className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
//           <input type="number" value={filters.cost.max} onChange={handleMaxCostChange} placeholder="Max" className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FilterComponent;