import React from 'react'
import Feature from './Feature'

const Home = () => {
    return (
        <div>
            <div className="mb-12 mt-4">

                <p className="text-[rgba(81,220,152,1)] uppercase font-medium text-sm tracking-wide font-lexend px-[10%]">
                    / About Us
                </p>
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between  px-[10%] mt-4">
                    {/* Left Section: Heading */}
                    <h2 className="text-5xl font-lexend md:text-4xl   font-bold text-gray-900 md:w-1/2  tracking-wider leading-relaxed ">
                        Elevating Cleanliness to Perfection
                    </h2>

                    {/* Right Section: Paragraph */}
                    <div className="flex justify-end w-2/3 mt-6">
                        <div className="flex justify-end">
                            <p className="text-gray-500 md:w-1/2 text-sm self-end  text-justify font-sans">
                                We perfect cleanliness, transforming every space into a spotless, fresh, and hygienic environment
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid ">
                <div className="grid grid-cols-3 gap-4 px-[10%]">
                    <div className="flex-col">
                        <div className="relative bg-[rgba(94,147,198,1)] p-8 rounded-lg shadow-md text-center col-span-1 h-72 w-72">
                            <div className="text-6xl font-bold text-white mt-14">99%</div>
                            <p className="text-gray-600 mt-2 font-sans">Satisfied Clients</p>
                            <div className="absolute top-10 left-10 text-3xl text-[rgba(193,244,88,1)]"> ★</div>
                            <div className="absolute bottom-14  right-12 text-[rgba(36,35,42,1)] text-3xl">
                                ★
                            </div>
                        </div>
                        <div className="col-span-1">
                            <Feature
                                title="Professional Cleaners"
                                description="Our professional cleaners offer expert cleaning services, transforming your space into a fresh, hygienic haven"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center col-span-2">
                        <div className="bg-[rgba(94,147,198,1)] w-[95%] h-72 rounded-2xl shadow-md flex items-center justify-center text-center relative overflow-hidden">
                            <video
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                src="/Images/solar.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                            ></video>
                        </div>

                        <div className="col-span-2 grid grid-cols-2 md:grid-cols-2 gap-20 ">
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