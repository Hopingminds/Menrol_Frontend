import React from "react";
import Feature from "../../components/About/Feature";
import Layout from "@/components/Layout";

const Testimonials: React.FC = () => {
  return (
    <section className="bg-white py-16 px-[10%]">
      {/* Header Section */}
      <div className="px-4 mt-6">
        <h1
          className="text-[#51DC98] uppercase"
          style={{ wordSpacing: "0.1em" }}
        >
          {"/Testimonials".split("").join(" ")}
        </h1>

        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-[#24232A] text-[56px] font-bold tracking-[0.05em] w-[70%] font-dm-sans tracking-wide leading-relaxed">
              Real Testimonials from Satisfied Customers
            </h1>
          </div>

          {/* <button className="bg-[#0054A5] my-[5vh] rounded-full h-[7vh] w-[9vw] items-center text-[#FFFFFF] font-[16px] tracking-[0.07em]">
            View All
          </button> */}
        </div>
      </div>

      {/* Testimonial Cards Section */}
      <div className="container mx-auto py-10">
        <div className="flex flex-row gap-6">
          {/* Card 1 */}
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-6 w-full max-w-sm py-10 mx-auto">
            <div className="flex items-center space-x-4">
              <img
                src="/Images/All photos/person6.webp"
                alt="Rinki Beniwal"
                className="w-16 h-16 rounded-full object-cover"
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
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-6 w-full max-w-sm py-10 mx-auto">
            <div className="flex items-center space-x-4">
              <img
                src="/Images/All photos/person7.jpg"
                alt="Aditya Raj"
                className="w-16 h-16 rounded-full object-cover"
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
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-6 w-full max-w-sm py-10 mx-auto">
            <div className="flex items-center space-x-4">
              <img
                src="/Images/All photos/person8.webp"
                alt="Ankit Raj"
                className="w-16 h-16 rounded-full object-cover"
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
      <div className="grid">
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-center justify-center col-span-2">
            <div className="bg-[rgba(94,147,198,1)] w-full h-72 rounded-2xl shadow-md flex items-center justify-center text-center relative overflow-hidden">
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/Images/solar.mp4"
                autoPlay
                loop
                muted
                playsInline
              ></video>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-10 font-dm-sans tracking-wide leading-relaxed">
              <Feature
                title="Flexible Scheduling"
                description="We offer flexible scheduling, making it easy to book cleaning services at your convenience."
              />
              <Feature
                title="Attention to Detail"
                description="We focus on the small details, ensuring your space is cleaned with precision and care."
              />
            </div>
          </div>

          <div className=" flex flex-col pt-8">
            <div className="relative bg-[rgba(94,147,198,1)] p-8 rounded-lg shadow-md text-center itr col-span-1 mx-3 h-72 w-full">

              <div className="text-6xl font-bold text-white mt-9 font-dm-sans font-dm-sans tracking-wide leading-relaxed">30%</div>
              <p className="text-gray-600 mt-2 font-dm-sans font-dm-sans tracking-wide leading-relaxed">Satisfied Clients</p>
              <div className="absolute top-4 left-4 text-lg">⭐</div>
              <div className="absolute bottom-4 right-4 text-gray-700 text-lg">★</div>
            </div>
            <div className=" flex font-dm-sans tracking-wide leading-relaxed items-center justify-center font-lg">
              <Feature
                title="Professional Cleaners"
                description="Our professional cleaners offer expert cleaning services, transforming your space into a fresh, hygienic haven"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
