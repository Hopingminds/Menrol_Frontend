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
                <h2 className="text-lg font-bold">John Doe</h2>
                <p className="text-sm text-gray-600">Software Engineer</p>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">Card Heading 1</h3>
            <p className="text-gray-700 mt-2">
              This is some text providing details about the card's content. It
              can include a brief description or summary.
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
                <h2 className="text-lg font-bold">Jane Smith</h2>
                <p className="text-sm text-gray-600">UI/UX Designer</p>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">Card Heading 2</h3>
            <p className="text-gray-700 mt-2">
              This is some text providing details about the card's content. It
              can include a brief description or summary.
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
                <h2 className="text-lg font-bold">Sam Wilson</h2>
                <p className="text-sm text-gray-600">Project Manager</p>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">Card Heading 3</h3>
            <p className="text-gray-700 mt-2">
              This is some text providing details about the card's content. It
              can include a brief description or summary.
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
                description="Tellus aliquam faucibus imperdiet eget interdum risus diam neque lectus."
              />
              <Feature
                title="Attention to Detail"
                description="Tellus aliquam faucibus imperdiet eget interdum risus diam neque lectus."
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
                description="Tellus aliquam faucibus imperdiet eget interdum risus diam neque lectus."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
