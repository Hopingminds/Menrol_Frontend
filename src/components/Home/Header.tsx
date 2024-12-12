// "use client";

// import Image from "next/image";
// import React, { useState } from "react";
// import { FaRegClock, FaPhoneAlt } from "react-icons/fa";
// import { MdKeyboardDoubleArrowRight } from "react-icons/md";
// import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <>
//       {/* Top Section */}
//       <div className="h-10 bg-[#F9F9FE] flex items-center justify-between px-4 md:px-[10%] text-sm md:text-base">
//         {/* Left Section */}
//         <div className="flex flex-wrap gap-2 md:gap-4">
//           <div className="flex items-center gap-1 md:gap-2">
//             <FaRegClock />
//             <p>Mon-Fri 08.00 - 17.00</p>
//           </div>
//           <div className="flex items-center gap-1 md:gap-2">
//             <FaPhoneAlt />
//             <p>+91 08.00 - 17.00</p>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-1 md:gap-2">
//           <p>Request an Estimate</p>
//           <MdKeyboardDoubleArrowRight className="cursor-pointer transform hover:scale-125 transition-transform duration-200 h-5 w-5 md:h-6 md:w-6" />
//         </div>
//       </div>

//       {/* Main Header Section */}
//       <div className="flex flex-wrap items-center justify-between h-auto md:h-35 w-full px-4 md:px-[10%] py-4 md:py-0">
//         {/* Logo Section */}
//         <div className="flex justify-between items-center w-full md:w-auto mb-4 md:mb-0">
//           <Image
//             src="/menrol-logo.png"
//             alt="Logo"
//             className="h-16 w-16 md:h-20 md:w-30"
//             height={100}
//             width={100}
//           />
//           <button
//             className="md:hidden text-gray-800"
//             onClick={toggleMenu}
//           >
//             {isMenuOpen ? <HiOutlineX className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <div
//           className={`${
//             isMenuOpen ? "flex" : "hidden"
//           } flex-col md:flex md:flex-row md:justify-end items-center space-y-4 md:space-y-0 space-x-0 md:space-x-6 text-gray-800 text-sm md:text-lg w-full md:w-auto`}
//         >
//           <p className="hover:text-blue-500 cursor-pointer">Home</p>
//           <p className="hover:text-blue-500 cursor-pointer">About Us</p>
//           <p className="hover:text-blue-500 cursor-pointer">Services</p>
//           <p className="hover:text-blue-500 cursor-pointer">Careers</p>
//           <p className="hover:text-blue-500 cursor-pointer">Contact Us</p>

//           {/* Button */}
//           <button className="bg-[#0054A5] text-white h-10 md:h-[6vh] w-32 md:w-40 rounded-full mt-4 md:mt-0">
//             Signup/Login
//           </button>
//         </div>
//       </div>
//       <hr />
//     </>
//   );
// };

// export default Header;

// components/Home/Header.tsx
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaRegClock, FaPhoneAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import NavigationButton from "@/components/NavigationButton";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Top Section */}
      <div className="h-10 bg-[#F9F9FE] flex items-center justify-between px-4 md:px-[10%] text-sm md:text-base">
        {/* Left Section */}
        <div className="flex flex-wrap gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <FaRegClock />
            <p>Mon-Fri 08.00 - 17.00</p>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <FaPhoneAlt />
            <p>+91 08.00 - 17.00</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 md:gap-2">
          <p>Request an Estimate</p>
          <MdKeyboardDoubleArrowRight className="cursor-pointer transform hover:scale-125 transition-transform duration-200 h-5 w-5 md:h-6 md:w-6" />
        </div>
      </div>

      {/* Main Header Section */}
      <div className="flex flex-wrap items-center justify-between h-auto md:h-35 w-full px-4 md:px-[10%] py-4 md:py-0">
        {/* Logo Section */}
        <div className="flex justify-between items-center w-full md:w-auto mb-4 md:mb-0">
          <Image
            src="/menrol-logo.png"
            alt="Logo"
            className="h-16 w-16 md:h-20 md:w-30"
            height={100}
            width={100}
          />
          <button className="md:hidden text-gray-800" onClick={toggleMenu}>
            {isMenuOpen ? (
              <HiOutlineX className="h-6 w-6" />
            ) : (
              <HiOutlineMenu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row md:justify-end items-center space-y-4 md:space-y-0 space-x-0 md:space-x-6 text-gray-800 text-sm md:text-lg w-full md:w-auto`}
        >
          <NavigationButton path="/" label="Home" />
          <NavigationButton path="/about" label="About Us" />
          <NavigationButton path="/services" label="Services" />
          <NavigationButton path="/careers" label="Careers" />
          <NavigationButton path="/contact" label="Contact Us" />

          {/* Button */}
          <button className="bg-[#0054A5] text-white h-10 md:h-[6vh] w-32 md:w-40 rounded-full mt-4 md:mt-0">
            Signup/Login
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Header;
