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
        <div className="flex flex-row justify-between font-lexend">
          <div className="py-[8%]">
            <h1
              className="text-[#51DC98] uppercase font-bold py-[2vh]"
              style={{ wordSpacing: "0.1em" }}
            >
              {"/Why Choose Us".split("").join(" ")}
            </h1>
            <h1 className="text-[#24232A] text-[56px] ">Choose Excellence,</h1>
            <h1 className="text-[#24232A] text-[56px] ">Choose Supaklin</h1>
          </div>

          <div className="bg-[#24232A] h-[23.1vh] w-[15vw] rounded-lg mt-[6vh] text-white relative flex items-center justify-center font-lexend">
            <Image
              src="/Images/Star_whyChoose.png"
              alt="Logo"
              className="absolute top-2 right-5 w-auto h-auto object-cover"
              height={100}
              width={100}
            />

            <div className="text-left">
              <div className="flex items-end">
                <h1 className="text-[48px] font-bold">231</h1>
                <span className="text-[40px]">+</span>
              </div>
              <h1 className="text-[16px]">Project Finished</h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center py-10">
          {/* First Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between w-full mb-10">
            <div className="flex flex-row items-center gap-5 sm:flex-1 sm:w-[48%] w-full mb-5 sm:mb-0">
              <div className="bg-[#0054A5] h-[7vh] w-[5vw] rounded-lg flex items-center justify-center text-white">
                <FiUsers />
              </div>
              <div>
                <h1 className="text-[18px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed ">
                  Reliable Cleaning Crew
                </h1>
                <p className="text-[14px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed ">
                  Trusted cleaning experts making every space <br />
                  Shine with care and precision
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-5 sm:flex-1 sm:w-[48%] w-full mb-5 sm:mb-0">
              <div className="bg-[#0054A5] h-[7vh] w-[5vw] rounded-lg flex items-center justify-center text-white">
                <MdOutlineWatchLater />
              </div>
              <div>
                <h1 className="text-[18px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed ">On-Time Services</h1>
                <p className="text-[14px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed ">
                  Timely delivery of services, ensuring reliability and customer
                  satisfaction. <br /> Satisfaction, reliability, and customer
                  care.
                </p>
                <p className="text-[14px]"></p>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between w-full py-10">
            <div className="flex flex-row items-center gap-5 sm:flex-1 sm:w-[48%] w-full mb-5 sm:mb-0">
              <div className="bg-[#0054A5] h-[7vh] w-[5vw] rounded-lg flex items-center justify-center text-white">
                <IoCubeOutline />
              </div>
              <div>
                <h1 className="text-[18px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed ">
                  Flexible Packages
                </h1>
                <p className="text-[14px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed ">
                  Affordable and adaptable packages for all your cleaning and
                  service needs. <br /> For all your cleaning and service needs.
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-5 sm:flex-1 sm:w-[48%] w-full mb-5 sm:mb-0">
              <div className="bg-[#0054A5] h-[7vh] w-[5vw] rounded-lg flex items-center justify-center text-white">
                <BsEmojiSmile />
              </div>
              <div>
                <h1 className="text-[18px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed ">
                  Transparent Pricing
                </h1>
                <p className="pl-1 text-[14px] text-[#24232A] font-dm-sans tracking-wide leading-relaxed ">
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
