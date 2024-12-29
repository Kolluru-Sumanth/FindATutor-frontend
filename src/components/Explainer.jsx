import React from "react";

const Explainer = () => {
  return (
    <div>
      <div className="p-7"></div>
      <div className="w-full max-w-6xl rounded-xl bg-gradient-to-b from-[#F1F6F9] to-[#FFFFFF] shadow-2xl p-12 mx-auto">
        <h2 className="text-center text-5xl font-bold text-[#2B2B2F] mb-8">
          Unlock Your Potential with Expert Tutors
        </h2>
        <p className="text-xl text-[#5F5D6B] text-center mb-10">
          Ready to master a new subject, boost your grades, or acquire in-demand skills? With personalized, 1-on-1 tutoring, you'll have access to top experts who are dedicated to helping you succeed. Whether you’re aiming for academic excellence or enhancing your career, our tutors are here to guide you every step of the way. Achieve your goals with FindATutor by your side.
        </p>

        <div className="flex flex-wrap space-y-6">
          <div className="flex items-center text-[#5F5D6B] text-xl font-semibold w-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" height="20" width="20" className="mr-3">
              <rect fill="black" rx="8" height="16" width="16"></rect>
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="white" d="M5 8.5L7.5 10.5L11 6"></path>
            </svg>
            <span>Thousands of expert tutors</span>
          </div>
          <div className="flex items-center text-[#5F5D6B] text-xl font-semibold w-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" height="20" width="20" className="mr-3">
              <rect fill="black" rx="8" height="16" width="16"></rect>
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="white" d="M5 8.5L7.5 10.5L11 6"></path>
            </svg>
            <span>Customizable plans</span>
          </div>
          <div className="flex items-center text-[#5F5D6B] text-xl font-semibold w-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" height="20" width="20" className="mr-3">
              <rect fill="black" rx="8" height="16" width="16"></rect>
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="white" d="M5 8.5L7.5 10.5L11 6"></path>
            </svg>
            <span>Free trial sessions</span>
          </div>
          <div className="flex items-center text-[#5F5D6B] text-xl font-semibold w-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" height="20" width="20" className="mr-3">
              <rect fill="black" rx="8" height="16" width="16"></rect>
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="white" d="M5 8.5L7.5 10.5L11 6"></path>
            </svg>
            <span>One-on-one sessions</span>
          </div>
          <div className="flex items-center text-[#5F5D6B] text-xl font-semibold w-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" height="20" width="20" className="mr-3">
              <rect fill="black" rx="8" height="16" width="16"></rect>
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="white" d="M5 8.5L7.5 10.5L11 6"></path>
            </svg>
            <span>Flexible learning</span>
          </div>
          <div className="flex items-center text-[#5F5D6B] text-xl font-semibold w-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" height="20" width="20" className="mr-3">
              <rect fill="black" rx="8" height="16" width="16"></rect>
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="white" d="M5 8.5L7.5 10.5L11 6"></path>
            </svg>
            <span>98% satisfaction rate</span>
          </div>
        </div>
      </div>
      <div className="p-10"></div>
    </div>
  );
};

export default Explainer;
