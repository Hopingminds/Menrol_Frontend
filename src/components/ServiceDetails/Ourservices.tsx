"use client";
import Image from "next/image";
import React from "react";
import { BiSolidOffer } from "react-icons/bi";

const Ourservices = () => {
  // const router = useRouter();

  // const handleNavigate = () => {
  //   router.push("/services");
  // };
  return (
    <div className="px-[10%] mt-[5vh]">
      <h1
        className="text-[#51DC98] uppercase font-bold text-center"
        style={{ wordSpacing: "0.1em" }}
      >
        {"/ Our Service".split("").join(" ")}
      </h1>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[45px]  font-dm-sans tracking-wide leading-relaxed">
          Elevate Your Cleanliness{" "}
        </h1>
        <h1 className="text-[45px]  font-dm-sans tracking-wide leading-relaxed">With Supaklin</h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="relative shadow-lg">
              <Image
                src="/Images/card-01.png"
                alt="Service Image"
                className="w-full h-[45vh] lg:h-[55vh] rounded-lg object-cover"
                height={200}
                width={200}
              />

              <div className="flax flex-row justify-between items-center">
                <div className="absolute top-3 md:top-6 md:left-2 bg-[#C1F458] text-black text-[14px] px-3 rounded-full h-8 flex items-center">
                  <span className="pr-2">
                    <BiSolidOffer />
                  </span>
                  <p>Discount 50%</p>
                </div>

                <div className="absolute top-4 right-4 md:top-6 md:right-6">
                  {/* <button
                    className="h-[5vh] w-[10vw] md:w-[4vw] bg-[#24232A] rounded-full shadow-md text-[#C1F458] flex items-center justify-center hover:bg-[#24232A]"
                    onClick={handleNavigate}
                  >
                    <FaArrowRightLong className="h-6 w-6" />
                  </button> */}
                </div>
              </div>

              <div className="absolute bottom-4 lg:bottom-7 left-1/2 transform -translate-x-1/2 w-[90%] h-[30%] bg-white flex items-center justify-center rounded-lg">
                <div className="text-center px-2">
                  <h3 className="font-bold text-[#24232A] text-[18px] lg:text-[24px] font-dm-sans tracking-wide leading-relaxed">
                    {index === 0
                      ? "Home Cleaning"
                      : index === 1
                      ? "Office Cleaning"
                      : index === 2
                      ? "Kitchen Cleaning"
                      : "Other Service"}
                  </h3>
                  <p className="text-xs text-[#24232A] lg:text-[16px] font-dm-sans tracking-wide leading-relaxed">
                    Tellus aliquam faucibus imperdiet eget interdum risus diam.
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Ourservices;
