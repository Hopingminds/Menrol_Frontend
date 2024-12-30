// "use client";
// import Image from "next/image";
// import React, { useState, useTransition } from "react";
// import { FaPhoneAlt } from "react-icons/fa";
// import { LiaClockSolid } from "react-icons/lia";
// import { MdKeyboardDoubleArrowRight } from "react-icons/md";
// import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// import { usePathname, useRouter } from "next/navigation";
// import Link from "next/link";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();
//   const pathname = usePathname();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleNavigation = (path: string) => {
//     startTransition(() => {
//       router.push(path);
//     });
//   };

//   const handleGoContact = () => {
//     router.push("contactus");
//   };

//   const isActive = (path: string) =>
//     pathname === path ? "font-bold text-blue-500" : "text-gray-800";

//   return (
//     <>
//       {/* Loader */}
//       {isPending && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="spinner border-t-blue-500 border-4 w-12 h-12 rounded-full animate-spin"></div>
//         </div>
//       )}

//       {/* Top Section */}
//       <div className="h-10 bg-[#F9F9FE] text-black flex items-center justify-between xsm:p-10 px-4 md:px-[10%] text-sm md:text-base">
//         <div className="flex flex-wrap gap-2 md:gap-4">
//           <div className="flex items-center gap-1 md:gap-2">
//             <LiaClockSolid className="text-lg" />
//             <p className="font-dm-sans tracking-wide xsm:text-[10px] leading-relaxed">
//               Mon-Fri 08.00-17.00
//             </p>
//           </div>
//           <div className="flex items-center gap-1 md:gap-2">
//             <FaPhoneAlt className="text-base" />
//             <p className="font-dm-sans tracking-wide xsm:text-[10px] leading-relaxed">
//               +91 9193700050
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-1 md:gap-2">
//           <p className="font-dm-sans tracking-wide xsm:text-[10px] leading-relaxed">
//             Request an Estimate
//           </p>
//           <MdKeyboardDoubleArrowRight
//             className="cursor-pointer transform hover:scale-125 transition-transform duration-200 h-5 w-5 md:h-6 md:w-6"
//             onClick={handleGoContact}
//           />
//         </div>
//       </div>

//       {/* Main Header Section */}
//       <div className="flex flex-wrap items-center justify-between h-auto md:h-35 w-full px-4 md:px-[10%] py-4 md:py-0">
//         <div className="flex justify-between items-center w-full md:w-auto mb-4 md:mb-0">
//           <Image
//             src="/menrol-logo.png"
//             alt="Logo"
//             className="h-16 w-auto md:h-20 md:w-auto cursor-pointer hover:scale-105"
//             onClick={() => handleNavigation("/")}
//             height={100}
//             width={100}
//           />
//           <button className="md:hidden text-gray-800" onClick={toggleMenu}>
//             {isMenuOpen ? (
//               <HiOutlineX className="h-6 w-6" />
//             ) : (
//               <HiOutlineMenu className="h-6 w-6" />
//             )}
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <div
//           className={`${isMenuOpen ? "flex" : "hidden"
//             } flex-col md:flex md:flex-row md:justify-end items-center space-y-4 md:space-y-0 space-x-0 md:space-x-6 text-md md:text-md w-full md:w-auto`}
//         >
//           <Link
//             href="/"
//             className={`${isActive(
//               "/"
//             )} font-dm-sans tracking-wide leading-relaxed group`}
//           >
//             <span className="relative">
//               Home
//               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
//             </span>
//           </Link>
//           <Link
//             href="/about"
//             className={`${isActive(
//               "/about"
//             )} font-dm-sans tracking-wide leading-relaxed group`}
//           >
//             <span className="relative">
//               About Us
//               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
//             </span>
//           </Link>
//           <Link
//             href="/ServiceDetails"
//             className={`${isActive(
//               "/ServiceDetails"
//             )} font-dm-sans tracking-wide leading-relaxed group`}
//           >
//             <span className="relative">
//               Services
//               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
//             </span>
//           </Link>
//           <Link
//             href="/careers"
//             className={`${isActive(
//               "/careers"
//             )} font-dm-sans tracking-wide leading-relaxed group`}
//           >
//             <span className="relative">
//               Careers
//               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
//             </span>
//           </Link>
//           <Link
//             href="/contactus"
//             className={`${isActive(
//               "/contactus"
//             )} font-dm-sans tracking-wide leading-relaxed group`}
//           >
//             <span className="relative">
//               Contact Us
//               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
//             </span>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;



