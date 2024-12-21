"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "../Lodder.css"

const LatestOffer = () => {
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
    <div className="bg-[#0054A5] h-[100%] pb-10 w-full sm:h-[100%] flex items-center justify-center 2xl:justify-start 2xl:items-start relative">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center 2xl:justify-start 2xl:items-start z-50">
          <div className="loader"></div>
        </div>
      )}

      <div className="px-[10%] 2xl:px-0 flex flex-col-reverse md:flex-row w-full justify-between md:items-center 2xl:justify-start 2xl:items-start sm:top-4 2xl:mt-4 ">
        {/* Left Side Image */}
        <div className="flex-1 relative sm:flex sm:justify-center">
          <Image
            src="/Images/AllImages/OfferImage(1).jpg"
            alt="Offer"
            className="w-[20vw] h-[55vh] md:w-[25vw] sm:w-[30vw] object-cover rounded-lg shadow-sm mt-9 2xl:h-[70vh] "
            height={300}
            width={300}
          />

          {/* Overlay Content */}
          <div className="bg-[#24232A] h-[20vw] md:h-[15vw] md:w-[10vw] w-[10vw] sm:w-[18vw] rounded-lg text-white absolute top-[50%] left-[50%] transform -translate-x-[20%] sm:translate-x-[30%] md:translate-x-[60%] -translate-y-[50%] sm:-translate-y-[50%] flex items-center justify-center font-lexend 2xl:h-[12vw] 2xl:translate-x-[80%]">
            <Image
              src="/Images/Star_whyChoose.png"
              alt="Logo"
              className="absolute top-4 right-3 w-[3vw] h-auto sm:top-1 sm:right-1 md:right-3 md:top-3"
              height={200}
              width={200}
            />

            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center">
                <h1 className="text-[48px] font-bold">22</h1>
              </div>
              <h1 className="text-[16px] text-[#BCBBC9]">
                Years of Experience
              </h1>
            </div>
          </div>
        </div>

        {/* Right Side Text */}
        <div className="flex-1 text-white pl-10 md:pl-3 flex flex-col  2xl:px-24">
          <h1 className="text-[#51DC98] uppercase font-bold tracking-[0.08em] py-10">
            {"/ / Discount Up To 50%".split(" ").join("  ")}
          </h1>

          <h1 className="text-[45px] font-bold mb-4 md:text-[40px] font-dm-sans tracking-wide leading-relaxed ">
            Big Savings, Big Clean: Limited Time Offer
          </h1>
          <p className="text-lg mb-4 font-dm-sans tracking-wide leading-relaxed ">
            Don’t miss out! Limited-time savings on professional cleaning services for a spotless experience.
          </p>
          <p
            className="text-lg font-semibold cursor-pointer pt-10 tracking-[0.2em]"
            onClick={handleGoContact}
          >
            Contact Us
          </p>
        </div>
      </div>
    </div>
  );
};

export default LatestOffer;
