"use client";
import React from 'react'
import Feature from './Feature'

const Home = () => {
    return (
        <div>
            <div className="mb-12 md:mb-1 mt-4  md:overflow-hidden ">


                <div className="flex flex-col xsm:items-start md:flex-row md:gap-32 2xl:px-[7%] items-center md:items-start justify-between xsm:px-[10%] md:px-[10%] lg:px-[7%] xl:px-[7%]  px-[7%] mt-4 ">
                    {/* Left Section: Heading */}
                    <h2 className="text-5xl xsm:text-xl md:text-2xl 2xl:text-5xl 2xl:w-[60%]  lg:text-3xl  font-bold text-gray-900 md:w-1/2 font-lexend tracking-wide leading-relaxed">
                        Excellence Delivered, Every Time
                    </h2>

                    {/* Right Section: Paragraph */}
                    <div className="flex justify-end w-2/3 xsm:w-[60%] md:w-1/2 mt-6 md:mt-1">
                        <div className="flex justify-end">
                            <p className="text-gray-500 md:tracking-tight xsm:mr-4 xsm:text-xs xsm:text-start md:leading-tight 2xl:text-lg 2xl:tracking-wide 2xl:leading-relaxed md:text-sm text-lg self-end  text-justify font-dm-sans tracking-wide leading-relaxed " >
                                We perfect  transforming every space into a spotless, fresh, and hygienic environment
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid">
                <div className="grid grid-cols-[1fr,2.5fr] xsm:grid-cols-1 xsm:gap-0  lg:gap-10 md:gap-0  2xl:gap-[10%] lg:px-[7%] md:px-[10%] xl:px-[7%] 2xl:px-[7%] gap-4 px-[10%] ">
                    <div className="flex-col xsm:relative xsm:bottom-32 xsm:left-48 ">
                        <div className="relative bg-[#0054A5]  p-8 rounded-lg shadow-md text-center col-span-1 lg:h-72 w-72 2xl:w-full xsm:w-28 xsm:h-32 md:w-[90%] lg:w-full  md:h-[14rem] xl:mt-2 2xl:mt-0">
                            <div className="text-6xl font-bold text-white mt-14 xsm:mt-3 font-dm-sans xsm:text-2xl tracking-wide leading-relaxed">99%</div>
                            <p className="text-black mt-2 font-sans font-dm-sans tracking-wide leading-relaxed xsm:text-xs 2xl:mt-0">Satisfied Clients</p>
                            <div className="absolute top-10 xsm:top-2 left-10 xsm:left-5 text-3xl text-[rgba(193,244,88,1)] xsm:text-lg"> ★</div>
                            <div className="absolute  md:bottom-6 lg:bottom-8 lg:right-8 bottom-14 xsm:bottom-3 xsm:right-3 right-12 text-[rgba(36,35,42,1)] text-3xl xsm:text-lg 2xl:bottom-6 2xl:right-14 md:right-6">
                                ★
                            </div>
                        </div>
                        <div className="col-span-1 font-dm-sans tracking-wide leading-relaxed text-[18px] xsm:w-[40%] 2xl:text-justify ">
                            {" "}
                            <Feature
                                title="Professional Experts"
                                description="Our professional experts offer excelllent services, transforming your space into a fresh, hygienic haven"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col xsm:-mt-24 md:items-center md:justify-center items-center justify-center lg:w-full  2xl:w-full ">
                        <div className="bg-[rgba(94,147,198,1)]  lg:-ml-0  w-full lg:w-full md:w-[90%]  md:h-[14rem] lg:h-full h-full rounded-2xl shadow-md flex items-center justify-center text-center relative overflow-hidden">
                            <video
                                className="absolute top-0 xsm:relative  md:w-full lg:w-full xsm:w-full 2xl:w-full left-0  h-full object-cover"
                                src="/Images/majdur.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                            ></video>
                        </div>

                        <div className="flex justify-between w-full  lg:-left-0 gap-20  xsm:justify-center lg:w-full md:-ml-5 lg:justify-between xsm:text-start md:gap-0 font-dm-sans tracking-wide xsm:tracking-tight leading-relaxed text-[18px] md:text-start text-justify ">
                            {" "}
                            {/* Reduced gap and added margin top */}
                            <Feature
                                title="Flexible Scheduling"
                                description="We offer flexible scheduling, making it easy to book  services at your convenience."
                            />
                            <Feature
                                title="Attention to Detail"
                                description="We focus on the small details, ensuring your space is dealed  with precision and care."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home