"use client";
import Image from "next/image";
import React from "react";

const Testimonials = () => {
  return (
    <div className="px-[10%] h-[100%] py-10 ">
      <div className="px-4 mt-6">
        

        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-[#24232A] text-[56px] mb-10 xl:text-5xl xl:mt-5 2xl:text-6xl sm:text-4xl xsm:text-[15px] md:text-[30px] font-bold xsm:w-full  w-[70%] font-lexend tracking-wide leading-relaxed ">
              Real Testimonials from Satisfied Customers
            </h1>
          </div>

          {/* <button className="bg-[#0054A5] my-[5vh] rounded-full h-[7vh] w-[9vw] items-center text-[#FFFFFF] font-[16px] tracking-[0.07em]">
            View All
          </button> */}
        </div>
      </div>

      <div className="container mx-auto sm:overflow-x-scroll xl:overflow-hidden 2xl:mt-6 xl:mt-5 xsm:overflow-x-scroll ">
        <div className="flex flex-row gap-6 ">
          {/* Card 1 */}
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-6 w-[450px] min-w-[260px]  py-10 mx-auto">
            <div className="flex items-start  space-x-4">
              <Image
                src="/Images/AllImages/person3.webp"
                alt="Rahul Rana"
                className="w-16 h-16 rounded-full object-cover"
                height={100}
                width={100}
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800 font-dm-sans tracking-wide leading-relaxed">Rahul Rana</h2>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 font-dm-sans tracking-wide leading-relaxed ">Home Cleaning</h3>
            <p className="text-gray-600 xsm:leading-tight text-sm font-dm-sans tracking-wide leading-relaxed " >
              Such a great experience! The cleaners were punctual and did a detailed job throughout my home.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-6 w-[450px] min-w-[260px]  py-10 mx-auto">
            <div className="flex items-start space-x-4 ">
              <Image
                src="/Images/AllImages/person4.jpg"
                alt="Prajjwal Sharma"
                className="w-16 h-16 rounded-full object-cover"

                height={200}
                width={200}
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800 font-dm-sans tracking-wide leading-relaxed" >Prajjwal Sharma</h2>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 font-dm-sans tracking-wide leading-relaxed ">Office Cleaning</h3>
            <p className="text-gray-600 mt-2 text-sm font-dm-sans tracking-wide leading-relaxed ">
              Our office space has never looked this clean! The cleaners were efficient, friendly, and thorough.
            </p>
          </div>


          {/* Card 3 */}
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-6 w-[450px] min-w-[260px] py-10 mx-auto">
            <div className="flex items-start space-x-4 ">
              <Image
                src="/Images/AllImages/person5.jpg"
                alt="Kammal Prakash"
                className="w-16 h-16 rounded-full object-cover"
                height={200}
                width={200}
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800 font-dm-sans tracking-wide leading-relaxed ">Kammal Prakash</h2>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 font-dm-sans tracking-wide leading-relaxed ">Kitchen Cleaning</h3>
            <p className="text-gray-600 mt-2 text-sm font-dm-sans tracking-wide leading-relaxed ">
              Highly recommend this kitchen cleaning service! They left the kitchen spotless and completely odor-free.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Testimonials;