"use client";

import React from "react";
// import Image from "next/image";

const LatestProjects = () => {
  // const photos: string[] = [
  //   "/Images/ServiceImg/Image-1.png",
  //   "/Images/ServiceImg/Image-2.png",
  //   "/Images/ServiceImg/Image-3.png",
  //   "/Images/ServiceImg/Image-4.png",
  //   "/Images/ServiceImg/Image-5.png",
  //   "/Images/ServiceImg/Image-6.png",
  // ];

  return (
    <div className="px-[10%] py-8">
      {/* <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-[#24232A] text-[30px] font-bold tracking-[0.05em]">
          Latest Projects
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg overflow-hidden group"
          >
            <Image
              src={photo} 
              alt={`Project ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              width={400}
              height={300}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default LatestProjects;
