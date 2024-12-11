import Image from "next/image";
import React from "react";

const LatestOffer = () => {
  return (
    <div className="bg-[#0054A5] h-[80vh] pb-10 w-full flex items-center justify-center relative">
      <div className="px-[10%] flex w-full justify-between">
        {/* Left Side Image */}
        <div className="flex-1 relative">
          <Image
            src="/Images/OfferImage.png"
            alt="Offer"
            className="w-[20vw] h-[55vh] object-cover rounded-lg shadow-sm mt-9"
            height={300}
            width={300}
          />

          {/* Overlay Content */}
          <div className="bg-[#24232A] h-[226px] w-[10vw] rounded-lg text-white absolute top-[50%] left-[50%] transform -translate-x-[30%] -translate-y-[70%] flex items-center justify-center font-lexend">
            <Image
              src="/Images/Star_whyChoose.png"
              alt="Logo"
              className="absolute top-4 right-3 w-[3vw] h-[7vh] "
              height={200}
              width={200}  
            />

            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center">
                <h1 className="text-[48px] font-bold">22</h1>
                {/* <span className="text-[40px]">+</span> */}
              </div>
              <h1 className="text-[16px] text-[#BCBBC9]">
                Years of Experience
              </h1>
            </div>
          </div>
        </div>

        {/* Right Side Text */}
        <div className="flex-1 text-white pl-10">
          <h1 className="text-[#51DC98] uppercase font-bold pl-4 tracking-[0.08em] py-10">
            {"/ / Discount Up To 50%".split(" ").join("  ")}
          </h1>

          <h1 className="text-[56px] font-bold mb-4">
            Limited Time Offer - Enjoy Exclusive Cleaning Discounts!
          </h1>
          <p className="text-lg mb-4">
            Ac eu tortor facilisi pulvinar mattis. Nisl vel integer mauris nunc
            aliquam nunc ullamcorper tincidunt morbi.
          </p>
          <p className="text-lg font-semibold cursor-pointer p-10 tracking-[0.2em]">Contact Us</p>
        </div>
      </div>
    </div>
  );
};

export default LatestOffer;
