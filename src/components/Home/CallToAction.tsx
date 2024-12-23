import Image from "next/image";
import React from "react";

const CallToAction = () => {
  return (
    <div className="px-[10%] flex justify-between mt-[18vh]">
      {/* Text Section */}
      <div className="w-[50%] pt-5">
        <h1
          className="text-[#51DC98] uppercase pl-4 xsm:text-[10px]"
          style={{ wordSpacing: "0.1em" }}
        >
          {"/ Call to Action".split("").join(" ")}
        </h1>
        <p className=" text-[45px] 2xl:text-[4.5rem] xsm:text-[20px] font-bold xsm:font-bold text-[#24232A]">
          Time for a Refresh: Book Your Cleaning Today
        </p>
        <p className="mt-2 text-[20px] text-[#6B6A7E] xsm:text-[10px]">
          Enjoy a fresh, clean environment by booking our cleaning service today and feel the difference.
        </p>
        <button className="bg-[#0054A5] rounded-full h-[7vh] md:w-[15vw] w-[11vw] xsm:w-full  items-center text-[#FFFFFF] font-[16px] tracking-[0.07em] mt-5 hover:scale-105">
          Contact Us
        </button>
      </div>
      {/* Image Section */}
      <div className="w-[40%]">
        <Image
          src="/Images/AllImages/BookingImage.png"
          alt="Call to Action"
          className="w-full h-auto object-cover"
          height={100}
          width={100}
        />
      </div>
    </div>
  );
};

export default CallToAction;
