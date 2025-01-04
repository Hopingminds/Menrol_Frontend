import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PiBuildingsBold } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import { FaAnglesRight, FaArrowRightLong } from "react-icons/fa6";

interface Service {
  id: number;
  category: string;
  subcategory: Array<{
    title: string;
    image: string;
  }>;
}

const Supakling: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://api.menrol.com/api/v1/getServices"
        );
        const data = await response.json();
        setServices(data.all || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [services]);
  const HandleGoServicesDetails = () => {
    router.push("/ServiceDetails")
  }

  const getServiceImage = (offset: number) => {
    if (services?.length > 0) {
      const subcategory = services[currentIndex]?.subcategory[offset];
      return subcategory?.image || "";
    }
    return "";
  };

  const handleService = () => {
    router.push("/ServiceDetails");
  };
  const HandleGoServices = () => {
    router.push("/ServiceDetails");
  };

  return (
    <div className="min-h-screen pt-8 bg-gray-50 px-[4%]">
      <div className="max-w-[95%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full min-h-[70vh]">
          {/* Left Column */}
          <div className="flex flex-col justify-center items-center h-full space-y-8">
            <div className="w-full  h-[500px] flex flex-col p-4">
              <div className="font-bold text-navy-900">
                <p className="text-[#24232A] text-[56px] mb-10 xl:text-5xl xl:mt-5 2xl:text-6xl sm:text-4xl xsm:text-[15px] md:text-[30px] font-bold xsm:w-full w-[100%] font-lexend ">
                  Welcome to Menrol Hub
                  Labor Partner!
                  {/* Your Trusted Skilled <br /> */}

                </p>

                {/* <p className="text-[#24232A] text-[56px] mb-10 xl:text-5xl xl:mt-5 2xl:text-6xl sm:text-4xl xsm:text-[15px] md:text-[30px] font-bold xsm:w-full w-[70%] font-lexend tracking-wide">
                  Your Trusted Skilled
                </p> */}

                {/* <p className="text-[#24232A] text-[56px] mb-10 xl:text-5xl xl:mt-5 2xl:text-6xl sm:text-4xl xsm:text-[15px] md:text-[30px] font-bold xsm:w-full w-[70%] font-lexend tracking-wide">
                 Labor Partner!
                </p> */}
              </div>
              <div className="grid grid-cols-2 gap-6 mt-[4vh] ">
                <div className="flex items-center space-x-4 group relative inline-block">
                  <FaAnglesRight className="transition-transform transform group-hover:-translate-x-2 duration-300 cursor-pointer text-blue-600" />

                  <p className="text-gray-600 text-lg">
                    Reliable workers for construction.
                  </p>
                </div>
                <div className="flex items-center space-x-4 group relative inline-block">
                  <FaAnglesRight className="transition-transform transform group-hover:-translate-x-2 duration-300 cursor-pointer text-blue-600" />
                  <p
                    className="text-gray-600 text-lg"
                  // style={{ wordSpacing: "8px", letterSpacing: "0.6px" }}
                  >
                    Skilled professionals for plumbing.
                  </p>
                </div>
                <div className="flex items-center space-x-4 group relative inline-block">
                  <FaAnglesRight className="transition-transform transform group-hover:-translate-x-2 duration-300 cursor-pointer text-blue-600" />
                  <p
                    className="text-gray-600 text-lg"
                  // style={{ wordSpacing: "8px", letterSpacing: "0.6px" }}
                  >
                    Experts for electrical work.
                  </p>
                </div>
                <div className="flex items-center space-x-4 group relative inline-block">
                  <FaAnglesRight className="transition-transform transform group-hover:-translate-x-2 duration-300 cursor-pointer text-blue-600" />
                  <p
                    className="text-gray-600 text-lg"
                    style={{ wordSpacing: "8px", letterSpacing: "0.6px" }}
                  >
                    Professionals for renovation.
                  </p>
                </div>
              </div>

              <div className="flex items-center py-10 mt-6">
                <div className="relative group">
                  <button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 animate-bounce">
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-100 animate-pulse"></span>

                    <span className="relative z-10 block px-6 py-3 rounded-xl bg-[#0054A5]">
                      <div className="relative z-10 flex items-center space-x-2">
                        <span
                          className="transition-all duration-500 translate-x-1 animate-move-text"
                          onClick={HandleGoServices}
                        >
                          Let&apos;s get started
                        </span>
                        <svg
                          className="w-6 h-6 transition-transform duration-500 translate-x-1 animate-move-icon"
                          data-slot="icon"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex items-center justify-center h-[90%] md:h-full xsm:hidden">
            <div className="grid grid-cols-2 grid-rows-2 bg-white rounded-3xl w-full h-full  min-h-[50vh] overflow-hidden ">
              <div
                className="relative bg-cover bg-center flex items-center justify-center group transition-all duration-500"
                style={{ backgroundImage: `url('${getServiceImage(0)}')` }}
              >
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-50"></div>
                <p className="text-white font-bold group-hover:text-white z-10 xsm:text-base text-2xl cursor-pointer w-[50%] text-center">
                  {services.length > 0
                    ? services[currentIndex]?.subcategory[0]?.title
                    : "Loading..."}
                </p>
              </div>

              <div className="bg-orange-500 flex items-center justify-center rounded-l-full space-x-4">
                <div className="text-white font-bold text-center">
                  <p className="text-7xl"></p>
                  <p className="text-xl xsm:text-[12px] xsm:leading-tight xsm:w-[80%]  md:text-base md:p-7 max-w-[200px] mx-auto break-words">
                    Providing Skilled Labor Across Multiple Categories
                  </p>

                  {/* Circles below the second paragraph */}
                  <div className="flex justify-center mt-4 md:mb-2  space-x-[-12px]">
                    {/* First circle with an image */}
                    <div className="xl:w-12 lg:w-8 lg:h-8 xsm:w-8 xsm:h-8 xl:h-12 rounded-full overflow-hidden relative">
                      <Image
                        src="/Images/ServiceImg/Image-6.png"
                        alt="Image 1"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    {/* Second circle with an image */}
                    <div className="xl:w-12 xl:h-12 lg:w-8 lg:h-8 xsm:w-8 xsm:h-8 rounded-full overflow-hidden relative">
                      <Image
                        src="/Images/majdur6.jpg"
                        alt="Image 2"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    {/* Third circle with an image */}
                    <div className="xl:w-12 xl:h-12 lg:w-8 lg:h-8 xsm:w-8 xsm:h-8 rounded-full overflow-hidden relative">
                      <Image
                        src="/Images/majdur5.jpg"
                        alt="Image 3"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    {/* Fourth circle with text */}
                    <div className="xl:w-12 xl:h-12 xsm:w-8 xsm:h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      1k+
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-800 flex flex-col items-center justify-center rounded-tr-[50%] transition-all duration-500">
                <div className="flex items-center group pb-3">
                  <button className="border border-gray-300 w-[13rem] text-white py-3 px-6 text-sm rounded-full group-hover:bg-blue-900 group-hover:text-white"
                    onClick={HandleGoServicesDetails}
                  >
                    {services.length > 0
                      ? services[currentIndex]?.subcategory[0]?.title
                      : "Loading..."}
                  </button>
                  <button className="border border-gray-300 text-white xsm:py-0 xsm:px-2  py-3 px-6 text-sm rounded-full group-hover:bg-blue-800 group-hover:text-white">
                    +
                  </button>
                </div>

                {/* <div className="flex items-center group">
                  <button className="border border-gray-300 text-white py-3 px-6 text-lg rounded-full group-hover:bg-blue-800 group-hover:text-white">
                    +
                  </button>
                  <button className="border border-gray-300 text-white py-3 px-6 text-lg rounded-full group-hover:bg-blue-800 group-hover:text-white">
                    Plumber
                  </button>
                </div> */}

                <div className="flex items-center group pt-2">
                  <button className="border border-gray-300 text-white py-3 px-6 text-sm rounded-full group-hover:bg-blue-800 group-hover:text-white">
                    +
                  </button>
                  <button className="border border-gray-300 h-[3rem] w-[13rem] text-white py-3 px-1 text-sm rounded-full group-hover:bg-blue-900 group-hover:text-white"
                    onClick={HandleGoServicesDetails}
                  >
                    {services.length > 0
                      ? services[currentIndex]?.subcategory[3]?.title
                      : "Loading..."}
                  </button>

                </div>
              </div>

              <div
                className="relative bg-cover bg-center flex items-center justify-center group transition-all duration-500"
                style={{ backgroundImage: `url('${getServiceImage(1)}')` }}
              >
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-50"></div>
                <p className="text-white font-bold group-hover:text-white z-10 xsm:text-base text-2xl cursor-pointer w-[50%] text-center">
                  {services.length > 0
                    ? services[currentIndex]?.subcategory[1]?.title
                    : "Loading..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-[10%] xsm:my-[3rem] md:my-[10vh] md:pt-5">
        {/* Buttons Section */}
        <div className="flex xsm:flex-col xsm:space-x-0 xsm:gap-4 xsm:items-center xsm:justify-center space-x-8">
          {/* Commercial Plumbing Button */}
          <button className="flex items-center space-x-3 px-16 xsm:px-5 py-5 bg-black text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            {/* Icon */}
            <div className="w-8 h-8  flex items-center justify-center rounded">
              <PiBuildingsBold className="text-3xl xsm:text-base" />
            </div>
            {/* Text */}
            <span className="text-lg xsm:text-base font-medium">Commercial Plumbing</span>
          </button>

          {/* Residential Plumbing Button */}
          <button className="flex items-center xsm:w-full space-x-3 xsm:px-5 px-16 py-5 bg-[#0054A5] text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            {/* Icon */}
            <div className="w-8 h-8 flex items-center justify-center rounded">
              <IoLocationOutline className="text-3xl xsm:text-base" />
            </div>
            {/* Text */}
            <span className="text-2xl xsm:text-base font-medium">Residential Plumbing</span>
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
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 text-center lg:text-left">
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
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mt-6">
              <button
                className="bg-[#0054A5] h-12 text-white px-6 py-3 rounded-xl w-[12rem] shadow-lg hover:bg-blue-800 transition duration-300  hover:shadow-xl transform active:scale-95 relative overflow-hidden"
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
  );
};

export default Supakling;
