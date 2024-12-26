"use client";
import Image from "next/image";
import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { IoCubeOutline } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";

const WhyChooseUs = () => {
  return (
    <div className="px-[10%] py-[10vh] shadow-sm">
      <div className="bg-[#F9F9FE] rounded-lg w-full h-[100%] px-[10%] ">
        <div className="flex flex-row xsm:flex-col xsm:items-center  justify-between  font-lexend">
          <div className="py-[8%] xsm:py-[3%]">
            <h1
              className="text-[#51DC98] uppercase xsm:text-[10px] font-bold py-[2vh]"
              style={{ wordSpacing: "0.1em" }}
            >
              {"/Why Choose Us".split("").join(" ")}
            </h1>
            <h1 className="text-[#24232A] text-[56px] xsm:text-2xl sm:text-2xl lg:text-[40px] font-bold xsm:text-center ">Choose Excellence,</h1>
            <h1 className="text-[#24232A] text-[56px] xsm:text-2xl sm:text-2xl lg:text-[40px] lg:mt-8 font-bold xsm:text-center ">Choose Supaklin</h1>
          </div>

          <div className="bg-[#24232A] h-[23.1vh] w-[15vw] xsm:w-[60%] sm:w-[40%] xsm:h-[20vh] md:h-[15vh] xl:w-[30%] 2xl:w-[20%] xl:h-[24vh] lg:w-[30%] rounded-xl md:mt-[5vh] 2xl:mt-[16vh] text-white relative flex items-center justify-center font-lexend">
            <Image
              src="/Images/Star_whyChoose.png"
              alt="Logo"
              className="absolute top-2 right-5 w-auto h-auto object-cover"
              height={100}
              width={100}
            />

            <div className="text-left">
              <div className="flex items-end ">
                <h1 className="text-[48px] font-bold xsm:text-4xl xsm:text-right">231</h1>
                <span className="text-[40px] xsm:text-4xl">+</span>
              </div>
              <h1 className="text-[16px] xsm:text-xs">Project Finished</h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center py-10">
          {/* First Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between w-full mb-10 xsm:mb-0">
            <div className="flex flex-row items-center gap-5 sm:flex-1 sm:w-[48%] w-full mb-5 sm:mb-0">
              <div className="bg-[#0054A5] h-[7vh] w-[5vw] xsm:w-[14vw] sm:w-[14vw] xl:w-[6vw] lg:w-[9vw] 2xl:w-[4vw] rounded-lg flex items-center justify-center text-white">
                <FiUsers />
              </div>
              <div>
                <h1 className="text-[18px] text-[#24232A] font-bold font-dm-sans tracking-wide xsm:text-[15px] sm:text-[15px] lg:text-lg xl:text-xl leading-relaxed ">
                  Reliable Cleaning Crew
                </h1>
                <p className="text-[14px] xsm:text-[10px] sm:text-[11px] md:text-xs lg:text-sm xl:text-base text-[#24232A] font-dm-sans  tracking-wide leading-relaxed ">
                  Trusted cleaning experts making every space <br />
                  Shine with care and precision
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-5 sm:flex-1 sm:w-[48%] w-full mb-5 sm:mb-0 xl:ml-7">
              <div className="bg-[#0054A5] h-[7vh] w-[5vw] xsm:w-[25vw] sm:w-[24vw] xl:w-[9vw] lg:w-[14vw] 2xl:w-[6vw] rounded-lg flex items-center justify-center text-white">
                <MdOutlineWatchLater />
              </div>
              <div>
                <h1 className="text-[18px] text-[#24232A] font-bold xsm:text-[15px] sm:text-[15px] lg:text-lg xl:text-xl font-dm-sans tracking-wide leading-relaxed ">On-Time Services</h1>
                <p className="text-[14px] text-[#24232A] xsm:text-[10px] md:text-xs lg:text-sm sm:text-[11px] xl:text-base font-dm-sans tracking-wide leading-relaxed ">
                  Timely delivery of services, ensuring reliability and customer
                  satisfaction. <br /> Satisfaction, reliability, and customer
                  care.
                </p>
                <p className="text-[14px]"></p>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between w-full py-10 xsm:py-0">
            <div className="flex flex-row items-center gap-5 sm:flex-1 sm:w-[48%] w-full mb-5 sm:mb-0">
              <div className="bg-[#0054A5] h-[7vh] w-[5vw] xsm:w-[25vw] sm:w-[24vw] xl:w-[10vw] 2xl:w-[6vw] lg:w-[14vw] rounded-lg flex items-center justify-center text-white">
                <IoCubeOutline />
              </div>
              <div>
                <h1 className="text-[18px] text-[#24232A] font-bold xsm:text-[15px] lg:text-lg sm:text-[15px] xl:text-xl font-dm-sans tracking-wide leading-relaxed ">
                  Flexible Packages
                </h1>
                <p className="text-[14px] text-[#24232A] xsm:text-[10px] md:text-xs sm:text-[11px] lg:text-sm xl:text-base xl:tracking-normal font-dm-sans tracking-wide leading-relaxed ">
                  Affordable and adaptable packages for all your cleaning and
                  service needs. <br /> For all your cleaning and service needs.
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-5 sm:flex-1 sm:w-[48%] w-full mb-5 sm:mb-0 xl:ml-7">
              <div className="bg-[#0054A5] h-[7vh] w-[5vw] xsm:w-[15vw] sm:w-[14vw] xl:w-[6vw] 2xl:w-[4vw] lg:w-[9vw] rounded-lg flex items-center justify-center text-white">
                <BsEmojiSmile />
              </div>
              <div>
                <h1 className="text-[18px] text-[#24232A] font-bold xsm:text-[15px] lg:text-lg sm:text-[15px] xl:text-xl font-dm-sans tracking-wide leading-relaxed ">
                  Transparent Pricing
                </h1>
                <p className="pl-1 text-[14px] text-[#24232A] sm:text-[11px] md:text-xs lg:text-sm xl:text-base font-dm-sans tracking-wide xsm:text-[10px] leading-relaxed ">
                  Fair and transparent pricing, <br /> Ensuring clarity on every
                  service we provide.
                </p>
                <p className="text-[14px] text-[#24232A]"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
