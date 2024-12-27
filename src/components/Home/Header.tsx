"use client";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { FaRegClock, FaPhoneAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

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
      ? "font-bold  text-blue-500" 
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
      <div className="h-10 bg-[#F9F9FE] text-black flex items-center justify-between xsm:p-10 px-4 md:px-[10%] text-sm md:text-base">
        <div className="flex flex-wrap gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <FaRegClock />
            <p className="font-dm-sans tracking-wide xsm:text-[10px] leading-relaxed">Mon-Fri 08:00 - 17:00</p>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <FaPhoneAlt />
            <p className="font-dm-sans tracking-wide xsm:text-[10px] leading-relaxed">+91 9193700050</p>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <p className="font-dm-sans tracking-wide xsm:text-[10px] leading-relaxed">Request an Estimate</p>
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
          <Link
              href="/"
            className={`${isActive("/")} font-dm-sans tracking-wide leading-relaxed`}
          >
            Home
          </Link>
          <Link
              href="/about"
            className={`${isActive("/about")} font-dm-sans tracking-wide leading-relaxed`}
          >
            About Us
          </Link>
          <Link
            href="/ServiceDetails"
           
            className={`${isActive("/ServiceDetails")} font-dm-sans tracking-wide leading-relaxed`}
          >
            Services
          </Link>
          <Link
            href="/careers"
            className={`${isActive("/careers")} font-dm-sans tracking-wide leading-relaxed`}
          >
            Careers
          </Link>
          <Link
            href="/contactus"
            className={`${isActive("/contactus")} font-dm-sans tracking-wide leading-relaxed`}
          >
            Contact Us
          </Link>

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
