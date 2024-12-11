import React from "react";

const Testimonials = () => {
  return (
    <div className="px-[10%] h-screen">
      <div className="px-4 mt-6">
        <h1
          className="text-[#51DC98] uppercase "
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
    </div>
  );
};

export default Testimonials;