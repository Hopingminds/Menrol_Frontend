import React from "react";

const Reviews = () => {
  return (
    <div className="px-[10%]">
      <div className=" mt-6">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-[#24232A] text-[30px] items-center font-bold tracking-[0.05em] w-[70%]">
              Reviews
            </h1>
          </div>

          <button className="bg-[#0054A5] my-[5vh] rounded-full h-[6vh] w-[9vw] items-center text-[#FFFFFF] font-[16px] tracking-[0.07em]">
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
                <h2 className="text-lg font-bold">Khushdeep saini</h2>

              </div>
            </div>
            <div className="flex items-center pl-[4vw] pt-2">
              {/* <span className="text-[10px] font-serif ">Rating:</span> */}
              <div className="flex space-x-1 text-[#C1F458]">
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <span key={index}>&#9733;</span> // Unicode star icon
                  ))}
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold">House cleaning</h3>
            <p className="text-gray-700 mt-2">
              Very much satisied with the work.They do provide reasonable pricing.Worth the price.

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
                <h2 className="text-lg font-bold">Rakshit Maheshwari</h2>

              </div>
            </div>
            <div className="flex items-center pl-[4vw] pt-2">
              {/* <span className="text-[10px] font-serif ">Rating:</span> */}
              <div className="flex space-x-1 text-[#C1F458]">
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <span key={index}>&#9733;</span> // Unicode star icon
                  ))}
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold">office cleaning</h3>
            <p className="text-gray-700 mt-2">
              Booked them for my Office cleaning services.They do provide exceptional services.
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
                <h2 className="text-lg font-bold">Alish Kamboj</h2>
              </div>
            </div>
            <div className="flex items-center pl-[4vw] pt-2">
              {/* <span className="text-[10px] font-serif ">Rating:</span> */}
              <div className="flex space-x-1 text-[#C1F458]">
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <span key={index}>&#9733;</span> // Unicode star icon
                  ))}
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold">Kitchen cleaning</h3>
            <p className="text-gray-700 mt-2">
              Exceptional services.Quite professional work.I will definately recommend it to others.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
