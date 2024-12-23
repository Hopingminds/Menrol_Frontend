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
    <div className="p-10 overflow-hidden md:mt-10  md:my-[30vh]">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader"></div>
        </div>
      )}
      <div className="gap-4 px-4 md:px-[10%] xsm:mr-7 mb-[10vh] xsm:-mt-12">
        <div className="flex gap-6">
          {/* Left Section */}
          <div className="flex xsm:flex-col sm:flex-col md:flex-col md:w-1/2 md:xsm-1/2 mb-4 md:mb-0 xsm:mt-14">
            <Image
              src="/Images/AllImages/Home_image_01.png"
              alt="Placeholder"
              className="w-[15vw] h-auto rounded-lg md:w-[20vw] xsm:w-[30vw]"
              height={200}
              width={200}
            />
            <div className="flex flex-row pt-3 xsm:pt-1 justify-start items-center gap-y-2 gap-5 xsm:gap-2">
              <p className="text-lg md:text-[24px] xsm:text-[10px] font-dm-sans tracking-wide leading-relaxed ">126</p>
              <span className="text-[#AEADF1] font-bold text-lg md:text-[24px]">
                +
              </span>
              <p className="text-sm md:text-[16px] w-auto font-dm-sans tracking-wide xsm:text-[5px] leading-relaxed text-[#6B6A7E]">
                Professional Tools
              </p>
            </div>
          </div>

          {/* Middle Section */}
          <div className="flex flex-col w-full md:w-2/2 pl-0 ">
            <div className="flex flex-row justify-between md:flex-col md:items-start ">
              <h1 className="text-[#51DC98] uppercase font-bold text-md md:text-md xsm:text-xs xsm:relative xsm:top-9">
                {"/ Supaklin - Cleaning - Service".split(" ").join(" ")}
              </h1>
              <div className=" md:block">
                <Image
                  src="/Images/Home_Star_Image.png"
                  alt="Star Icon"
                  className="w-12 md:w-[6vw] md:ml-[35vw] md:bottom-0 h-auto object-contain xsm:-ml-32 xsm:mt-16   xsm:absolute"
                  height={100}
                  width={100}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col xsm:flex-row md:flex-row justify-between pt-10 md:pt-0">
              <div >
                <h1 className="text-4xl md:text-[56px] xsm:text-[20px] font-bold tracking-[0.07em] leading-tight">
                  Sparkling
                </h1>
                <h1 className="text-4xl md:text-[56px] xsm:text-[20px] font-bold tracking-[0.07em] leading-tight">
                  Clean Spaces
                </h1>
              </div>
              <div className="w-full md:w-[15vw] md:pt-10 xsm:w-screen xsm:-ml-3 xsm:mr-10 mt-4 md:mt-0 xsm:mt-20">
                <p className="font-bold  font-lexend text-lg md:text-[24px] xsm:text-[10px] text-[rgba(36,35,42,1)]">
                  Exceptional Service
                </p>
                <p className="text-sm md:text-[10px]  xsm:text-[10px] mb-3 pt-5 xsm:pt-1  lg:w-[20vw] font-dm-sans tracking-wide xsm:tracking-tight leading-relaxed xsm:leading-tight text-[#6B6A7E]" >
                  Choose our exceptional services for quality, efficiency, and
                  attention to detail that meets every need
                </p>
              </div>
              
            </div>
            
              <button
                  className="bg-[#0054A5] lg:w-[20%] lg:absolute lg:right-32 lg:bottom-2  text-white rounded-full px-4 py-2 md:w-full  xsm:w-24 xsm:px-2 xsm:text-sm hover:scale-105 relative xsm:-left-10 xsm:-top-12 "
                  onClick={handleGoContact}
                >
                  Learn More
                </button>
           
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between h-auto xsm:-mt-14 md:h-screen pt-10 md:pt-[40vh]">
        <div
          className="bg-[#0054A5] w-full h-auto md:w-full  xsm:h-[20vh] md:h-[60vh] flex justify-center items-center 2xl:items-start 2xl:justify-start  relative "
          onMouseMove={handleMouseMove}
        >
          {/* Video Embed */}
          <div className="transform -translate-y-1/3 relative 2xl:px-40 xsm:p-7">
            <video
              autoPlay
              loop
              ref={videoRef}
              className="w-full md:w-[60vw] h-[30vh]  md:h-[60vh] 2xl:w-[100vw] xsm:h-[20vh] xsm:w-[70vw] object-cover rounded-xl shadow-sm"
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
