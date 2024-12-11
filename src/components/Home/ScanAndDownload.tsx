import Image from "next/image";
import React from "react";

const ScanAndDownload = () => {
  return (
    <div className="bg-[#0054A5] h-[80vh] w-full flex justify-center relative">
      {/* Text Section */}
      <div>
        <div className="text-white pt-10">
          <h1 className="text-[56px] font-bold">Scan to Download App</h1>
          <p className="text-[20px] mb-4">
            Available on your favorite store. Start your premium experience now
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="absolute bottom-0 w-full flex flex-col items-center gap-6">
        <div className="flex flex-row gap-x-6">
          <div className="flex flex-col gap-3">
            <Image
              src="/Images/Scanner.png"
              alt="Scanner"
              className="h-[25vh] w-[10vw] pt-10"
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

          <div className="flex flex-col gap-3 top-6">
            <Image
              src="/Images/Scanner.png"
              alt="Scanner"
              className="h-[25vh] w-[10vw] pt-10 object-cover"
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

          <Image
            src="/Images/iPhone12_Screen.png"
            alt="iPhone Screen"
            className="h-[55vh] w-[30vw] shadow-sm object-contain ml-[4vw]"
            height={1000}
            width={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default ScanAndDownload;