"use client";
import Image from "next/image";
import React, { useState, useTransition, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";


interface SearchResult {
  id: string;
  name: string;
  description: string;
  // You can add other properties depending on your API response structure
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Handle Search Input Change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults([]); // Don't search if less than 3 characters
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/search?q=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data.results); // Assuming response is in { results: [...] }
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
    };

    // Debounce the API call to avoid too many requests
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500); // Adjust the delay time as needed

    return () => clearTimeout(delayDebounceFn); // Cleanup on component unmount
  }, [searchQuery]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    startTransition(() => {
      router.push(path);
    });
  };

  const handleGoContact = () => {
    router.push("contactus");
  };

  const isActive = (path: string) =>
    pathname === path ? "font-bold text-blue-500" : "text-gray-800";

  return (
    <>
      {/* Loader */}
      {isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="spinner border-t-blue-500 border-4 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Top Section */}
      {/* <div className="h-10 bg-[#F9F9FE] text-black flex items-center justify-between xsm:p-10 px-4 md:px-[10%] text-sm md:text-base">
        <div className="flex flex-wrap gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <LiaClockSolid className="text-lg" />
            <p className="font-dm-sans tracking-wide xsm:text-[10px] leading-relaxed">
              Mon-Fri 08.00-17.00
            </p>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <FaPhoneAlt className="text-base" />
            <p className="font-dm-sans tracking-wide xsm:text-[10px] leading-relaxed">
              +91 9193700050
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <p className="font-dm-sans tracking-wide xsm:text-[10px] leading-relaxed">
            Request an Estimate
          </p>
          <MdKeyboardDoubleArrowRight
            className="cursor-pointer transform hover:scale-125 transition-transform duration-200 h-5 w-5 md:h-6 md:w-6"
            onClick={handleGoContact}
          />
        </div>
      </div> */}

      {/* Main Header Section */}
      {/* <div className="flex flex-wrap items-center justify-between h-auto md:h-35 w-full px-4 md:px-[10%] py-4 md:py-0">
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
        </div> */}

      {/* Navigation Links */}
      {/* <div
          className={`${isMenuOpen ? "flex" : "hidden"
            } flex-col md:flex md:flex-row md:justify-end items-center space-y-4 md:space-y-0 space-x-0 md:space-x-6 text-md md:text-md w-full md:w-auto`}
        >
          <Link
            href="/"
            className={`${isActive(
              "/"
            )} font-dm-sans tracking-wide leading-relaxed group`}
          >
            <span className="relative">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </span>
          </Link>
          <Link
            href="/about"
            className={`${isActive(
              "/about"
            )} font-dm-sans tracking-wide leading-relaxed group`}
          >
            <span className="relative">
              About Us
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </span>
          </Link>
          <Link
            href="/ServiceDetails"
            className={`${isActive(
              "/ServiceDetails"
            )} font-dm-sans tracking-wide leading-relaxed group`}
          >
            <span className="relative">
              Services
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </span>
          </Link>
          <Link
            href="/careers"
            className={`${isActive(
              "/careers"
            )} font-dm-sans tracking-wide leading-relaxed group`}
          >
            <span className="relative">
              Careers
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </span>
          </Link>
          <Link
            href="/contactus"
            className={`${isActive(
              "/contactus"
            )} font-dm-sans tracking-wide leading-relaxed group`}
          >
            <span className="relative">
              Contact Us
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </span>
          </Link>
        </div> */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-[10%] bg-white shadow-md">
        {/* Left: Logo Section */}
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <Image
            src="/menrol-logo.png"
            alt="Logo"
            className="h-16 w-auto md:h-20 md:w-auto cursor-pointer hover:scale-105"
            onClick={() => handleNavigation("/")}
            height={100}
            width={100}
          />
        </div>

        {/* Middle: Location Selector */}
        <div className="flex justify-end ml-[40%]">
          <div className="flex flex-1 items-center mx-3 px-2">
            <select
              name="location"
              id="location"
              className="w-full h-10 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none bg-white"
            >
              <option value="">Choose location</option>
              <option value="chandigarh">Chandigarh</option>
              <option value="delhi">Delhi</option>
            </select>
          </div>

          <div className="flex flex-1 items-center mx-6">
            <div className="relative w-full">
              {/* Search Icon */}
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
              {/* Input Field */}
              <input
                type="text"
                placeholder="Search for 'A'"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right: Icons Section */}
        <div className="flex items-center">
          {/* Icon Buttons */}
          <button className="focus:outline-none">
            <CgProfile className="text-xl" />
          </button>
        </div>
      </header>

      {/* </div> */}
    </>
  );
};

export default Header;
