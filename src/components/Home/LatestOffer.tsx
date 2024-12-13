import Image from "next/image";
import React from "react";

const LatestOffer = () => {
  return (
    <div className="bg-[#0054A5] h-[100%] pb-10 w-full sm:h-[100%] flex items-center justify-center relative">
      <div className="px-[10%] flex flex-col-reverse md:flex-row w-full justify-between md:items-center sm:top-4">
        {/* Left Side Image */}
        <div className="flex-1 relative sm:flex sm:justify-center">
          <Image
            src="/Images/OfferImage.png"
            alt="Offer"
            className="w-[20vw] h-[55vh] md:w-[25vw] sm:w-[30vw] object-cover rounded-lg shadow-sm mt-9 "
            height={300}
            width={300}
          />

          {/* Overlay Content */}
          <div className="bg-[#24232A] h-[20vw] md:h-[15vw] md:w-[10vw] w-[10vw] sm:w-[18vw] rounded-lg text-white absolute top-[50%] left-[50%] transform -translate-x-[20%] sm:translate-x-[30%] md:translate-x-[60%] -translate-y-[50%] sm:-translate-y-[50%] flex items-center justify-center font-lexend">
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
        <div className="flex-1 text-white pl-10 md:pl-3 flex flex-col items-center justify-center text-center">
          <h1 className="text-[#51DC98] uppercase font-bold pl-4 tracking-[0.08em] py-10">
            {"/ / Discount Up To 50%".split(" ").join("  ")}
          </h1>

          <h1 className="text-[56px] font-bold mb-4 md:text-[40px]">
            Limited Time Offer - Enjoy Exclusive Cleaning Discounts!
          </h1>
          <p className="text-lg mb-4">
            Ac eu tortor facilisi pulvinar mattis. Nisl vel integer mauris nunc
            aliquam nunc ullamcorper tincidunt morbi.
          </p>
          <p className="text-lg font-semibold cursor-pointer p-10 tracking-[0.2em]">
            Contact Us
          </p>
        </div>
      </div>
    </div>
  );
};

export default LatestOffer;
