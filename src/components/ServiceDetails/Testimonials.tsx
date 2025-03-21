"use client";
import React from "react";
import Image from "next/image";

const Testimonials: React.FC = () => {
  return (
    <section className="bg-white py-16 xsm:py-0 px-[10%]">
      {/* Header Section */}
      <div className="px-4 mt-6">


        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-[#24232A] text-[56px] xsm:text-xl sm:text-2xl font-bold tracking-[0.05em] w-[70%] font-dm-sans leading-relaxed">
              Real Testimonials from Satisfied Customers
            </h1>
          </div>

     
        </div>
      </div>

      {/* Testimonial Cards Section */}
      <div className="container mx-auto py-10 xsm:overflow-x-scroll sm:overflow-x-auto xsm:w-screen">
        <div className="flex flex-row gap-6">
          {/* Card 1 */}
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-6 w-full max-w-sm min-w-[300px] py-10 mx-auto">
            <div className="flex items-center space-x-4">
              <Image
                src="/Images/testimonials/pics/person6.jpg"
                alt="Rinki Beniwal"
                className="w-16 h-16 rounded-full object-cover"
                height={200}
                width={200}
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800 font-dm-sans tracking-wide leading-relaxed">Rinki Beniwal</h2>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 font-dm-sans tracking-wide leading-relaxed" >Plumbing</h3>
            <p className="text-gray-600 mt-2 text-sm font-dm-sans tracking-wide leading-relaxed">
              Really satisfied with the services. Will definitely recommend to others.
            </p>
          </div>


          {/* Card 2 */}
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg min-w-[300px] p-6 w-full max-w-sm py-10 mx-auto">
            <div className="flex items-center space-x-4">
              <Image
                src="/Images/testimonials/pics/person7.jpeg"
                alt="Aditya Raj"
                className="w-16 h-16 rounded-full object-cover"

                height={200}
                width={200}
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800 font-dm-sans tracking-wide leading-relaxed">Aditya Raj</h2>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 font-dm-sans tracking-wide leading-relaxed">Home Cleaning</h3>
            <p className="text-gray-600 mt-2 text-sm font-dm-sans tracking-wide leading-relaxed">
              They really provided exceptional cleaning services. Really satisfied, and my home smells amazing!
            </p>
          </div>


          {/* Card 3 */}
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-6 w-full min-w-[300px]  max-w-sm py-10 mx-auto">
            <div className="flex items-center space-x-4">
              <Image
                src="/Images/testimonials/pics/person8.jpg"
                alt="Ankit Raj"
                className="w-16 h-16 rounded-full object-cover"

                height={200}
                width={200}
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800 font-dm-sans tracking-wide leading-relaxed">Ankit Raj</h2>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 font-dm-sans tracking-wide leading-relaxed">Plumbing</h3>
            <p className="text-gray-600 mt-2 text-sm font-dm-sans tracking-wide leading-relaxed">
              They solved all the leakage problems. I was really troubled by these issues for a long time. Appreciate their work!
            </p>
          </div>

        </div>
      </div>

      {/* Features Section */}
      <div className="flex justify-between lg:mt-10  lg:justify-between items-center xsm:flex-col sm:flex-col lg:flex-row lg:space-y-0  sm:space-y-11 xsm:items-center xsm:space-y-10">

        <div className="bg-[rgba(94,147,198,1)] w-[60%] 2xl:w-[65%] xsm:w-full sm:w-full xsm:h-[30vh] h-72 rounded-2xl shadow-md flex items-center justify-center text-center relative overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="/Images/majdur2.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>

        <div className=" flex flex-col w-[40%]  xsm:w-[70%] sm:w-[70%] 2xl:w-[33%]">
          <div className="relative bg-[#0054A5] p-8 rounded-lg shadow-md text-center itr col-span-1 mx-3 xsm:right-3 xsm:h-[12rem] h-72 w-full">


            <p className="text-white mt-12 xsm:text-[12px] xsm:mt-3 md:text-lg md:mt-12 font-dm-sans font-dm-sans tracking-wide leading-relaxed">Committed to delivering exceptional results, we are working hard to ensure every client satisfaction grows with every completed project.</p>
            <div className="absolute top-4 left-4 text-lg">⭐</div>
            <div className="absolute bottom-4 right-4 text-gray-700 text-lg">★</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
