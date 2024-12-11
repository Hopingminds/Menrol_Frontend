import Image from "next/image";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const OurServises = () => {
  return (
    <div className="gap-4 px-[10%] ">
      <h1
        className="text-[#51DC98] uppercase font-bold pl-4 sm:flex sm:justify-center"
        style={{ wordSpacing: "0.1em" }}
      >
        {"/ Our Service".split("").join(" ")}
      </h1>

      <div className="flex flex-row justify-between w-full items-center">
        <div>
          <h1 className="text-[#24232A] text-[32px] md:text-[56px] font-bold tracking-[0.05em]">
            Elevate Your Cleanliness
          </h1>
          <h1 className="text-[#24232A] text-[32px] md:text-[56px] font-bold tracking-[0.05em]">
            with Supaklin
          </h1>
        </div>
        <button className="bg-[#0054A5] rounded-full h-[5vh] w-[30vw] sm:w-[50vw] md:w-[7vw] items-center text-[#FFFFFF] text-[14px] md:text-[16px] tracking-[0.07em]">
          View All
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 pt-10">
        {/* Card 1 */}
        <div className="relative shadow-lg">
          <Image
            src="/Images/card-01.png"
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
          <div className="absolute bottom-4 md:bottom-7 left-1/2 transform -translate-x-1/2 w-[90%] h-[30%] bg-white flex items-center justify-center rounded-lg">
            <div className="text-center px-2">
              <h3 className="font-bold text-[#24232A] text-[18px] md:text-[24px]">
                Home Cleaning
              </h3>
              <p className="text-xs text-[#24232A] md:text-[16px]">
                Tellus aliquam faucibus imperdiet eget interdum risus diam.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative shadow-lg">
          <Image
            src="/Images/card-01.png"
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
          <div className="absolute bottom-4 md:bottom-7 left-1/2 transform -translate-x-1/2 w-[90%] h-[30%] bg-white flex items-center justify-center rounded-lg">
            <div className="text-center px-2">
              <h3 className="font-bold text-[#24232A] text-[18px] md:text-[24px]">
                Office Cleaning
              </h3>
              <p className="text-xs text-[#24232A] md:text-[16px]">
                Tellus aliquam faucibus imperdiet eget interdum risus diam.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative shadow-lg">
          <Image
            src="/Images/card-01.png"
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
          <div className="absolute bottom-4 md:bottom-7 left-1/2 transform -translate-x-1/2 w-[90%] h-[30%] bg-white flex items-center justify-center rounded-lg">
            <div className="text-center px-2">
              <h3 className="font-bold text-[#24232A] text-[18px] md:text-[24px]">
                Kitchen Cleaning
              </h3>
              <p className="text-xs text-[#24232A] md:text-[16px]">
                Tellus aliquam faucibus imperdiet eget interdum risus diam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServises;
