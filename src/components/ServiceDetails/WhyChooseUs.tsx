"use client";
import Image from "next/image";
import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { IoCubeOutline } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";

const WhyChooseUs = () => {
  return (
    <div className="px-[10%] py-[10vh] xsm:py-0  shadow-sm  ">
      <div className="bg-[#F9F9FE] rounded-lg w-full h-[100%] px-[10%] ">
        <div className="flex flex-row justify-between 2xl:items-center xsm:flex-col  font-lexend">
          <div className="py-[8%]">
            
            <div className="xsm:text-center">
              <h1 className="text-[#24232A] 2xl:text-[56px] xsm:text-[19px] sm:text-[36px] md:text-[30px] font-bold ">Choose perfection,</h1>
              <h1 className="text-[#24232A] 2xl:text-[56px] xsm:text-[19px] sm:text-[36px] md:text-[30px] font-bold ">Choose superior service</h1></div>
          </div>

          <div className="bg-[#24232A] h-[23.1vh] lg:h-[9rem] lg:w-[20vw] w-[15vw] 2xl:w-[20%] 2xl:h-[24vh] xsm:w-full xsm:h-[9rem] sm:h-[13vh] sm:w-[20vw] sm:top-5 md:w-[8rem] md:h-[20vh] rounded-lg mt-[6vh] text-white relative flex items-center justify-center font-lexend">
            <Image
              src="/Images/Star_whyChoose.png"
              alt="Logo"
              className="absolute top-2 right-5 w-auto md:w-[20px] h-auto object-cover"
              height={100}
              width={100}
            />

            <div className="text-left 2xl:text-center sm:text-right">
              <div className="flex items-end sm:ml-6">
                {/* <h1 className="text-[48px] font-bold md:text-xl xsm:text-[40px]  sm:text-base">231</h1> */}
                {/* <span className="text-[40px] sm:text-xl md:text-xl">+</span> */}
              </div>
              <h1 className="text-[16px] sm:text-xs md:text-xs">Delivering excellence in construction and transformation projects, ensuring satisfaction every step of the way.</h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center py-10">
          {/* First Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between w-full mb-10">
            <div className="flex flex-row items-center gap-5 sm:flex-1 sm:w-[48%] w-full mb-5 sm:mb-0">
              <div className="bg-[#0054A5] h-[7vh] w-[5vw] 2xl:w-[4rem] xl:w-[4rem] sm:w-[15vw] md:w-[5rem] md:h-[4rem] lg:w-[4rem] xsm:h-[3rem] xsm:w-[4rem] rounded-lg flex items-center justify-center text-white">
                <FiUsers />
              </div>
              <div>
                <h1 className="text-[18px] xsm:text-[15px] 2xl:text-[15px] sm:text-[15px] lg:text-base xsm:font-bold xl:font-extrabold md:font-bold md:text-[14px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed ">
                  Reliable  Crew
                </h1>
                <p className="text-[14px] 2xl:text-[12px] xsm:text-[10px]  sm:text-[12px] text-[#24232A] md:text-[10px] font-dm-sans tracking-wide leading-relaxed ">
                  Trusted  experts making every space <br />
                  Shine with care and precision
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-5 sm:flex-1 sm:w-[48%] w-full mb-5 sm:mb-0">
              <div className="bg-[#0054A5] h-[7vh] w-[5vw] xl:w-[4rem] sm:w-[24vw] md:w-[9rem] 2xl:w-[4rem] lg:w-[5rem] md:h-[4rem] xsm:w-[8rem] xsm:h-[3rem] rounded-lg flex items-center justify-center text-white">
                <MdOutlineWatchLater />
              </div>
              <div>
                <h1 className="text-[18px]  xsm:text-[15px] 2xl:text-[15px] sm:text-[15px] lg:text-base xsm:font-bold xl:font-extrabold md:font-bold md:text-[14px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed ">On-Time Services</h1>
                <p className="text-[14px] xsm:text-[10px] 2xl:text-[12px]  sm:text-[12px] text-[#24232A] md:text-[10px] font-dm-sans tracking-wide leading-relaxed ">
                  Timely delivery of services, ensuring reliability and customer
                  satisfaction. <br /> Satisfaction, reliability, and customer
                  care.
                </p>
                <p className="text-[14px]"></p>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between w-full xsm:-mt-10 py-10 xsm:py-0">
            <div className="flex flex-row items-center gap-5 sm:flex-1 sm:w-[48%] w-full mb-5 sm:mb-0">
              <div className="bg-[#0054A5] h-[7vh] w-[5vw] xl:w-[4rem] sm:w-[24vw] lg:w-[4rem] 2xl:w-[4rem] md:w-[9rem] md:h-[4rem] xsm:w-[7rem] xsm:h-[3rem] rounded-lg flex items-center justify-center text-white">
                <IoCubeOutline />
              </div>
              <div>
                <h1 className="text-[18px] xsm:text-[15px] 2xl:text-[15px] sm:text-[15px] lg:text-base xsm:font-bold md:font-bold xl:font-extrabold md:text-[14px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed ">
                  Flexible Packages
                </h1>
                <p className="text-[14px] xsm:text-[10px] 2xl:text-[12px] lg:w-[80%] sm:text-[12px] text-[#24232A] md:text-[10px] font-dm-sans tracking-wide leading-relaxed 2xl:w-[90%] ">
                  Affordable and adaptable packages for all your
                  service needs. <br /> For all your service needs.
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-5 sm:flex-1 sm:w-[48%] w-full mb-5 sm:mb-0">
              <div className="bg-[#0054A5] h-[7vh] w-[5vw] sm:w-[15vw] lg:w-[4rem] xl:w-[4rem] 2xl:w-[4rem] md:w-[5rem] md:h-[4rem] xsm:w-[5rem] xsm:h-[3rem] rounded-lg flex items-center justify-center text-white">
                <BsEmojiSmile />
              </div>
              <div>
                <h1 className="text-[18px] xsm:text-[15px] 2xl:text-[15px] sm:text-[15px] lg:text-base xsm:font-bold  md:font-bold xl:font-extrabold md:text-[14px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed ">
                  Transparent Pricing
                </h1>
                <p className="pl-1 text-[14px] sm:text-[12px] 2xl:text-[12px] xsm:text-[10px] text-[#24232A] md:text-[10px] font-dm-sans tracking-wide leading-relaxed ">
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
