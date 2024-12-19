import React from 'react'

const JoinOurTeam = () => {
    return (
        <div className="flex  mt-12  justify-around ">
            <div className="flex-col text-justify  w-[40%] leading-relaxed  ">
                <p className="text-[rgba(81,220,152,1)] uppercase font-medium text-sm tracking-wide font-lexend ">
                    /JOIN OUR TEAM
                </p>
                <h1 className="text-5xl font-semibold w-[90%] font-lexend leading-normal">Elevate Your Career While Changing the World </h1>
                <p className="mt-2 font-sans">
                    Lead with purpose and grow professionally while making the world a better place.{" "}
                </p>
                <button className="bg-[rgba(0,84,165,1)] rounded-full mt-4 h-12 w-32">
                    Learn More
                </button>
            </div>
            <div
                className="relative bg-[rgba(94,147,198,1)] p-8 rounded-lg shadow-md text-center col-span-1 h-80 w-80 border border-black"
                style={{
                    backgroundImage: "url('/Images/ServiceImg/closeup service (1).jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
            </div>

        </div>
    )
}

export default JoinOurTeam