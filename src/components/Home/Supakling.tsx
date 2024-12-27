"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const Supakling = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false); // Initially hide the button
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseMove = () => {
    setShowButton(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Hide the button after 2 seconds of inactivity
    timeoutRef.current = setTimeout(() => {
      setShowButton(false);
    }, 2000);
  };

  // Add event listeners for hover effects
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener("mousemove", handleMouseMove);
      videoElement.addEventListener("mouseleave", () => setShowButton(false));
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("mousemove", handleMouseMove);
        videoElement.removeEventListener("mouseleave", () =>
          setShowButton(false)
        );
      }
    };
  }, []);

  const handleGoContact = () => {
    setLoading(true);
    router.push("/about");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-5 overflow-hidden ">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader"></div>
        </div>
      )}
      <div className="gap-4 px-4 md:px-[10%] 2xl:px-56 3xl:px-[80px]  xl:px-40  xsm:mr-7 mb-[10vh] xsm:-mt-10">
        <div className="flex 2xl:gap-0  gap-6 xl:gap-0  ">
          {/* Left Section */}
          <div className="flex xsm:flex-col sm:flex-col md:flex-col md:w-1/2 md:xsm-1/2 mb-4 md:mb-0 xsm:mt-14 lg:mt-10 lg:-ml-4">
            <Image
              src="/Images/AllImages/Home_image_01.png"
              alt="Placeholder"
              className="w-[15vw] h-auto rounded-lg md:w-[24vw] lg:w-[20vw] xsm:w-[30vw] xl:w-[15vw]"
              height={200}
              width={200}
            />
            <div className="flex flex-row pt-3 xsm:pt-1 justify-start items-center gap-y-2 gap-5 xsm:gap-2">
              <p className="text-lg md:text-[24px] xsm:text-[10px] text-black font-bold font-dm-sans tracking-wide leading-relaxed ">126</p>
              <span className="text-[#AEADF1] font-bold text-lg md:text-[24px]">
                +
              </span>
              <p className="text-sm md:text-[16px] xl:w-1 md:w-1 w-auto font-dm-sans tracking-wide xsm:text-[5px] leading-relaxed text-[#6B6A7E]">
                Professional Tools
              </p>
            </div>
          </div>

          {/* Middle Section */}
          <div className="flex flex-col 2xl:w-full  xl:w-full md:w-2/2 pl-0 relative ">
            <div className="flex flex-row justify-between md:flex-col md:items-start xsm:items-start  ">
              <h1 className="text-[#51DC98] uppercase font-bold text-md md:text-md xsm:text-[10px] sm:text-[12px]  xsm:relative xsm:top-9">
                {"/ Supaklin - Cleaning - Service".split(" ").join(" ")}
              </h1>
              <div className=" hidden xsm:block lg:block 2xl:-ml-40">
                <Image
                  src="/Images/Home_Star_Image.png"
                  alt="Star Icon"
                  className="w-12 md:w-[6vw] md:ml-[35vw]  md:bottom-0 h-auto object-contain xsm:left-28 xsm:top-20 xsm:absolute"
                  height={100}
                  width={100}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col 2xl:justify-end 2xl:gap-0 xl:gap-24 xsm:gap-0 xsm:flex-row md:flex-row justify-between pt-10 md:pt-0">
              <div className=" 2xl:-ml-0 xsm:mt-4 lg:-ml-14" >
                <h1 className="text-4xl 2xl:text-7xl xl:text-6xl xl:tracking-normal text-black lg:text-6xl md:text-[36px] xsm:text-[20px] xsm:font-bold font-semibold tracking-[0.07em] lg:leading-none leading-tight">
                  Sparkling
                </h1>
                <h1 className="text-4xl 2xl:text-7xl 2xl:w-[80%] xl:text-6xl xl:tracking-normal text-black lg:text-6xl md:text-[36px] xsm:text-[20px] xsm:font-bold font-semibold tracking-[0.07em] lg:leading-none leading-tight">
                  Clean Spaces
                </h1>
              </div>
              <div className="w-full md:w-[26vw] 2xl:-mr-40 md:-mr-9 md:pt-10 xsm:w-screen xsm:-ml-12 xsm:mr-10 mt-4 md:mt-0 xsm:mt-20">
                <p className="font-bold  font-lexend text-lg md:text-[24px] xsm:text-[10px] text-[rgba(36,35,42,1)]">
                  Exceptional Service
                </p>
                <p className="text-sm  xsm:w-[30%] xsm:text-justify sm:w-[70%] md:w-full md:text-[15px] xl:text-[19px] lg:text-[15px] xsm:text-[8px] mb-3 pt-5 xsm:pt-1 lg:w-[20vw] font-dm-sans tracking-wide xsm:tracking-tight md:tracking-tight md:leading-tight leading-relaxed xsm:leading-tight text-[#6B6A7E]" >
                  Choose our exceptional services for quality, efficiency, and
                  attention to detail that meets every need
                </p>
              </div>
              
            </div>
            
              <button
                  className="bg-[#0054A5] lg:w-[30%] lg:-right-80 sm:w-[50%] xl:w-[20%]  xl:absolute xl:-bottom-10 xl:right-28  2xl:w-[25%] 2xl:absolute 2xl:-bottom-10 2xl:right-10  text-white rounded-full px-4 py-2 md:w-[50%]  xsm:w-20 xsm:px-2 xsm:text-xs hover:scale-105 relative xsm:-left-4 xsm:-top-10 "
                  onClick={handleGoContact}
                >
                  Learn More
                </button>
           
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between h-auto xsm:-mt-14 lg:mt-[25vh] md:h-full pt-10 xl:mt-[30vh]">
        <div
          className="bg-[#0054A5] w-full h-auto md:w-full lg:h-[40vh] sm:h-[30vh] xsm:h-[20vh] md:h-[30vh] xl:h-[60vh] flex justify-center items-center 2xl:items-start 2xl:justify-start  relative "
          onMouseMove={handleMouseMove}
        >
          {/* Video Embed */}
          <div className="transform -translate-y-1/3 relative 2xl:px-40 xsm:p-7">
            <video
              autoPlay
              loop
              ref={videoRef}
              className="w-full md:w-[60vw] sm:w-[50vw] h-[30vh] sm:h-[30vh]  md:h-[30vh] lg:h-[40vh] lg:w-[70vw] 2xl:w-[100vw] xsm:h-[20vh] xl:h-[50vh] xsm:w-[70vw] object-cover rounded-xl shadow-sm"
              src="/Images/solar.mp4"
            ></video>

            {/* Play/Pause Button */}
            {showButton && (
              <button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#5653E1] text-xl md:text-3xl bg-[#FFFFFF] rounded-full p-4  md:p-8 z-10 cursor-pointer shadow-lg"
                onClick={togglePlayPause}
              >
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supakling;
