"use client";
import React from 'react'
import Feature from './Feature'

const Home = () => {
    return (
        <div>
            <div className="mb-12 md:mb-1 mt-4  md:overflow-hidden">

                <p className="text-[rgba(81,220,152,1)] uppercase font-medium text-lg tracking-wide font-lexend px-[10%]">
                    / About Us
                </p>
                <div className="flex flex-col xsm:items-start md:flex-row md:gap-32 2xl:px-[10%] items-center md:items-start justify-between md:px-[8%]  px-[10%] mt-4">
                    {/* Left Section: Heading */}
                    <h2 className="text-5xl font-lexend xsm:text-xl md:text-4xl 2xl:text-4xl 2xl:w-[50%]  lg:text-3xl  font-bold text-gray-900 md:w-1/2  font-dm-sans tracking-wide leading-relaxed ">
                        Elevating Cleanliness to Perfection
                    </h2>

                    {/* Right Section: Paragraph */}
                    <div className="flex justify-end w-2/3 md:w-1/2 mt-6">
                        <div className="flex justify-end">
                            <p className="text-gray-500 md:tracking-tight xsm:mr-4 xsm:text-xs xsm:text-start md:leading-tight 2xl:text-lg 2xl:tracking-wide 2xl:leading-relaxed md:text-base text-lg self-end  text-justify font-dm-sans tracking-wide leading-relaxed" >
                                We perfect cleanliness, transforming every space into a spotless, fresh, and hygienic environment
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid ">
                <div className="grid grid-cols-[1fr,2.5fr] xsm:grid-cols-1 xsm:gap-0 md:flex md:justify-center lg:gap-10 md:gap-0 2xl:gap-[14%] md:p-10 gap-4 px-[10%]">
                    <div className="flex-col xsm:relative xsm:bottom-32 xsm:left-48">
                        <div className="relative bg-[rgba(94,147,198,1)]  p-8 rounded-lg shadow-md text-center col-span-1 h-72 w-72 xsm:w-28 xsm:h-32 md:w-full 2xl:w-80">
                            <div className="text-6xl font-bold text-white mt-14 xsm:mt-3 font-dm-sans xsm:text-2xl tracking-wide leading-relaxed">99%</div>
                            <p className="text-gray-600 mt-2 font-sans font-dm-sans tracking-wide leading-relaxed xsm:text-xs 2xl:mt-0">Satisfied Clients</p>
                            <div className="absolute top-10 xsm:top-2 left-10 xsm:left-5 text-3xl text-[rgba(193,244,88,1)] xsm:text-lg"> ★</div>
                            <div className="absolute bottom-14 xsm:bottom-3 xsm:right-3 right-12 text-[rgba(36,35,42,1)] text-3xl xsm:text-lg 2xl:bottom-6 2xl:right-14">
                                ★
                            </div>
                        </div>
                        <div className="col-span-1 font-dm-sans tracking-wide leading-relaxed text-[18px] xsm:w-[40%] 2xl:text-justify">
                            {" "}
                            <Feature
                                title="Professional Cleaners"
                                description="Our professional cleaners offer expert cleaning services, transforming your space into a fresh, hygienic haven"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col xsm:-mt-24 md:items-center md:justify-center items-center justify-center">
                        <div className="bg-[rgba(94,147,198,1)] w-full lg:w-full md:w-[56%] h-full rounded-2xl shadow-md flex items-center justify-center text-center relative overflow-hidden">
                            <video
                                className="absolute top-0 xsm:relative lg:w-full xsm:w-full 2xl:w-full left-0 h-full object-cover"
                                src="/Images/solar.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                            ></video>
                        </div>

                        <div className="flex justify-between w-full md:relative md:left-10 gap-20 md:flex md:w-[70%] xsm:justify-center lg:w-full lg:justify-between md:justify-center xsm:text-start md:gap-0 font-dm-sans tracking-wide xsm:tracking-tight leading-relaxed text-[18px] md:text-start text-justify">
                            {" "}
                            {/* Reduced gap and added margin top */}
                            <Feature
                                title="Flexible Scheduling"
                                description="We offer flexible scheduling, making it easy to book cleaning services at your convenience."
                            />
                            <Feature
                                title="Attention to Detail"
                                description="We focus on the small details, ensuring your space is cleaned with precision and care."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home