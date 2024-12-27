"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const JoinOurTeam = () => {
    const route = useRouter()

    const HandleGoAbout = () => {
        route.push("/about");
    }
    return (
        <div className="flex  xsm:flex-col sm:flex-col md:flex-row sm:px-5 sm:gap-10 xsm:px-5 xsm:gap-10 mt-12 md:gap-0  justify-around ">
            <div className="flex-col text-justify  w-[40%] xsm:w-full sm:w-[70%] md:w-[40%] leading-relaxed  ">
                <p className="text-[rgba(81,220,152,1)] uppercase xsm:text-[10px] sm:text-[11px]  text-sm tracking-wide font-lexend font-lg">
                    /JOIN OUR TEAM
                </p>
                <p className="text-5xl xsm:leading-tight sm:leading-tight sm:tracking-tight  xsm:tracking-tight font-lexend font-semibold leading-relaxed xsm:text-2xl sm:text-4xl xl:text-5xl xl:tracking-tight text-start lg:leading-normal tracking-[0.1em] lg:tracking-tighter">Elevate Your Career While Changing the World </p>
                <p className="mt-2 xsm:mt-5 sm:mt-6 font-dm-sans tracking-wide xsm:text-sm xsm:text-start leading-relaxed">
                    Lead with purpose and grow professionally while making the world a better place.{" "}
                </p>
                <button className="bg-[rgba(0,84,165,1)] text-white rounded-full mt-10 h-12 xsm:w-32 w-40 font-dm-sans tracking-wide leading-relaxed hover:scale-105"
                    onClick={HandleGoAbout}
                >
                    Learn More
                </button>
            </div>
            <div
                className="relative bg-[rgba(94,147,198,1)] p-8 rounded-lg shadow-md text-center col-span-1 xsm:h-52 xsm:w-52 md:w-72 xsm:left-14 sm:left-40 md:left-0 h-80 w-80 border border-black"
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