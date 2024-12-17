"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "../Lodder.css"

const DreamTeam = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoContact = () => {
    setLoading(true);
    router.push("/contactus");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="px-[10%] flex items-center justify-center py-[10vh] relative">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader"></div>
        </div>
      )}
      <div className="bg-[#24232A] rounded-lg h-[50vh] w-full flex flex-col items-center justify-center text-center px-6 shadow-sm">
        <h1 className="text-white text-[48px] mb-4">Join Our Dream Team!</h1>
        <p className="text-[#BCBBC9] mb-6">
          Be a part of our expert team and bring cleanliness and joy to every
          space.
        </p>
        <button
          className="text-white bg-[#0054A5] px-6 mt-5  h-[7vh] shadow-sm  rounded-full transition"
          onClick={handleGoContact}
        >
          Join Our Team
        </button>
      </div>
    </div>
  );
};

export default DreamTeam;
