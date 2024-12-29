import React, { useState, useEffect } from "react";

const Profiles = () => {
  const [users, setUsers] = useState([]);

  // Fetch user data from Random User API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=12"); // Fetch 8 users
        const data = await response.json();
        setUsers(data.results); // Store the entire user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="px-4 py-8">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-center text-[#394867] mb-8">
        Get started with our top tutors
      </h2>

      <div className="grid grid-cols-4 gap-8">
        {users.map((user, index) => (
          <div
            key={index}
            className="w-full max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-lg"
          >
            {/* Profile Image */}
            <div className="relative">
              <img
                className="w-full h-48 object-cover"
                src={user.picture.large}
                alt={`Profile ${index + 1}`}
              />
            </div>

            {/* Dynamic Profile Details */}
            <div className="px-6 py-4">
              <div className="text-xl font-semibold text-gray-800">
                {`${user.name.first} ${user.name.last}`} {/* Display dynamic name */}
              </div>
              <p className="text-gray-600">{user.location.country}</p> {/* Example additional info */}
            </div>

            {/* Static Tags */}
            <div className="px-6 py-4">
              <span className="inline-block px-2 py-1 font-semibold text-teal-900 bg-teal-200 rounded-full">
                Web
              </span>
              <span className="inline-block px-2 py-1 font-semibold text-indigo-900 bg-indigo-200 rounded-full">
                UI/UX
              </span>
              <span className="inline-block px-2 py-1 font-semibold text-purple-900 bg-purple-200 rounded-full">
                Design
              </span>
            </div>

            {/* Static View Profile Link */}
            <div className="px-6 py-4">
              <a href="#" className="text-blue-500 hover:underline">
                Book a Free Session
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
