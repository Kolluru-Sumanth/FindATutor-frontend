import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#394867] text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-3xl font-bold">TutorFinder</h3>
            <p className="text-sm mt-2">
              Your trusted source to find highly-vetted mentors & industry professionals to move your career ahead.
            </p>
          </div>

          {/* Middle Section */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-[#F1F6F9]">Home</a>
            <a href="#" className="hover:text-[#F1F6F9]">About Us</a>
            <a href="#" className="hover:text-[#F1F6F9]">Services</a>
            <a href="#" className="hover:text-[#F1F6F9]">Contact</a>
          </div>

          {/* Right Section */}
          <div className="text-sm">
            <p>&copy; 2024 TutorFinder. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
