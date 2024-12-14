import Image from "next/image";
import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { IoCubeOutline } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";

const WhyChooseUs = () => {
  return (
    <div className="px-[10%] py-[15vh]">
      <div className="bg-[#F9F9FE] rounded-lg w-full h-[80vh] px-[10%] ">
        <div className="flex flex-row justify-between font-lexend">
          <div className="py-[8%]">
            <h1
              className="text-[#51DC98] uppercase font-bold py-[2vh]"
              style={{ wordSpacing: "0.1em" }}
            >
              {"/Why Choose Us".split("").join(" ")}
            </h1>
            <h1 className="text-[#24232A] text-[56px] ">Choose Excellence,</h1>
            <h1 className="text-[#24232A] text-[56px] ">Choose Supaklin</h1>
          </div>

          <div className="bg-[#24232A] h-[23.1vh] w-[15vw] rounded-lg mt-[6vh] text-white relative flex items-center justify-center font-lexend">
            <Image
              src="/Images/Star_whyChoose.png"
              alt="Logo"
              className="absolute top-5 right-12 w-[3vw] h-[6vh] object-cover"
              height={100}
              width={100}
            />

            <div className="text-left">
              <div className="flex items-end">
                <h1 className="text-[48px] font-bold">231</h1>
                <span className="text-[40px]">+</span>
              </div>
              <h1 className="text-[16px]">Project Finished</h1>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-around font-Lexend">
            <div className="flex flex-row items-center gap-5">
              <div className="bg-[#0054A5] h-[7vh] w-[4vw] rounded-lg flex items-center justify-center text-white">
                <FiUsers />
              </div>

              <div>
                <h1 className="text-[24px] text-[#24232A]">Reliable Cleaning Crew</h1>
                <p className="text-[16px] text-[#24232A]">
                  Tellus aliquam faucibus imperdiet eget
                </p>
                <p className="text-[16px]">interdum risus diam neque lectus.</p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-5">
              <div className="bg-[#0054A5] h-[7vh] w-[4vw] rounded-lg flex items-center justify-center text-white">
                <MdOutlineWatchLater />
              </div>
              <div>
                <h1 className="text-[24px] text-[#24232A]">On-Time Services</h1>
                <p className="text-[16px] text-[#24232A]">
                  Tellus aliquam faucibus imperdiet eget
                </p>
                <p className="text-[16px]">interdum risus diam neque lectus.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-around py-10">
            <div className="flex flex-row items-center gap-5">
              <div className="bg-[#0054A5] h-[7vh] w-[4vw] rounded-lg flex items-center justify-center text-white">
                <IoCubeOutline />
              </div>
              <div>
                <h1 className="text-[24px] text-[#24232A]">Flexible Packages</h1>
                <p className="text-[16px] text-[#24232A]">
                  Tellus aliquam faucibus imperdiet eget
                </p>
                <p className="text-[16px]">interdum risus diam neque lectus.</p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-5">
              <div className="bg-[#0054A5] h-[7vh] w-[4vw] rounded-lg flex items-center justify-center text-white">
                <BsEmojiSmile />
              </div>

              <div>
                <h1 className="text-[24px] text-[#24232A]">Transparent Pricing</h1>
                <p className="text-[16px] text-[#24232A]">
                  Tellus aliquam faucibus imperdiet eget
                </p>
                <p className="text-[16px] text-[#24232A]">interdum risus diam neque lectus.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
