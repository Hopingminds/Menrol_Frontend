import React from "react";

const Testimonials = () => {
  return (
    <div className="px-[10%] h-[100%] py-10">
      <div className="px-4 mt-6">
        <h1
          className="text-[#51DC98] uppercase "
          style={{ wordSpacing: "0.1em" }}
        >
          {"/Testimonials".split("").join(" ")}
        </h1>

        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-[#24232A] text-[56px] font-bold  w-[70%] font-dm-sans tracking-wide leading-relaxed ">
              Real Testimonials from Satisfied Customers
            </h1>
          </div>

          {/* <button className="bg-[#0054A5] my-[5vh] rounded-full h-[7vh] w-[9vw] items-center text-[#FFFFFF] font-[16px] tracking-[0.07em]">
            View All
          </button> */}
        </div>
      </div>

      <div className="container mx-auto py-10">
        <div className="flex flex-row gap-6">
          {/* Card 1 */}
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-6 w-full max-w-sm py-10 mx-auto">
            <div className="flex items-center space-x-4">
              <img
                src="/Images/All photos/person3.webp"
                alt="Rahul Rana"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800 font-dm-sans tracking-wide leading-relaxed">Rahul Rana</h2>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 font-dm-sans tracking-wide leading-relaxed ">Home Cleaning</h3>
            <p className="text-gray-600 mt-2 text-sm font-dm-sans tracking-wide leading-relaxed " >
              Such a great experience! The cleaners were punctual and did a detailed job throughout my home.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-6 w-full max-w-sm py-10 mx-auto">
            <div className="flex items-center space-x-4">
              <img
                src="/Images/All photos/person4.jpg"
                alt="Prajjwal Sharma"
                className="w-16 h-16 rounded-full object-cover"
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
          <div className="card bg-[#F9F9FE] shadow-md rounded-lg p-6 w-full max-w-sm py-10 mx-auto">
            <div className="flex items-center space-x-4">
              <img
                src="/Images/All photos/person5.jpg"
                alt="Kammal Prakash"
                className="w-16 h-16 rounded-full object-cover"
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