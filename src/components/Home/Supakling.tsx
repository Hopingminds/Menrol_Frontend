"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PiBuildingsBold } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import {FaArrowRightLong } from "react-icons/fa6";

// interface Service {
//   id: number;
//   category: string;
//   subcategory: Array<{
//     title: string;
//     image: string;
//   }>;
// }

const Supakling: React.FC = () => {
  // const [services, setServices] = useState<Service[]>([]);
  const router = useRouter();
  const [hover, setHover] = useState(false);

  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://api.menrol.com/api/v1/getServices"
  //       );
  //       const data = await response.json();
  //       // setServices(data.all || []);
  //     } catch (error) {
  //       console.error("Error fetching services:", error);
  //     }
  //   };

  //   fetchServices();
  // }, []);

  const handleService = () => {
    router.push("/ServiceDetails");
  };
  const HandleGoServices = () => {
    router.push("/ServiceDetails");
  };


  return (
    <div>
      <div className="min-h-screen pt-10 bg-gray-50 px-[4%]">
      
      <div className="flex flex-col items-center justify-center px-[10%] xsm:my-[3rem] md:my-[10vh] md:pt-5">
        {/* Buttons Section */}
        <div className="flex xsm:flex-col xsm:space-x-0 xsm:gap-4 xsm:items-center xsm:justify-center space-x-8">
          {/* Commercial Plumbing Button */}
          <button onClick={HandleGoServices} className="flex items-center space-x-3 md: px-16 xsm:px-5 py-5 bg-black text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            {/* Icon */}
            <div className="w-8 h-8">
              <PiBuildingsBold className="text-3xl xsm:text-base" />
            </div>
            {/* Text */}
            <span className="lg:text-lg  xsm:text-base font-medium">Commercial Services</span>
          </button>

          {/* Residential Plumbing Button */}
          <button onClick={HandleGoServices} className="flex items-center xsm:w-full space-x-3 xsm:px-5 px-16 py-5 bg-[#0054A5] text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            {/* Icon */}
            <div className="w-8 h-8 flex items-center justify-center rounded">
              <IoLocationOutline className="text-3xl xsm:text-base" />
            </div>
            {/* Text */}
            <span className="text-lg xsm:text-base font-medium">Residential Services</span>
          </button>
        </div>
      </div>

      <section className="flex flex-col lg:flex-row items-center justify-between px-[10%] lg:px-20 py-12 bg-white">
        {/* Left Section - Image */}
        <div className="relative w-full flex justify-center items-center lg:w-1/2">
          <Image
            src="/Images/laptop.webp"
            alt="Placeholder"
            className="w-full -ml-40 xsm:ml-3"
            height={1000}
            width={1000}
          />
          {/* Floating Elements */}
          <div className="absolute top-20 left-4 xsm:left-9">
            <Image
              src="/Images/glob.webp"
              alt="glob"
              className="w-full xsm:w-10"
              height={50}
              width={50}
            />
          </div>
          <div className="absolute bottom-20 right-20 xsm:right-3">
            <Image
              src="/Images/about.webp"
              alt="about"
              className="w-full xsm:w-10"
              height={50}
              width={50}
            />
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:flex md:flex-col md:items-center lg:items-start lg:w-1/2 mt-12 lg:mt-0 text-center lg:text-left">
          <p className="text-sm text-gray-500 flex items-center justify-center lg:justify-start">
            We are{" "}
            <span className="bg-pink-100 text-pink-600 font-medium px-2 py-1 ml-2 rounded-full">
              Menrol Force
            </span>
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-4">
            Our Commitment to Excellence
          </h1>
          <p className="text-gray-600 mt-4">
            At MenrolForce, client satisfaction is our top priority. We focus on
            delivering skilled solutions that drive success for every project.
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-6 space-y-2">
            <li>Build Better, Together.</li>
            <li>Empowering your projects to achieve excellence.</li>
            <li>Helping you transform visions into reality.</li>
          </ul>
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mt-6">
            {/* Get Started Button */}
            <div className="">
              <button
                className="bg-[#0054A5] h-12 text-white px-6 py-3 rounded-xl w-[12rem] shadow-lg  hover:shadow-xl transform active:scale-95 relative overflow-hidden"
                onClick={handleService}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <div className="relative h-full flex flex-col justify-center items-center">
                  {/* First Span */}
                  <span
                    className={`absolute flex items-center justify-center gap-3 transition-all duration-300 -ml-2 ${hover ? "translate-y-[-130%]" : "translate-y-0"
                      }`}
                  >
                    Get Started
                  </span>
                  {/* Second Span */}
                  <span
                    className={`absolute flex items-center justify-center gap-3  transition-all duration-300 -ml-2 ${hover ? "translate-y-0" : "translate-y-[130%]"
                      }`}
                  >
                    Get Started
                  </span>
                </div>
                <span className="absolute right-9 top-4">
                  <FaArrowRightLong className="-rotate-45" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Supakling;
