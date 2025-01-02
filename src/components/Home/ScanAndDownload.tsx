"use client";
import Image from "next/image";
import React from "react";

const ScanAndDownload = () => {
  return (
    <div className="bg-[#0054A5] w-full relative flex justify-center h-[50vh] xsm:h-[35vh] sm:h-[40vh] md:h-[20rem] lg:h-[26rem] xl:h-[30rem] 2xl:h-[30rem]">
      {/* Text Section */}
      <div className="text-white pt-8 xsm:pt-4 sm:pt-6 md:pt-8 xsm:px-4 sm:px-6">
        <h1 className="font-lexend font-bold text-2xl xsm:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[40px] 2xl:text-[48px]">
          Scan to Download App
        </h1>
        <p className="text-base xsm:text-sm sm:text-base md:text-lg lg:text-xl xl:text-[20px] 2xl:text-[24px] mt-2">
          Available on your favorite store. Start your premium experience now
        </p>
      </div>

      {/* Image Section */}
      <div className="absolute bottom-4 w-full flex flex-col items-center">
        <div className="flex flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {/* Left Scanner + App Store */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/Images/Scanner.png"
                alt="Scanner"
                className="w-[100px] xsm:w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[160px] 2xl:w-[180px]"
                height={100}
                width={500}
              />
              <Image
                src="/Images/app_store.png"
                alt="App Store"
                className="w-[100px] xsm:w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[160px] 2xl:w-[180px]"
                height={40}
                width={100}
              />
            </div>

            {/* Right Scanner + Play Store */}
            <div className="flex flex-col items-center gap-2 ml-4">
              <Image
                src="/Images/Scanner.png"
                alt="Scanner"
                className="w-[100px] xsm:w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[160px] 2xl:w-[180px]"
                height={100}
                width={500}
              />
              <Image
                src="/Images/play_store.png"
                alt="Play Store"
                className="w-[100px] xsm:w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[160px] 2xl:w-[180px]"
                height={40}
                width={100}
              />
            </div>
          </div>

          {/* iPhone Image */}
          <div className="xsm:hidden sm:hidden lg:block">
            <Image
              src="/Images/iPhone12_Screen.png"
              alt="iPhone Screen"
              className="h-[200px] lg:h-[250px] xl:h-[300px] 2xl:h-[350px] -mb-4 w-auto object-contain ml-8"
              height={300}
              width={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanAndDownload;