"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "../Lodder.css"

const DreamTeam = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoContact = () => {
    setLoading(true);
    router.push("/contactus");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="px-[10%] flex items-center justify-center py-[10vh] xsm:py-0 xsm:px-0 relative xsm:p-9">
      {loading && (
        <div className="absolute top-0 left-0 w-full xsm:w-full xsm:h-gull h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader"></div>
        </div>
      )}
      <div className="bg-[#24232A] rounded-lg h-[50vh] w-full flex flex-col items-center justify-center text-center px-6 shadow-sm">
        <h1 className="text-white text-[48px] xsm:text-[20px] mb-4 font-dm-sans tracking-wide leading-relaxed ">Join Our Dream Team!</h1>
        <p className="text-[#BCBBC9] mb-6 font-dm-sans tracking-wide leading-relaxed md:text-[14px] ">
          Join our expert team and deliver top-notch services that transform lives.
        </p>
        <button
          onClick={handleGoContact} // Add the onClick handler
          className="group relative inline-flex items-center justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 w-[160px] h-[60px]"
        >
          {/* Gradient background (blue tones) */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full transition-all duration-300 group-hover:scale-110 animate-gradient"></div>

          {/* White blur effect */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-white blur-xl"></div>

          {/* Glitter effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="glitter-container">
              <div className="glitter"></div>
              <div className="glitter"></div>
              <div className="glitter"></div>
            </div>
          </div>

          {/* White border with hover effect */}
          <div className="absolute inset-0 rounded-full border-2 border-white opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-300"></div>

          {/* Wave effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="wave"></div>
          </div>

          {/* Button Text with arrow */}
          <span className="relative z-10 flex items-center gap-2">
            <span className="tracking-wider">Join</span>
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M13 7l5 5m0 0l-5 5m5-5H6"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default DreamTeam;
