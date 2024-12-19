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
import React, { useState, useTransition } from "react";
import { FaRegClock, FaPhoneAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    startTransition(() => {
      router.push(path);
    });
  };

  const handleGoContact=()=>{
    router.push("contactus");
  }

  const isActive = (path: string) =>
    pathname === path
      ? "font-bold underline text-blue-500" 
      : "text-gray-800";

  return (
    <>
      {/* Loader */}
      {isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="spinner border-t-blue-500 border-4 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Top Section */}
      <div className="h-10 bg-[#F9F9FE] flex items-center justify-between px-4 md:px-[10%] text-sm md:text-base">
        <div className="flex flex-wrap gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <FaRegClock />
            <p>Mon-Fri 08:00 - 17:00</p>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <FaPhoneAlt />
            <p>+91 9193700050</p>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <p>Request an Estimate</p>
          <MdKeyboardDoubleArrowRight className="cursor-pointer transform hover:scale-125 transition-transform duration-200 h-5 w-5 md:h-6 md:w-6"
            onClick={handleGoContact}
          />
        </div>
      </div>

      {/* Main Header Section */}
      <div className="flex flex-wrap items-center justify-between h-auto md:h-35 w-full px-4 md:px-[10%] py-4 md:py-0">
        <div className="flex justify-between items-center w-full md:w-auto mb-4 md:mb-0">
          <Image
            src="/menrol-logo.png"
            alt="Logo"
            className="h-16 w-auto md:h-20 md:w-auto cursor-pointer hover:scale-105"
            onClick={() => handleNavigation("/")}
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
          className={`${isMenuOpen ? "flex" : "hidden"
            } flex-col md:flex md:flex-row md:justify-end items-center space-y-4 md:space-y-0 space-x-0 md:space-x-6 text-md md:text-md w-full md:w-auto`}
        >
          <button
            onClick={() => handleNavigation("/")}
            className={`${isActive("/")}`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/about")}
            className={`${isActive("/about")}`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavigation("/ServiceDetails")}
            className={`${isActive("/ServiceDetails")}`}
          >
            Services
          </button>
          <button
            onClick={() => handleNavigation("/careers")}
            className={`${isActive("/careers")}`}
          >
            Careers
          </button>
          <button
            onClick={() => handleNavigation("/contactus")}
            className={`${isActive("/contactus")}`}
          >
            Contact Us
          </button>

          {/* <button className="bg-[#0054A5] text-white h-10 md:h-[6vh] w-32 md:w-40 rounded-full mt-4 md:mt-0">
            Signup/Login
          </button> */}
        </div>
      </div>
      <hr />
    </>
  );
};

export default Header;
