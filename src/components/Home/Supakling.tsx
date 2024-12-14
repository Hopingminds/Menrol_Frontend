"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const Supakling = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false); // Initially hide the button
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <div className="pt-10">
      <div className="gap-4 px-4 md:px-[10%] mb-[10vh]">
        <div className="flex gap-6">
          {/* Left Section */}
          <div className="flex sm:flex-col xsm:flex-col md:flex-col md:w-1/2 md:xsm-1/2 mb-4 md:mb-0">
            <Image
              src="/Images/Home_image_01.png"
              alt="Placeholder"
              className="w-[15vw] h-auto rounded-lg md:w-[20vw]"
              height={200}
              width={200}
            />
            <div className="flex flex-row pt-3 justify-start gap-y-2 gap-5">
              <p className="text-lg md:text-[24px] font-bold">126</p>
              <span className="text-[#AEADF1] font-bold text-lg md:text-[24px]">
                +
              </span>
              <p className="text-sm md:text-[16px] w-auto font-sans tracking-[0.05em]">
                Professional Tools
              </p>
            </div>
          </div>

          {/* Middle Section */}
          <div className="flex flex-col w-full md:w-2/2 pl-0 ">
            <div className="flex flex-row justify-between md:flex-col md:items-start">
              <h1 className="text-[#51DC98] uppercase font-bold text-xs md:text-lg">
                {"/ Supaklin - Cleaning - Service".split(" ").join(" ")}
              </h1>
              <div className="hidden md:block">
                <Image
                  src="/Images/Home_Star_Image.png"
                  alt="Star Icon"
                  className="w-12 md:w-[5vw] md:ml-[35vw] md:bottom-0 h-auto object-contain"
                  height={100}
                  width={100}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col md:flex-row justify-between pt-10">
              <div>
                <h1 className="text-4xl md:text-[70px] font-bold tracking-[0.05em] leading-tight">
                  Sparkling
                </h1>
                <h1 className="text-4xl md:text-[70px] font-bold tracking-[0.05em] leading-tight">
                  Clean Spaces
                </h1>
              </div>
              <div className="w-full md:w-[15vw] mt-4 md:mt-0">
                <p className="font-bold text-lg md:text-[24px]">
                  Exceptional Service
                </p>
                <p className="text-sm md:text-[14px] mb-3">
                  Choose our exceptional services for quality, efficiency, and
                  attention to detail that meets every need
                </p>
                <button className="bg-[#0054A5] text-white rounded-full px-4 py-2 md:w-[10vw]">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between h-auto md:h-screen pt-10 md:pt-[40vh]">
        <div
          className="bg-[#0054A5] w-full h-auto md:h-[50vh] flex justify-center items-center relative"
          onMouseMove={handleMouseMove}
        >
          {/* Video Embed */}
          <div className="transform -translate-y-1/3 relative">
            <video
              autoPlay
              loop
              ref={videoRef}
              className="w-full md:w-[60vw] h-[30vh] md:h-[60vh] object-cover rounded-xl shadow-sm"
              src="/Images/solar.mp4"
            ></video>

            {/* Play/Pause Button */}
            {showButton && (
              <button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#5653E1] text-xl md:text-3xl bg-[#FFFFFF] rounded-full p-4 md:p-8 z-10 cursor-pointer shadow-lg"
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
