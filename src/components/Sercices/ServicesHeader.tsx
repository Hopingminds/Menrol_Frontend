import Image from "next/image";
import React from "react";
import { BiSolidOffer } from "react-icons/bi";

const ServicesHeader = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row px-[10%] py-10">
        {/* Left Section: Image */}
        <div className="md:w-1/2 flex  items-center mb-10 md:mb-0">
          <Image
            src="/Images/Services_01.png"
            alt="Service Image"
            className="w-full max-w-[300px] h-[60vh] rounded-lg shadow-lg object-cover"
            height={400}
            width={400}
          />
        </div>

        {/* Right Section: Text Content */}
        <div className="md:w-full space-y-6">
          {/* Discount */}
          <div className="flex flex-row justify-between items-center">
            <div className="bg-[#C1F458] text-black text-[14px] px-3 rounded-full h-8 flex items-center">
              <span className="pr-2">
                <BiSolidOffer />
              </span>
              <p>Discount 50%</p>
            </div>

            {/* Price */}
            <div className="text-2xl font-semibold flex flex-row items-end">
              <span className="line-through text-gray-500 text-[14px] p-2 ">
                $700
              </span>
              <span className="text-[#24232A] ">$350</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-gray-800 font-dm-sans tracking-wide leading-relaxed">
            Home Cleaning
          </h2>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-serif font-dm-sans tracking-wide leading-relaxed">Rating:</span>
            <div className="flex space-x-1 text-[#C1F458]">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <span key={index}>&#9733;</span> // Unicode star icon
                ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 max-w-[40vw] font-dm-sans tracking-wide leading-relaxed">
            Purus vel lacus erat iaculis augue sed mauris mauris. Dolor sit
            purus adipiscing amet et cras. Nulla volutpat purus pellentesque
            amet pharetra. Nulla ut sit odio integer hac. Sit cras vestibulum
            amet nibh faucibus proin.
          </p>

          {/* Order Now Button */}
          <div className="py-[9vh]">

          <button className="bg-[#0054A5] text-white font-semibold px-6 items-center rounded-full h-[6vh] shadow hover:bg-blue-700 font-dm-sans tracking-wide leading-relaxed">
            Order Now
          </button>
          </div>
        </div>
      </div>

      {/* Company Logos */}
      <div className="pt-6 px-[20%] ">
      <div className="border-b-2 pb-10">
        <h3 className="text-lg font-semibold mb-4 font-dm-sans tracking-wide leading-relaxed">Our Trusted Partners</h3>
        <div className="flex justify-between items-center space-x-4 ">
          {[
            "Images/CompaniesLogo/logo-1.png",
            "Images/CompaniesLogo/logo-2.png",
            "Images/CompaniesLogo/logo-3.png",
            "Images/CompaniesLogo/logo-4.png",
            "Images/CompaniesLogo/logo-5.png",
          ].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Company Logo ${index + 1}`}
              className="w-20 h-auto"
            />
          ))}
          
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default ServicesHeader;
