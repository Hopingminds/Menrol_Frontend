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
            <h1 className="text-[#24232A] text-[56px] font-bold tracking-[0.05em] w-[70%]">
              Real Testimonials from Satisfied Customers
            </h1>
          </div>

          <button className="bg-[#0054A5] my-[5vh] rounded-full h-[7vh] w-[9vw] items-center text-[#FFFFFF] font-[16px] tracking-[0.07em]">
            View All
          </button>
        </div>
      </div>

      {/* Testimonial Cards Section */}
      <div className="container mx-auto py-10">
        <div className="flex flex-row gap-6">
          {/* Card 1 */}
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-4 w-1/3 py-10">
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/50"
                alt="John Doe"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold">Rinki Beniwal</h2>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">Plumbing</h3>
            <p className="text-gray-700 mt-2">
              Really satisfied with the services.Will definately recommend to others.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-4 w-1/3 py-10">
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Jane Smith"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold">Aditya Raj</h2>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">Home cleaning</h3>
            <p className="text-gray-700 mt-2">
              They really provided exceptional cleaning services.Really satsified and my home does smell really good.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-4 w-1/3 py-10">
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Sam Wilson"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold">Ankit Raj</h2>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">Plumbing</h3>
            <p className="text-gray-700 mt-2">
              They solved all the leakage problems.i was really troubled from these services from a long a time.Appreciate their work.
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

            <div className="col-span-2 grid grid-cols-2 gap-20">
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

          <div className="">
            <div className="relative bg-[rgba(94,147,198,1)] p-8 rounded-lg shadow-md text-center col-span-1 mx-3 h-72 w-full">
              <div className="text-6xl font-bold text-white mt-9">30%</div>
              <p className="text-gray-600 mt-2">Satisfied Clients</p>
              <div className="absolute top-4 left-4 text-lg">⭐</div>
              <div className="absolute bottom-4 right-4 text-gray-700 text-lg">★</div>
            </div>
            <div className="col-span-1">
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
