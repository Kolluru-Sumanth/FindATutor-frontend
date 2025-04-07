// import React from 'react';

// function TutorList({ tutors }) {
//   if (tutors.length === 0) {
//     return <p className="text-gray-500 p-4">No tutors found.</p>;
//   }
//   return (
//     <div className="tutor-list p-4">
//       {tutors.map(tutor => (
//         <div key={tutor.id} className="tutor-card border border-tertiary p-4 mb-4 flex hover:shadow-md shadow-sm rounded-md">
//           <img src={tutor.profilePicture} alt="Profile picture" className="w-16 h-16 rounded-full mr-4" />
//           <div className="tutor-info flex-1">
//             <h3 className="text-primary font-semibold mb-2">{tutor.name}</h3>
//             <p className="text-gray-500 mb-2">{tutor.profession}</p>
//             <p className="text-gray-500 mb-2">Subjects: {tutor.subjects.join(', ')}</p>
//             <p className="text-gray-500 mb-2">Location: {tutor.location}</p>
//             <p className="text-gray-500 mb-2">About: {tutor.about}</p>
//             <p className="text-primary font-semibold mb-2">Price: ${tutor.price}/hour</p>
//             <button className="bg-primary text-white py-2 px-4 rounded hover:brightness-110">Book a Session</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TutorList;