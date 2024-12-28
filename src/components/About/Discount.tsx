"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "../Lodder.css"

const Discount = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State to track loading

  const handleGoContact = () => {
    setLoading(true); // Show loader
    router.push("/contactus");
    setTimeout(() => {
      setLoading(false); // Hide loader
    }, 1000); // Adjust time to suit the actual duration
  };

  return (
    <div className="bg-[#0054A5] h-[100%] pb-10 w-full sm:h-[100%] flex items-center justify-center relative xsm:py-5 py-10 my-10 gap-10" >
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader"></div>
        </div>
      )}

      <div className="px-[10%] lg:px-8  flex flex-col-reverse md:flex-row md:justify-between md:px-2 w-full justify-between md:items-center  sm:top-4  ">
        {/* Left Side Image */}
        <div className="flex-1 relative sm:flex sm:justify-center">
          <Image
            src="/Images/AllImages/OfferImage(1).jpg"
            alt="Offer"
            className="w-[20vw] h-[55vh] md:h-[20rem] md:w-[70%] xsm:w-[70%] xsm:h-[10rem] xsm:ml-9 lg:h-[20rem] xl:h-[24rem] 2xl:h-[25rem] 2xl:w-[25rem] sm:w-[30vw] object-cover rounded-lg shadow-sm mt-9  "
            height={300}
            width={300}
          />
          {/* Overlay Content */}
          <div className="bg-[#24232A] h-[20vw] xsm:w-[20vw] xl:h-[20vh] xsm:ml-20 xsm:h-[5rem] md:h-[10rem] md:w-[13vw] 2xl:h-[15rem] 2xl:w-[12rem] [10vw] sm:w-[18vw] rounded-lg text-white absolute top-[50%] left-[50%] transform -translate-x-[20%] sm:translate-x-[30%] md:translate-x-[90%] -translate-y-[50%] sm:-translate-y-[50%] flex items-center justify-center font-lexend ">
            <Image
              src="/Images/Star_whyChoose.png"
              alt="Logo"
              className="absolute top-4 right-3 w-[3vw] h-auto sm:top-1 sm:right-1 md:right-3 md:top-3"
              height={200}
              width={200}
            />

            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center">
                <h1 className="text-[48px] xsm:text-xs font-bold">22</h1>
              </div>
              <h1 className="text-[16px] xsm:text-xs text-[#BCBBC9]">
                Years of Experience
              </h1>
            </div>
          </div>
        </div>

        {/* Right Side Text */}
        <div className="flex-1 text-white pl-10 md:pl-3 flex flex-col lg:px-20  md:h-[20rem] lg:[5rem] xl:[24rem] 2xl:[25rem]
        ">
          

          <h1 className="text-[45px] font-bold mb-4 md:text-[30px] md:leading-normal lg:text-[35px] 2xl:text-[50px] xsm:text-sm font-dm-sans tracking-wide leading-relaxed ">
            Big Savings, Big Service: Limited Time Offer
          </h1>
          <p className="text-lg mb-4  md:text-lg lg:text-xl 2xl:text-2xl font-dm-sans tracking-wide xsm:text-xs leading-relaxed ">
            Don’t miss out! Limited-time savings on professional cleaning services for a spotless experience.
          </p>
          <p
            className="text-lg font-semibold cursor-pointer xsm:text-xs pt-10 tracking-[0.2em]"
            onClick={handleGoContact}
          >
            Contact Us
          </p>
        </div>
      </div>
    </div>
  );
};

export default Discount;
