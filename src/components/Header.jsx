import React, { useState } from "react";
import SignIn from "./SignIn"; // Assuming SignIn is another component

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false); // State to manage modal visibility

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-transparent text-[#F1F6F9]">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-[#394867]">
          <a href="/" className="hover:text-[#14274E]">
            TutorFinder
          </a>
        </div>

        {/* Right: Buttons */}
        <div className="space-x-4">
          {/* Become A Tutor Button */}
          <button className="relative py-2 px-8 text-black text-base font-bold rounded-full overflow-hidden bg-white shadow-md transition-all duration-400 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#394867] before:to-[#14274E] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
            Become A Tutor
          </button>

          {/* Sign In Button */}
          <button
            onClick={() => setShowSignIn(true)} // Show modal on click
            className="relative py-2 px-8 text-[#F1F6F9] text-base font-bold rounded-full overflow-hidden bg-[#14274E] shadow-md transition-all duration-400 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#394867] before:to-[#9BA4B4] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Modal for Sign In */}
      {showSignIn && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-auto">
      <SignIn /> {/* Render SignIn component */}
      <button
        onClick={() => setShowSignIn(false)} // Close modal
        className="mt-4 px-4 py-2 bg-[#394867] text-white rounded-full hover:bg-[#14274E]"
      >
        Close
      </button>
    </div>
  </div>
)}

    </>
  );
};

export default Header;
