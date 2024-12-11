import React from "react";

const CallToAction = () => {
  return (
    <div className="px-[10%] flex justify-between mt-[18vh]">
      {/* Text Section */}
      <div className="w-[50%] pt-5">
        <h1
          className="text-[#51DC98] uppercase pl-4"
          style={{ wordSpacing: "0.1em" }}
        >
          {"/ Call to Action".split("").join(" ")}
        </h1>
        <p className=" text-[56px] pt-5 text-[#24232A]">
          Book Your Cleaning Service Now and Enjoy a Fresh Start!
        </p>
        <p className="mt-2 text-[20px] text-[#6B6A7E]">
          Ac eu tortor facilisi pulvinar mattis. Nisl vel integer mauris nunc
          aliquam nunc ullamcorper tincidunt morbi.
        </p>
        <button className="bg-[#0054A5] rounded-full h-[7vh] w-[11vw] items-center text-[#FFFFFF] font-[16px] tracking-[0.07em] mt-5">
          Contact Us
        </button>
      </div>
      {/* Image Section */}
      <div className="w-[40%]">
        <img
          src="Images/BookingImage.png"
          alt="Call to Action"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default CallToAction;
