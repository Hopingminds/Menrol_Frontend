"use client";
import React from "react";

const PhoenixSterling = () => {
  return (
    <div className="flex xsm:flex-col px-[10%] xsm:px-4 bg-[#0054A5] my-10 lg:py-[10vh] md:py-[7vh] py-[20vh] items-center justify-between xsm:items-start xsm:py-[2vh] lg:gap-20 gap-10">
      <div className="w-[60%] text-justify  xsm:w-full lg:w-full">
        <div className="flex items-center">
          <p className="xl:text-[38px] 2xl:text-[45px] lg:text-[30px] md:text-[24px] xsm:text-3xl text-white font-dm-sans lg:leading-normal text-start">
            Menrol Force Skilled Worker
          </p>
          <span className="text-green-500 lg:text-[50px] md:text-[35px] xsm:text-[20px] lg:pl-1 pl-5">✔</span>
        </div>


        <p className="mt-4 text-lg lg:text-lg 2xl:text-xl xsm:text-sm md:text-sm text-white font-dm-sans tracking-wide leading-relaxed">
          Being a part of MenrolForce has been a truly rewarding journey. The company’s commitment to quality and connecting skilled workers with the right opportunities has greatly enhanced my professional growth and confidence.

        </p>

        <p className="mt-4 2xl:text-xl text-lg lg:text-lg xsm:text-sm md:text-sm
         text-white font-dm-sans tracking-wide leading-relaxed">
          The supportive environment and collaborative approach make every day enjoyable. Knowing that my efforts contribute to successful projects and satisfied clients fills me with pride. MenrolForce is more than just a platform; it feels like a community that values and uplifts its members. I’m proud to be a part of it.
        </p>
      </div>
      <div
        className="relative xsm:hidden bg-[rgba(94,147,198,1)] text-white p-4 rounded-xl 2xl:h-[25rem] xl:h-[25rem] w-[30%] lg:h-[25rem] sm:h-[20rem] md:h-[20rem] md:w-[50%] lg:w-[75%] xsm:h-[200px] xsm:w-[200px] xsm:items-center xsm:justify-center"
        style={{
          backgroundImage: "url('/Images/pics2/pics2/worker12.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};

export default PhoenixSterling;
