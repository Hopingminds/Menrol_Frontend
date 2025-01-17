"use client";
import React, { useState } from "react";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BiSolidStar } from "react-icons/bi";

const Survey: React.FC = () => {
  const [rating, setRating] = useState<number>(0); // State to track selected rating

  // Function to handle star click
  const handleStarClick = (index: number): void => {
    setRating(index + 1); // Set the rating (1-indexed)
  };

  return (
    <div className="p-[7%] ">
      <div className="font-sans flex  xsm:flex-col items-center justify-between">
        <div className="flex flex-col gap-5 w-[40%] xsm:w-full">
          <p className="flex text-[#4A3AFF] xsm:text-[10px] items-center gap-2 font-semibold">
            <TfiLayoutLineSolid /> RATE OUR SERVICES
          </p>
          <p className="text-5xl font-bold xsm:text-xl">Fill the form to submit your feedback</p>
          <p className="text-gray-400 xsm:text-xs">
            Lorem ipsum dolor sit amet consectetur adipiscing elit posuere vel venenatis eu sit massa volutpat massa rhoncus odio feugiat tellus, elit
            massa sed.
          </p>
        </div>
        <div className="bg-white shadow-2xl flex flex-col gap-5 p-6 w-[50%] xsm:w-full">
          <p className="text-base font-bold">Your service rating</p>
          <div className="text-4xl flex cursor-pointer">
            {[...Array(5)].map((_, index) => (
              <BiSolidStar
                key={index}
                onClick={() => handleStarClick(index)} // Set rating on click
                onMouseLeave={() => setRating(rating)} // Revert hover effect
                className={index < rating ? "text-yellow-300" : "text-gray-300"} // Highlight stars based on rating
              />
            ))}
          </div>
          <p className="text-xl font-bold">Additional feedback</p>
          <textarea
            name="feedback"
            id="feedback"
            placeholder="If you have any additional feedback, please type it in here..."
            className="border rounded-lg w-full p-3"
          ></textarea>
          <p className="text-gray-400">
            <input type="checkbox" className="w-5" /> <span className="xsm:text-[10px]">I have read and accept the Privacy Policy.</span>
          </p>
          <button className="bg-[#0054A5] p-3 w-full text-white rounded-lg">Send Feedback</button>
        </div>
      </div>
    </div>
  );
};

export default Survey;
