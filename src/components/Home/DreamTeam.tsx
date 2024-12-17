import React from 'react';

const DreamTeam = () => {
  return (
    <div className="px-[10%] flex items-center justify-center pb-10">
      <div className="bg-[#24232A] rounded-lg h-[50vh] w-full flex flex-col items-center justify-center text-center px-6 shadow-sm">
        <h1 className="text-white text-[48px] mb-4">Join Our  Dream Team!</h1>
        <p className="text-[#BCBBC9] mb-6">
          Be a part of our expert  team and bring cleanliness and joy to every space.
        </p>
        <button className="text-white bg-[#0054A5] px-6 mt-5     h-[7vh] shadow-sm  rounded-full transition">
          Join Our Team
        </button>
      </div>
    </div>
  );
};

export default DreamTeam;
