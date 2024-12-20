import Image from "next/image";
import React from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const OurValue = () => {
  return (
    <div className="pb-10 w-full sm:h-[100%] flex items-center justify-center relative">
      <div className="px-[10%] flex flex-col-reverse md:flex-row w-full md:items-center sm:top-4">
        {/* Right Side Text */}
        <div className="flex-1 text-black  flex flex-col">
          <h1 className="text-[#51DC98] uppercase font-bold  tracking-[0.08em] py-10">
            {"/ Our Value".split(" ").join("  ")}
          </h1>

          <h1 className="text-[40px] font-bold mb-4 md:text-[40px]">
            Our Core Values:
          </h1>
          <div className="flex flex-col space-y-4 w-[30vw]">
            <div className="items-start">
              <span className="flex flex-row items-center">
                <IoArrowForwardCircleOutline className="text-[#5653E1]" />
                <h3 className="pl-4 text-[18px] font-serif font-bold">
                  Excellence in Every Detail
                </h3>
              </span>
              <div>
                <p className="pl-8 text-[12px]">
                  We achieve excellence in every detail, paying meticulous attention to create exceptional outcomes every time
                </p>
              </div>
            </div>
            <div className="items-start">
              <span className="flex flex-row items-center">
                <IoArrowForwardCircleOutline className="text-[#5653E1]" />
                <h3 className="pl-4 text-[18px] font-serif font-bold">
                  Personalized Care
                </h3>
              </span>
              <div>
                <p className="pl-8 text-[12px]">
                  We achieve excellence in every detail, paying meticulous attention to create exceptional outcomes every tim
                </p>
              </div>
            </div>
            <div className="items-start">
              <span className="flex flex-row items-center">
                <IoArrowForwardCircleOutline className="text-[#5653E1]" />
                <h3 className="pl-4 text-[18px] font-serif font-bold">
                  Transparent Communication
                </h3>
              </span>
              <div>
                <p className="pl-8 text-[12px]">
                  Experience personalized care with services designed to address your specific needs for optimal satisfaction
                </p>
              </div>
            </div>
            <div className="items-start">
              <span className="flex flex-row items-center">
                <IoArrowForwardCircleOutline className="text-[#5653E1]" />
                <h3 className="pl-4 text-[18px] font-serif font-bold">
                  Eco-Friendly Approach
                </h3>
              </span>
              <div>
                <p className="pl-8 text-[12px]">
                  Our commitment to transparent communication means no surprises—just clear, honest, and consistent updates every time.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Left Side Image */}
        <div className="flex-1 relative sm:flex sm:justify-center">
          <Image
            src="/Images/OfferImage.png"
            alt="Offer"
            className="w-[20vw] h-[65vh] md:w-[25vw] sm:w-[30vw] object-cover rounded-lg shadow-sm mt-9 md:ml-[15vw] "
            height={300}
            width={300}
          />

          {/* Overlay Content */}
          <div className="bg-[#0054A5] h-[30vw] md:h-[20vw] md:w-[15vw] w-[10vw] sm:w-[18vw] rounded-lg text-white absolute top-[90%] left-[50%] transform -translate-x-[40%] sm:translate-x-[30%] md:-translate-x-[100%] -translate-y-[50%] sm:-translate-y-[50%] flex items-center justify-center font-lexend">
            <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-2 text-center">
              <div className="w-full">
                <h2 className="text-[16px] text-[#BCBBC9]">Experienced</h2>
                <div className="text-[14px] text-[black]">70%</div>
                <div className="h-2 bg-gray-300 rounded-full">
                  <div
                    className="h-full bg-[#C1F458]"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>

              {/* Progress Bar for Reliable */}
              <div className="w-full">
                <h2 className="text-[16px] text-[#BCBBC9]">Reliable</h2>
                <div className="text-[14px] text-[black]">70%</div>
                <div className="h-2 bg-gray-300 rounded-full">
                  <div
                    className="h-full bg-[#C1F458]"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>

              {/* Progress Bar for Skilled & Capable */}
              <div className="w-full">
                <h2 className="text-[16px] text-[#BCBBC9]">
                  Skilled & Capable
                </h2>
                <div className="text-[14px] text-black">80%</div>
                <div className="h-2 bg-gray-300 rounded-full">
                  <div
                    className="h-full bg-[#C1F458]"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>

              {/* Progress Bar for Flexible */}
              <div className="w-full">
                <h2 className="text-[16px] text-[#BCBBC9]">Flexible</h2>
                <div className="text-[14px] text-black">70%</div>
                <div className="h-2 bg-gray-300 rounded-full">
                  <div
                    className="h-full bg-[#C1F458]"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurValue;
