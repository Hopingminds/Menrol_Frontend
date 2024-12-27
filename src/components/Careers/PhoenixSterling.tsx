"use client";
import React from "react";

const PhoenixSterling = () => {
  return (
    <div className="flex xsm:flex-col px-[10%] xsm:px-4 bg-[rgba(0,84,165,1)] my-10 lg:py-[10vh] md:py-[7vh] py-[20vh] items-center justify-between xsm:items-start xsm:py-[2vh] lg:gap-20 gap-10">
      <div className="w-[60%] text-justify  xsm:w-full lg:w-full">
        <div className="flex items-center">
          <p className="text-[56px] 2xl:text-[57px] lg:text-[48px] md:text-2xl xsm:text-3xl text-white font-dm-sans lg:leading-normal tracking-wide leading-relaxed">
            Phoenix Sterling
          </p>
          <span className="text-green-500 text-[50px] xsm:text-[20px] lg:pl-1 pl-5">✔</span>
        </div>

        <p className="text-white text-xl 2xl:text-2xl lg:text-xl md:text-base font-dm-sans tracking-wide leading-relaxed">
          Supaklin Employee
        </p>
        <p className="mt-4 text-lg lg:text-lg 2xl:text-xl xsm:text-sm md:text-sm text-white font-dm-sans tracking-wide leading-relaxed">
          “Working at Supaklin has been a rewarding experience. The
          company&apos;s dedication to excellence and sustainable practices has
          inspired me to grow both professionally and personally.
        </p>

        <p className="mt-4 2xl:text-xl text-lg lg:text-lg xsm:text-sm md:text-sm
         text-white font-dm-sans tracking-wide leading-relaxed">
          The supportive and close-knit team has made every day enjoyable, and
          knowing that our efforts contribute to creating healthier and safer
          spaces for our clients gives me a sense of fulfillment in my work.
          Supaklin is more than just a workplace; it feels like a family where
          everyone&apos;s contributions are valued, and I am grateful to be a part of
          it.”
        </p>
      </div>
      <div
        className="relative bg-[rgba(94,147,198,1)] text-white p-4 rounded-xl 2xl:h-[50vh] xl:h-[80vh] w-[30%] lg:h-[80vh] sm:h-[20vh] md:h-[80vh] md:w-[50%] lg:w-[75%] xsm:h-[200px] xsm:w-[200px] xsm:items-center xsm:justify-center"
        style={{
          backgroundImage: "url('/Images/plumber.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};

export default PhoenixSterling;
