"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const OurServises = () => {
  const router = useRouter()

  const HandleGoAbout = () => {
    router.push("/about");
  }

  return (
    <div className="gap-4 px-[10%] lg:mt-8 ">
      <h1
        className="text-[#51DC98] uppercase font-bold pl-4 sm:flex sm:justify-center"
        style={{ wordSpacing: "0.1em" }}
      >
        {"/ Our Service".split("").join(" ")}
      </h1>

      <div className="flex flex-row justify-between w-full items-center">
        <div>
          <h1 className="text-[#24232A] text-[32px] md:text-[56px] font-bold font-dm-sans tracking-wide leading-relaxed">
            Elevate Your Cleanliness
          </h1>
          <h1 className="text-[#24232A] text-[32px] md:text-[56px] font-bold font-dm-sans tracking-wide leading-relaxed">
            with Supaklin
          </h1>
        </div>
        <button className="bg-[#0054A5] rounded-full h-[5vh] w-[30vw] sm:w-[50vw] md:w-[7vw] items-center text-[#FFFFFF] text-[14px] md:text-[16px] tracking-[0.07em]" onClick={HandleGoAbout}>
          View All
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 pt-10">
        {/* Card 1 */}
        <div className="relative shadow-lg">
          <Image
            src="/Images/AllImages/card-01.png"
            alt="Placeholder"
            className="w-full h-[45vh] md:w-[20vw] md:h-[55vh] rounded-lg object-cover"
            height={200}
            width={200}
          />
          {/* Back arrow */}
          <div className="absolute top-4 right-4 md:top-8 md:right-6">
            <button className="h-[5vh] w-[10vw] md:w-[4vw] bg-[#24232A] rounded-full shadow-md text-[#C1F458] flex items-center justify-center hover:bg-[#24232A]">
              <FaArrowRightLong className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute bottom-4 md:bottom-7 left-1/2 transform -translate-x-1/2 w-[90%] h-[30%] lg:h-[40%] bg-white flex items-center justify-center rounded-lg">
            <div className="text-center px-2">
              <h3 className="font-bold text-[#24232A] text-[18px] md:text-[24px]  font-dm-sans tracking-wide leading-relaxed">
                Home Cleaning
              </h3>
              <p className="text-xs text-[#24232A] md:text-[16px] font-dm-sans tracking-wide leading-relaxed">
                Affordable, high-quality home cleaning services with a focus on customer satisfaction and hygiene.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative shadow-lg">
          <Image
            src="/Images/AllImages/card-01.png"
            alt="Placeholder"
            className="w-full h-[45vh] md:w-[20vw] md:h-[55vh] rounded-lg object-cover"
            height={200}
            width={200}
          />
          {/* Back arrow */}
          <div className="absolute top-4 right-4 md:top-8 md:right-6">
            <button className="h-[5vh] w-[10vw] md:w-[4vw] bg-[#24232A] rounded-full shadow-md text-[#C1F458] flex items-center justify-center hover:bg-[#24232A]">
              <FaArrowRightLong className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute bottom-4 md:bottom-7 left-1/2 transform -translate-x-1/2 w-[90%] h-[30%] lg:h-[40%] bg-white flex items-center justify-center rounded-lg">
            <div className="text-center px-2">
              <h3 className="font-bold text-[#24232A] text-[18px] md:text-[24px] font-dm-sans tracking-wide leading-relaxed">
                Office Cleaning
              </h3>
              <p className="text-xs text-[#24232A] md:text-[16px] font-dm-sans tracking-wide leading-relaxed">
                Dedicated cleaning professionals creating a healthier, more comfortable office environment for everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative shadow-lg">
          <Image
            src="/Images/AllImages/card-01.png"
            alt="Placeholder"
            className="w-full h-[45vh] md:w-[20vw] md:h-[55vh] rounded-lg object-cover"
            height={200}
            width={200}
          />
          {/* Back arrow */}
          <div className="absolute top-4 right-4 md:top-8 md:right-6">
            <button className="h-[5vh] w-[10vw] md:w-[4vw] bg-[#24232A] rounded-full shadow-md text-[#C1F458] flex items-center justify-center hover:bg-[#24232A]">
              <FaArrowRightLong className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute bottom-4 md:bottom-7 left-1/2 transform -translate-x-1/2 w-[90%] h-[30%] lg:h-[40%] bg-white flex items-center justify-center rounded-lg">
            <div className="text-center px-2">
              <h3 className="font-bold text-[#24232A] text-[18px] md:text-[24px] font-dm-sans tracking-wide leading-relaxed">
                Kitchen Cleaning
              </h3>
              <p className="text-xs text-[#24232A] md:text-[16px] font-dm-sans tracking-wide leading-relaxed">
                Professional cleaners restoring your kitchen &apos;s shine with efficient, eco-friendly cleaning methods
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServises;
