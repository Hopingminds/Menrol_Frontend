"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// Type definition for Service
interface Service {
  _id: string;
  category: string;
  categoryDescription: string;
  categoryImage: string;
}
interface ApiResponse {
  success: boolean;
  all: Service[];
}

const OurServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const HandleGoServices = () => {
    router.push("/ServiceDetails");
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://api.menrol.com/api/v1/getServices"
        );
        const data: ApiResponse = await response.json();
        console.log("API Response:", data);

        if (data.success) {
          setServices(data.all);
        } else {
          console.log("API returned success=false");
          setError("Failed to load services.");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to load services.");
      }
    };

    fetchServices();
  }, []);

  const handleServiceDetails = (id: string) => {
    setLoading(true);

    router.push(`/IndividualServices?data=${id}`);

  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="gap-4 px-[10%]  xsm:p-6 relative xl:mt-20">
      {/* Show loading spinner while data is being fetched */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="animate-spin w-16 h-16 rounded-full"></div>
        </div>
      )}

      {/* Show error message if fetching fails */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500 text-white z-50">
          <span>{error}</span>
        </div>
      )}

      {/* Heading */}

      {/* Subheading */}
      <div className="flex flex-row justify-between w-full items-center ">
        <div className="font-lexend">
          <h1 className="text-[#24232A] xl:text-[50px] xsm:text-[15px] sm:text-[36px] md:text-[26px]  font-bold tracking-wide leading-relaxed">
            Make Life Simple with our
          </h1>
          <h1 className="text-[#24232A] xl:text-[50px] xsm:text-[15px] sm:text-[36px] md:text-[26px] font-bold tracking-[0.05em]">
            go-to Service app
          </h1>
        </div>
        <button
          onClick={HandleGoServices} // Add the onClick handler
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
            <span className="tracking-wider">View All</span>
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

      {/* Slider for displaying services */}
      <Slider {...settings} className="pt-10 ">
        {services?.map((service) => (
          <div key={service?._id} className="p-4">
            <div className="min-w-[75vw] xsm:min-w-[5rem] sm:min-w-0 relative shadow-lg">
              <Image
                src={service?.categoryImage}
                alt={service?.category}
                className="w-full h-[40vh] sm:h-[45vh] md:h-[55vh] rounded-lg object-cover"
                height={400}
                width={400}
              />
              {/* Arrow button to navigate to service details */}
              <div className="absolute top-4 right-4 md:top-8 md:right-6 ">
                <button
                  className="h-[6vh] w-[12vw] sm:w-[10vw] md:w-[70px] lg:w-[60px] bg-[#24232A] rounded-full shadow-md text-white flex items-center justify-center hover:bg-[#1F1E24]"
                  onClick={() => handleServiceDetails(service._id)}
                >
                  <FaArrowRightLong className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
              </div>
              {/* Service description */}
              <div className="absolute bottom-4 md:bottom-7 left-1/2 transform -translate-x-1/2 w-[90%] xsm:w-[80%] xsm:h-[50%] sm:h-[60%] h-[35%] lg:h-[40%] bg-white flex items-center justify-center rounded-lg">
                <div className="text-center px-5 xsm:px-2">
                  <h3 className="font-bold text-[#24232A] xl:text-[16px] text-[16px] xsm:text-[10px] sm:text-[15px] lg:text-[15px]  md:text-[24px] font-dm-sans  tracking-wide leading-relaxed">
                    {service?.category}
                  </h3>
                  <p className="text-xs sm:text-[7px] xsm:text-[5px] xl:tracking-wide xl:text-[12px]  xsm:leading-none lg:leading-none lg:tracking-normal lg:text-[7px] md:text-[12px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed">
                    {service?.categoryDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OurServices;
