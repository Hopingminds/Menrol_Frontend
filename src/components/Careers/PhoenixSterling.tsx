"use client";
import React from "react";

const PhoenixSterling = () => {
  return (
    <div className="flex px-[10%] bg-[rgba(0,84,165,1)]  h-[100%] my-10 py-[20vh] items-center justify-between gap-10">
      <div className="w-[60%] text-justify">
        <div className="flex items-center">
          <p className="text-[56px] text-white font-dm-sans tracking-wide leading-relaxed">
            Phoenix Sterling
          </p>
          <span className="text-green-500 text-[50px] pl-5">✔</span>
        </div>

        <p className="text-white text-xl font-dm-sans tracking-wide leading-relaxed">
          Supaklin Employee
        </p>
        <p className="mt-4 text-lg text-white font-dm-sans tracking-wide leading-relaxed">
          “Working at Supaklin has been a rewarding experience. The
          company&apos;s dedication to excellence and sustainable practices has
          inspired me to grow both professionally and personally.
        </p>

        <p className="mt-4 text-lg text-white font-dm-sans tracking-wide leading-relaxed">
          The supportive and close-knit team has made every day enjoyable, and
          knowing that our efforts contribute to creating healthier and safer
          spaces for our clients gives me a sense of fulfillment in my work.
          Supaklin is more than just a workplace; it feels like a family where
          everyone&apos;s contributions are valued, and I am grateful to be a part of
          it.”
        </p>
      </div>
      <div
        className="relative bg-[rgba(94,147,198,1)] text-white p-4 rounded-xl h-[50vh] w-[30%]"
        style={{
          backgroundImage: "url('/Images/plumber.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};

export default PhoenixSterling;
