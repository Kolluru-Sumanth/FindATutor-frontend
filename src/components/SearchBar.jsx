import React, { useEffect, useState } from "react";

const SearchComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Wait for 1 second, then set the title to be visible
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // 1000ms = 1 second
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <section className="flex items-center justify-center w-full h-[60vh] bg-[#F1F6F9] bg-cover bg-center relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex justify-center items-center z-0 text-[#394867] opacity-5 text-9xl font-bold transform -rotate-45">
        <div className="text-center">
          ∑ ∞ π α β γ δ λ Σ Δ φ Ω 𝛼 𝛽 𑀅 𑀖 𑀮 𑀲 𑀺 𑄖 𑄘 𑄝 𑄞
          <br />
          あ い 𑂮 か き श け こ क し す せ
        </div>
        <div className="text-center">
          ∑ ∞ π α β γ δ λ Σ Δ φ Ω 𝛼 𝛽 𑀅 𑀖 𑀮 𑀲 𑀺 𑄖 𑄘 𑄝 𑄞
          <br />
          あ い 𑂮 か き श け こ क し す せ
        </div>
        <div className="text-center">
          ∑ ∞ π α β γ δ λ Σ Δ φ Ω 𝛼 𝛽 𑀅 𑀖 𑀮 𑀲 𑀺 𑄖 𑄘 𑄝 𑄞
          <br />
          あ い 𑂮 か き श け こ क し す せ
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center p-8 w-11/12 max-w-3xl h-full">
        {/* Title with transition for fade-in */}
        <h2
          className={`text-6xl font-bold text-[#394867] mb-6 transition-opacity duration-1000 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-center">1-on-1 Learning</div>
          <div className="text-center">From Aspiration to Success</div>
        </h2>

        {/* Search Bar */}
        <div className="relative w-full mt-4 pt-5">
          <div className="flex items-center w-full">
            {/* Search Icon */}
            <div className="absolute left-3 text-[#394867]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 3a8 8 0 101.5 15.5L21 21l-3-3-6.5-6.5A7.963 7.963 0 0011 3z"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search for a tutor"
              className="w-full py-3 pl-12 pr-4 text-base text-[#394867] rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#394867] focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchComponent;
