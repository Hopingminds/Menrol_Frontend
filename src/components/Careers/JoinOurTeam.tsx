"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const JoinOurTeam = () => {
    const route = useRouter()

    const HandleGoAbout = () => {
        route.push("/about");
    }
    return (
        <div className="flex  mt-12  justify-around ">
            <div className="flex-col text-justify  w-[40%] leading-relaxed  ">
                <p className="text-[rgba(81,220,152,1)] uppercase  text-sm tracking-wide font-lexend font-lg">
                    /JOIN OUR TEAM
                </p>
                <p className="text-5xl w-[90%] font-lexend font-semibold leading-relaxed lg:leading-normal tracking-[0.1em] lg:tracking-tighter">Elevate Your Career While Changing the World </p>
                <p className="mt-2 font-sans font-dm-sans tracking-wide leading-relaxed">
                    Lead with purpose and grow professionally while making the world a better place.{" "}
                </p>
                <button className="bg-[rgba(0,84,165,1)] rounded-full mt-10 h-12 w-40 font-dm-sans tracking-wide leading-relaxed hover:scale-105"
                    onClick={HandleGoAbout}
                >
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