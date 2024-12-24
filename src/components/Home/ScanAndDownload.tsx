import Image from "next/image";
import React from "react";

const ScanAndDownload = () => {
  return (
    <div className="bg-[#0054A5] h-[80vh] xsm:h-[50vh] xl:h-[80vh] md:h-[50vh] lg:h-[50vh] w-full flex  justify-center  relative xsm:w-full">
      {/* Text Section */}
      
        <div className="text-white pt-10 xsm:p-6">
          <h1 className="text-[56px] font-bold xsm:text-[30px]">Scan to Download App</h1>
          <p className="text-[20px] mb-4 xsm:text-[10px]">
            Available on your favorite store. Start your premium experience now
          </p>
        </div>
      

      {/* Image Section */}
      <div className="absolute bottom-0 w-full flex flex-col items-center gap-6 ">
        <div className="flex flex-row gap-x-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-3 top-6 xsm:mt-64 ">
            <Image
              src="/Images/Scanner.png"
              alt="Scanner"
              className=" w-[80%] pt-10"
              height={200}
              width={200}
            />
            <Image
              src="/Images/app_store.png"
              alt="Scanner"
              className="h-[10vh] w-auto object-cover"
              height={200}
              width={200}
            />
          </div>

          <div className="flex flex-col items-center gap-3 top-6 xsm:mt-64">
            <Image
              src="/Images/Scanner.png"
              alt="Scanner"
              className=" w-[80%] pt-10 object-cover"
              height={200}
              width={200}
            />

            <Image
              src="/Images/play_store.png"
              alt="Scanner"
              className="h-[10vh] w-auto object-cover"
              height={200}
              width={200}
            />
          </div>
          </div>

          <div className="xsm:hidden sm:hidden md:hidden xl:block"><Image
            src="/Images/iPhone12_Screen.png"
            alt="iPhone Screen"
            className="h-[55vh] w-[30vw] shadow-sm object-contain ml-[4vw] "
            height={1000}
            width={1000}
          /></div>
        </div>
      </div>
    </div>
  );
};

export default ScanAndDownload;
